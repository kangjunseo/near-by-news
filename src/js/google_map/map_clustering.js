// Initialize and add the map
function initAutocomplete() {
    // The location of Uluru
    const sejong = {lat: 37.5518, lng: 127.0736};

    const map = new google.maps.Map(document.getElementById("index_google_map"), {
        center: sejong,
        zoom: 15,
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    google.maps.event.addDomListener(window, 'load', () => {
        var bounds = map.getBounds()
        var locations = []
        axios.get('http://localhost:3003/post_api/map_clustering',
            {
                method: "get", params: {
                    x1: bounds.getSouthWest().lng(), x2: bounds.getNorthEast().lng()
                    , y1: bounds.getSouthWest().lat(), y2: bounds.getNorthEast().lat()
                }
            }
        ).then(function (response) {
            coordinates = response.data['map_clustering']
            var locations = []
            for (i = 0; i < coordinates.length; i++) {
                var tmp_coor = coordinates[i]
                locations.push({lat: Number(tmp_coor['lat']), lng: Number(tmp_coor['lng'])})
            }
            const markers = locations.map((position, i) => {
                const label = labels[i % labels.length];
                const marker = new google.maps.Marker({
                    position,
                    label,
                });

                marker.addListener("click", () => {
                    infoWindow.setContent(label);
                    infoWindow.open(map, marker);
                });

                return marker;
            });
            const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
        });
    });

    //구글맵 드래그 끝났을 때
    map.addListener('dragend', () => {
        var bounds = map.getBounds()
        var locations = []
        axios.get('http://localhost:3003/post_api/map_clustering',
            {
                method: "get", params: {
                    x1: bounds.getSouthWest().lng(), x2: bounds.getNorthEast().lng()
                    , y1: bounds.getSouthWest().lat(), y2: bounds.getNorthEast().lat()
                }
            }
        ).then(function (response) {
            // markerCluster.clearMarkers();
            coordinates = response.data['map_clustering']
            //(String(coordinates[0]).split(",")[0])
            //coordinates = coordinates.split(",")
            //alert(response.data['map_clustering'][0])
            var locations = []
            for (i = 0; i < coordinates.length; i++) {
                var tmp_coor = coordinates[i]
                locations.push({lat: Number(tmp_coor['lat']), lng: Number(tmp_coor['lng'])})
            }
            const markers = locations.map((position, i) => {
                const label = labels[i % labels.length];
                const marker = new google.maps.Marker({
                    position,
                    label,
                });

                // markers can only be keyboard focusable when they have click listeners
                // open info window when marker is clicked
                marker.addListener("click", () => {
                    infoWindow.setContent(label);
                    infoWindow.open(map, marker);
                });

                return marker;
            });
            const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
            //alert(String(coordinates[0]).split(",")[0])
            //alert(locations[0]['lat'])
        });
        console.log("center_changed_center : " + map.getBounds().getNorthEast().lat());
        console.log("center_changed_zoom : " + map.zoom);
        console.log("-------------------------------------------------------")
    })

    //구글맵 줌 값 바뀌었을 때
    map.addListener('zoom_changed', () => {
        var bounds = map.getBounds()
        var locations = []
        axios.get('http://localhost:3003/post_api/map_clustering',
            {
                method: "get", params: {
                    x1: bounds.getSouthWest().lng(), x2: bounds.getNorthEast().lng()
                    , y1: bounds.getSouthWest().lat(), y2: bounds.getNorthEast().lat()
                }
            }
        ).then(function (response) {
            // markerCluster.clearMarkers();
            coordinates = response.data['map_clustering']
            var locations = []
            for (i = 0; i < coordinates.length; i++) {
                var tmp_coor = coordinates[i]
                locations.push({lat: Number(tmp_coor['lat']), lng: Number(tmp_coor['lng'])})
            }
            const markers = locations.map((position, i) => {
                const label = labels[i % labels.length];
                const marker = new google.maps.Marker({
                    position,
                    label,
                });

                marker.addListener("click", () => {
                    infoWindow.setContent(label);
                    infoWindow.open(map, marker);
                });

                return marker;
            });
            const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
        });
        console.log("zoom_changed_center : " + map.getBounds());
        console.log("zoom_changed_zoom : " + map.zoom);
        console.log("#######################################################")
    })
}