// Initialize and add the map
let db_place = '';
let db_coordinate = {lat: 0.0, lng: 0.0}

function initAutocomplete() {
    // The location of Uluru
    const sejong = {lat: 37.5518, lng: 127.0736};

    const map = new google.maps.Map(document.getElementById("index_google_map"), {
        center: sejong,
        zoom: 15,
        mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    map.addListener("zoom_changed", () => {
        console.log(map.zoom);
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        let de_count = false;
        places.forEach((place) => {
            if (de_count === false) {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

                /*const icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };*/

                // Create a marker for each place.
                markers.push(
                    new google.maps.Marker({
                        map,
                        /*icon,*/
                        title: place.name,
                        position: place.geometry.location,
                        draggable: true
                    })
                );

                //오류시 아램나 활성화
                // send_map(place.formatted_address, place.geometry.location, '1')

                db_place = place.formatted_address;
                db_coordinate = place.geometry.location;
                console.log(db_coordinate + ' 1')

                const geocoder = new google.maps.Geocoder();
                const infowindow = new google.maps.InfoWindow();

                infowindow.setContent(place.formatted_address + '<br><p id="map_info_end_button"><span onclick="send_map()">완료</span></p>');
                infowindow.open(map, markers[0]);

                google.maps.event.addListener(markers[0], 'dragend', function (evt) {
                    const accident_location = {
                        lat: parseFloat(evt.latLng.lat().toFixed(3)),
                        lng: parseFloat(evt.latLng.lng().toFixed(3))
                    }

                    // db_coordinate.lat = evt.latLng.lat().toFixed(3);
                    // db_coordinate.lng = evt.latLng.lng().toFixed(3);

                    // document.getElementById('upload_coordinate').value = db_coordinate;

                    geocodeLatLng(accident_location, geocoder, map, infowindow, markers[0]);
                });

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
                de_count = true;
            }
        });
        map.fitBounds(bounds);
    });
}

function geocodeLatLng(latlng, geocoder, map, infowindow, marker) {
    geocoder
        .geocode({location: latlng})
        .then((response) => {
            if (response.results[0]) {
                /*map.setZoom(11);

                const marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                });*/

                infowindow.setContent(response.results[0].formatted_address + '<br><p id="map_info_end_button"><span onclick="send_map()">완료</span></p>');
                infowindow.open(map, marker);

                /*console.log("place : ", (response.results[0].formatted_address));*/

                // db_place = response.results[0].formatted_address;
                // document.getElementById('db_place').value = db_place;

                // 오류시 아래 코드 하나만 활성화
                // send_map(response.results[0].formatted_address, latlng, '2')

                db_place = response.results[0].formatted_address;
                db_coordinate = latlng;
                console.log(latlng + ' 2')
            } else {
                window.alert("No results found");
            }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
}

function upload_map() {
    document.getElementById('main_right').style.transition = "0.8s";
    document.getElementById('main_right').style.width = "100%";
    document.getElementById('main_right').style.display = "block";

    document.getElementById('write_map_background').style.transition = "0.8s";
    document.getElementById('write_map_background').style.display = "block";

    document.getElementById('index_google_map').style.boxShadow = "none";

    document.getElementById('map_head').style.color = "#ffffff";
    document.getElementById('map_head').style.marginLeft = "10px";

    document.getElementById('pac-input').style.left = "50%";
    document.getElementById('pac-input').style.width = "600px";
    document.getElementById('pac-input').style.transform = "translate(-50%, 0)";
}

function close_map() {
    document.getElementById('main_right').style.transition = "0.8s";
    document.getElementById('main_right').style.removeProperty("width");
    document.getElementById('main_right').style.removeProperty("display");

    document.getElementById('write_map_background').style.transition = "0.8s";
    document.getElementById('write_map_background').style.removeProperty('display');

    document.getElementById('index_google_map').style.removeProperty('boxShadow');

    document.getElementById('map_head').style.removeProperty('color');
    document.getElementById('map_head').style.removeProperty('margin-left');

    document.getElementById('pac-input').style.removeProperty('left')
    document.getElementById('pac-input').style.removeProperty("width");
    document.getElementById('pac-input').style.removeProperty('transform');

}

/*DB에 지도 값 넘기기*/

function send_map() {
    document.getElementById('upload_place').value = db_place;
    document.getElementById('upload_coordinate').value = JSON.stringify(db_coordinate);

    document.getElementById('main_right').style.transition = "0.8s";
    document.getElementById('main_right').style.removeProperty("width");
    document.getElementById('main_right').style.removeProperty("display");

    document.getElementById('write_map_background').style.transition = "0.8s";
    document.getElementById('write_map_background').style.removeProperty('display');

    document.getElementById('index_google_map').style.removeProperty('boxShadow');

    document.getElementById('map_head').style.removeProperty('color');
    document.getElementById('map_head').style.removeProperty('margin-left');

    document.getElementById('pac-input').style.removeProperty('left')
    document.getElementById('pac-input').style.removeProperty("width");
    document.getElementById('pac-input').style.removeProperty('transform');
}