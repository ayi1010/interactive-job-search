// initialising
const markerManager = new MarkerManager();

const formSubmit = document.querySelector('#formSubmit')
let jobs;
formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submitted!')

    const what = document.querySelector('#search_what').value
    const what_or = document.querySelector('#search_what_or').value
    const what_exclude = document.querySelector('#search_what_exclude').value

    jobs = await getJobs(what, what_or, what_exclude)

    const filteredData = markerManager.createGeojson(jobs)
    // add markers & popups to map
    markerManager.addMarkers(filteredData)
})
