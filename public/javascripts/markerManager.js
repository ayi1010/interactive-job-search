class MarkerManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.markers = [];
    }
    convertToGeojson(jobData) {
        // refactor with reduce method
        const geojson =
        {
            type: 'FeatureCollection',
            features: jobData.map(job => {
                if (job.latitude && job.longitude) {
                    const geojson_feature = {
                        'type': 'Feature',
                        'properties': {
                            'title': `${job.title}`,
                            'description':
                                `${job.description}`,
                            'url': `${job.redirect_url}`
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
        return geojson
    }
    addMarkers(data) {
        console.log(data)
        console.log(data.features)
        data.features.forEach(feature => {
            // set marker
            const marker = new mapboxgl.Marker()
                .setLngLat(feature.geometry.coordinates)

            // add popups & add to map
            marker.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                    `<h5>${feature.properties.title}</h5><p>${feature.properties.description}</p><a href="${feature.properties.url}" target="_blank">Go to Job ad...</a>`
                )
            ).addTo(map);

            // add markers
            this.markers.push(marker)
        })
    }
    deleteMarkers() {
        // for (let i=0; i < this.markers.length; i++){
        //     this.markers.remove();
        // }
        this.markers.forEach(marker => { marker.remove() })
    }
}

