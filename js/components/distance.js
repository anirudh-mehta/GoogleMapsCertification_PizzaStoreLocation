function getDestinations() {
    destinations = [];

    if (destinations.length == 0) {
        // Restrict to 10 locations maximum to avoid hitting limits.
        for (var i = 0; i < stores.features.length && i < 10; i++) {
            var coords = stores.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            destinations.push(latLng);
        }
    }

    return destinations;
}

function showDistanceMatrix(origin) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: getDestinations(),
            travelMode: 'DRIVING'
        }, callback);
}

function callback(response, status) {
    if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        var data = [];

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var from = origins[i];
                var to = destinations[j];

                data.push("Distance to " + to + " : " + distance + "<br><br>");
            }
        }

        document.getElementById('directions-distance-panel').innerHTML = data;
    }
}