require('dotenv')
    .config();
const weatherbitAPIKey = process.env.WB_API_ID;
const pixabayApiKey = process.env.PB_API_ID;

let projectData = {};

const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('dist'));

const cors = require('cors');
app.use(cors());

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', {
        root: '.'
    });
});

app.get('/weatherDetailsURL', appGetWeatherURL);
app.get('/pictureURL', appGetPictureURL);
app.post('/weather', appPost);

function appGetWeatherURL(req, res) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${weatherbitAPIKey}`;
    res.send({
        apiUrl: url
    });
}

function appGetPictureURL(req, res) {
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}`;
    res.send({
        apiUrl: url
    });
}

function appPost(req, res) {
    const data = req.body;
    projectData = data;
    res.send('projectData saved');
}

app.get('/all', appGet);

function appGet(req, res) {
    res.send(projectData);
}

let port = 8060;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
    console.log(`Weatherbit Key: ${weatherbitAPIKey}`);
    console.log(`Pixabay Key: ${pixabayApiKey}`);
});

module.exports = {
    appGetWeatherURL
    , appGetPictureURL
    ,
};