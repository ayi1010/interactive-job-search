// display the map
mapboxgl.accessToken = mbxToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [135, -25], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// initialising
const markerManager = new MarkerManager();

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');

    const jobs = await getJobs(config.defaultSearchTerms, config.defaultSearchOR, config.defaultSearchExclude)
    const filteredData = markerManager.convertToGeojson(jobs)
    markerManager.deleteMarkers();
    markerManager.addMarkers(filteredData)
});

const formSubmit = document.querySelector('#formSubmit')
formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('submitted!')

    const what = document.querySelector('#search_what').value
    const what_or = document.querySelector('#search_what_or').value
    const what_exclude = document.querySelector('#search_what_exclude').value

    const jobs = await getJobs(what, what_or, what_exclude)
    const filteredData = markerManager.convertToGeojson(jobs)
    markerManager.deleteMarkers();
    markerManager.addMarkers(filteredData)
})

// Adding tags for search terms
const options = {
    separator: ' ',
    duplicate: false,
    enter: true,
    transform: 'input => input.toUpperCase()',
    placeholder: ''
}
const tagin_what = new Tagin(document.querySelector('#search_what'), options)
const tagin_what_or = new Tagin(document.querySelector('#search_what_or'), options)
const tagin_what_exclude = new Tagin(document.querySelector('#search_what_exclude'), options)



