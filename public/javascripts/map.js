mapboxgl.accessToken = mbxToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [131, -26], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

