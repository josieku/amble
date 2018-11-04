const MAPS_KEY = "AIzaSyC6e1fU6y6ECP-j_N9KjWEzeq2qFyL1Dy0"

/**
 * takes in an array of coordinates in objects (origin and destination)
 * retrieves the data for the shortest path, then uses the steps between
 * to detect nearby points of interests to optimize the scenic experience
 * 
 * @param {Array} coordinates 
 */
export async function scenic(coordinates){
    let params = {
        origin: `${coordinates[0].latitude},${coordinates[0].longitude}`,
        destination: `${coordinates[1].latitude},${coordinates[1].longitude}`,
        key: MAPS_KEY,
        mode: 'walking',
    }
    // uses objToQueryString to encode the parameters for the HTTP request
    let url = "https://maps.googleapis.com/maps/api/directions/json?" + objToQueryString(params);

    // retrieves data about the shortest path
    let directionData = await fetch(url).then(response => response.json())
    // looks at the steps within the path
    const directions = directionData.routes[0].legs[0].steps; 

    let waypoints = [];
    let places = {};

    // for each step, perform a search for nearby points of interests
    for (let i=0; i<directions.length-1; i++){
        let point = directions[i].end_location;
        let bounds = directionData.routes[0].bounds;
        let newDest = await searchNearby(`${point.lat},${point.lng}`, places, bounds);
        console.log('new dest', newDest.name)
        if (Object.keys(newDest).length > 0){
            let latlng = {latitude: newDest.geometry.location.lat, longitude: newDest.geometry.location.lng};
            places[newDest.place_id] = (places[newDest.place_id] || 0) + 1;
            if (places[newDest.place_id] < 3){
                waypoints.push(latlng);
            }
        }
    }

    // return all nearby points of interests
    return waypoints;
}

/**
 * takes in a string of location coordinates 
 * and searches for the points of interests nearby
 * 
 * @param {string} location 
 */
async function searchNearby(location, places, bounds){
    let params = {
        location: location,
        key: MAPS_KEY,
        radius: 500,
    }

    // uses objToQueryString to encode the parameters for the HTTP request
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + objToQueryString(params);

    // retrieves data from the nearby places within 500 meters
    let data = await fetch(url).then(resp => resp.json());
    // console.log('data', data);
    let point = {};
    
    // loop through the nearby places for one point of interest
    for (let i=0; i < data.results.length; i++){
        let coord = data.results[i]
        let types = data.results[i].types;

        if (types.includes("point_of_interest") && !types.includes("lodging") && !types.includes("restaurant")
            && !types.includes("clothing_store") && !types.includes("parking") && !types.includes("pharmacy")
            && coord.rating > 4.2 && (types.includes("natural_feature") || types.includes("establishment"))
            && !places[coord.place_id] && inBounds(coord.geometry.location, bounds)
            ){
            point = coord;
            break;
        }
    }

    return point;    
}

/**
 * point is given as a location object with lat and lng
 * bounds is given as a bounds object with northeast and southeast points
 * @param {Object} point 
 * @param {Object} bounds 
 */
function inBounds(point, bounds){
    const NE = bounds.northeast;
    const SW = bounds.southwest;
    return point.lat < NE.lat && point.lng < NE.lng 
        && point.lat > SW.lat && point.lng > SW.lng;
}

export async function workout(coordinates){
    let params = {
        origin: `${coordinates[0].latitude},${coordinates[0].longitude}`,
        destination: `${coordinates[1].latitude},${coordinates[1].longitude}`,
        key: MAPS_KEY,
        mode: 'walking',
    }

    let url = "https://maps.googleapis.com/maps/api/directions/json?" + objToQueryString(params);

    let directionData = await fetch(url).then(response => response.json())
    const directions = directionData.routes[0].legs[0].steps;
    // console.log('directions', directions);

    let waypoints = [];

    for (let i=0; i<directions.length-1; i++){
        let point = directions[i].end_location;
        let newDest = await findHills(`${point.lat},${point.lng}`);
        console.log('new dest', newDest)
        if (Object.keys(newDest).length > 0){
            let latlng = {latitude: newDest.location.lat, longitude: newDest.location.lng};
            waypoints.push(latlng);
        }
    }

    // console.log('waypoints', waypoints[0]);
    return waypoints;
}

/**
 * takes in a string of location coordinates
 * and searches for the scenic points of interests nearby
 *
 * @param {string} location
 */
async function findHills(location){
  let params = {
      location: location,
      key: MAPS_KEY,
      radius: 500,
  }

  let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + objToQueryString(params);

  let data = await fetch(url).then(resp => resp.json());
  //console.log("data example", data.results);

  let locations = ""
  for (let i=0; i < data.results.length; i++){
    locations += i===0 ? "" : "|";
    locations += data.results[i].geometry.location.lat+","+data.results[i].geometry.location.lng;
  }

  let elevURL = "https://maps.googleapis.com/maps/api/elevation/json?locations=" + locations + "&";
  elevURL+=`key=${MAPS_KEY}`
  console.log('elevURL', elevURL)

  let elevData = await fetch(elevURL).then(resp => resp.json());
//   console.log('elevation data', elevData);

  let point = {};
  let best = -10000000;

  for (let i=1; i < elevData.results.length; i++){
      let diff = elevData.results[i].elevation - elevData.results[0].elevation
      if (diff > best){
         best = diff;
         point = elevData.results[i];
      }
  }
  return point;
}


function objToQueryString(obj){
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }