mapboxgl.accessToken = mbxToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [135, -25], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

const formSubmit = document.querySelector('#formSubmit')
let jobs;
formSubmit.addEventListener('submit', async (event) => {
    console.log('submitted!!')
    event.preventDefault();
    const what = document.querySelector('#search').value
    jobs = await getJobs(what)

    const geojson =
    {
        type: 'FeatureCollection',
        features: jobs.map(job => {
            if (job.latitude && job.longitude) {
                const geojson_feature = {
                    'type': 'Feature',
                    'properties': {
                        'title': `${job.title}`,
                        'description':
                            `${job.description}`
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [job.longitude, job.latitude]
                    }
                }
                return geojson_feature
            }
        }).filter(job => job != undefined)
    }

    // add markers to map
    geojson.features.forEach(feature => {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                    `<h5>${feature.properties.title}</h5><p>${feature.properties.description}</p>`
                )
        ).addTo(map);
    })
})

