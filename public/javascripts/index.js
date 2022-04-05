// initialising
const markerManager = new MarkerManager();

document.addEventListener('DOMContentLoaded', async (event) => {
    console.log('DOM fully loaded and parsed');

    const jobs = await getJobs('javascript', 'web', 'senior')

    const filteredData = markerManager.convertToGeojson(jobs)
    markerManager.deleteMarkers()
    // add markers & popups to map
    markerManager.addMarkers(filteredData)
});

const formSubmit = document.querySelector('#formSubmit')
formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submitted!')

    const what = document.querySelector('#search_what').value
    const what_or = document.querySelector('#search_what_or').value
    const what_exclude = document.querySelector('#search_what_exclude').value

    const jobs = await getJobs(what, what_or, what_exclude)

    const filteredData = markerManager.convertToGeojson(jobs)
    markerManager.deleteMarkers()
    // add markers & popups to map
    markerManager.addMarkers(filteredData)
})
