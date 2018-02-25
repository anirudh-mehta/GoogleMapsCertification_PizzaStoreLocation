function initMap() {
    const chandigarh = new google.maps.LatLng(30.719696, 76.752818);

    // Create the map
    const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
        zoom: 13,
        center: chandigarh,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: getMapStyle()
    });

    // Load the stores GeoJSON onto the map.
    map.data.loadGeoJson("js/data/stores.json");

    getDestinations();
    setupDirections(map);
    setupAutocomplete(map, stores, showDistanceMatrix);
    setupInfowindowEvent(map, showDirections);
}