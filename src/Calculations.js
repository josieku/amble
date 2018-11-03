function fast(data){
    let lineString = new H.geo.LineString();
    data.shape.forEach(point => {
        let parts = point.split(",");
        lineString.pushLatLngAlt(parts[0], parts[1]);
    });
    let routeLine = new H.map.Polyline(lineString, {
        style: { strokeColor: "blue", lineWidth: 5 }
    });
    let startMarker = new H.map.Marker({
        lat: this.start.split(",")[0],
        lng: this.start.split(",")[1]
    });
    let finishMarker = new H.map.Marker({
        lat: this.finish.split(",")[0],
        lng: this.finish.split(",")[1]
    });
    this.map.addObjects([routeLine, startMarker, finishMarker]);
    this.map.setViewBounds(routeLine.getBounds());
}

function scenic(data){
    console.log('in scenic');
    let interests=[];
    for (let i=0; i< this.directions.length; i++){
        //let at every 2 maneuver
        if (interests.length < i/2){
            const pos = this.directions[i].position;
            const coord = `${pos.latitude},${pos.longitude}`

            // Define search parameters:
            let params = {
            // Look for places matching the category "eat and drink":
            'cat': 'sights-museums',
            // Search in the Chinatown district in San Francisco:
            'in': coord + ';r=500'
            };
            // Run a search request with parameters, headers (empty), and callback functions:
            this.explore.request(params, {}, onResult, onError);

            const addMarkerToMap = (coordinates) => {
                var svgMarkup = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
                    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" /><text x="12" y="18" font-size="12pt" ' +
                    'font-family="Arial" font-weight="bold" text-anchor="middle" fill="white">W</text></svg>';
                var icon = new H.map.Icon(svgMarkup), marker = new H.map.Marker(coordinates, {icon: icon});
                this.map.addObject(marker);
            }

            // Define a callback function to handle data on success:
            function onResult(data) {
                let point = data.results.items[0];
                console.log('scenic data', point)
                addMarkerToMap(`${point.position[0]},${point.position[1]}`);
            }
            // Define a callback function to handle errors:
            function onError(data) {
                console.log(data);
            }
            // Run a search request with parameters, headers (empty), and callback functions:
            this.explore.request(params, {}, onResult, onError);

        }                
    }
}

function safe(){

}

export {
        fast, 
        scenic, 
        // safe, 
        // quiet, 
        // workout
    }