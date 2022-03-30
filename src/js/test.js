// Initialize and add the map
let db_place = '';
let db_coordinate = {lat: 0.0, lng: 0.0}

function initAutocomplete() {
    // The location of Uluru
    const sejong = {lat: 37.5518, lng: 127.0736};

    const map = new google.maps.Map(document.getElementById("index_google_map"), {
        center: sejong,
        zoom: 15,
    });


    //center위치 이동되었을 때 작동하는건데 이건 값이 너무 많이 생겨서 무거워서 안쓰는게 좋을 듯
    /*map.addListener('center_changed', () => {
        console.log("center_changed_center : " + map.center);
        console.log("center_changed_zoom : " + map.zoom);
        console.log("#######################################################")
    })*/

    //구글맵 드래그 끝났을 때
    map.addListener('dragend', () => {
        console.log("center_changed_center : " + map.center);
        console.log("center_changed_zoom : " + map.zoom);
        console.log("-------------------------------------------------------")
    })

    //구글맵 줌 값 바뀌었을 때
    map.addListener('zoom_changed', () => {
        console.log("zoom_changed_center : " + map.center);
        console.log("zoom_changed_zoom : " + map.zoom);
        console.log("#######################################################")
    })
}