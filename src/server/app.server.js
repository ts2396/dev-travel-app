app.get('/weatherDetailsURL', appGetWeatherURL);
function appGetWeatherURL(req, res) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${weatherbitAPIKey}`;
    res.send({ apiUrl: url });
}

app.get('/pictureURL', appGetPictureURL);
function appGetPictureURL(req, res) {
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}`;
    res.send({ apiUrl: url });