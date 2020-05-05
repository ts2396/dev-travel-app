const regeneratorRuntime = require("regenerator-runtime");
test ("It should be a function", async() => {
    expect(typeof getLatLng('Dallas Texas')).toBe("object");
});

async function getLatLng (place){
    const fetch = require('node-fetch');
    const dotenv = require('dotenv');
    dotenv.config();
    const reqURL = 'http://api.geonames.org/searchJSON?q=';
    const geoUsername = process.env.GN_ID;
    const res = await fetch(`${reqURL}${place}&username=${geoUsername}`)
    try {
        const data = await res.json();
        const lng = data.geonames[0].lng;
        const lat = data.geonames[0].lat;
        return[lng,lat];
    } catch(error) {
        console.log("error", error);
    }
}
