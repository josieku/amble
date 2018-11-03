const MAPS_KEY = "AIzaSyC6e1fU6y6ECP-j_N9KjWEzeq2qFyL1Dy0"

export async function scenic(coordinates){
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
        let newDest = await searchNearby(`${point.lat},${point.lng}`);
        console.log('new dest', newDest.name)
        let latlng = {latitude: newDest.geometry.location.lat, longitude: newDest.geometry.location.lng};
        waypoints.push(latlng);
    }

    // console.log('waypoints', waypoints[0]);
    return waypoints;
}

async function searchNearby(location){
    let params = {
        location: location,
        key: MAPS_KEY,
        radius: 500,
    }

    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + objToQueryString(params);

    let data = await fetch(url).then(resp => resp.json());

    let point = {};
    
    for (let i=0; i < data.results.length; i++){
        let types = data.results[i].types;
        // console.log('result types!', data.results[i].types);
        if (types.includes("point_of_interest") && !types.includes("lodging")
            && (types.includes("natural_feature") || types.includes("establishment"))){
            point = data.results[i];
            break;
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