const dotenv = require("dotenv")
dotenv.config()

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.mapbox_token
const geocoder = mbxGeocoding({ accessToken: mbxToken });

const createMap = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: 'Sydney, Australia',
        limit: 1
    }).send()
    console.log(geoData)
    res.send("OK!!")
}

createMap()

module.exports = {
    createMap
}