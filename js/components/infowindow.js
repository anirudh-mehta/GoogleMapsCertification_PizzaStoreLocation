function setupInfowindowEvent(map, callback) {
    const marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    // Info Window
    const infoWindow = new google.maps.InfoWindow();

    // Show the information for a store when its marker is clicked.
    map.data.addListener('click', event => {
        let name = event.feature.getProperty('name');
        let vicinity = event.feature.getProperty('vicinity');
        let position = event.feature.getGeometry().get();
        let content = `
            <h2>${name}</h2><p>${vicinity}</p>
        `
        infoWindow.setContent(content);
        infoWindow.setPosition(position);
        infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
        infoWindow.open(map);

        callback(event.feature.getGeometry().get());
    });
}