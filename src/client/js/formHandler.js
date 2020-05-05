import { handleClear } from '../js/formReset'
import { dateValid, getTDate, nullDays } from './checkers'
const regeneratorRuntime = require("regenerator-runtime");

const geoUsername = 'ts2396';
function dataValid(place, date) {
    // check what text was put into the form field
    if (!place || !date) {
        alert('* Please enter both place and depart date!')
        return false;
    } else if (!dateValid(date)) {
        alert('* Please enter date in the correct format!')
        return false;
    } else if (getTDate(date) < Date.now()) {
        alert('* Please enter a date in the future!')
        return false;
    }
    return true;
}
function handleSubmit(event) {
    event.preventDefault()
    handleClear(event, true)

    const place = document.getElementById('place').value
    const date = document.getElementById('departDate').value

    if (!dataValid(place, date)) {
        return;
    }

    getGeoNameInfo(place)
    .then(placeDetails => {
        placeDetails && getWeatherDataUrl()
        .then(reqUrl => getWeatherData(reqUrl, placeDetails, getTDate(date), place))
        .then(weatherDetails => postData('http://localhost:8060/weather', weatherDetails))
        .then(() => {
            updateUI();
        })
    })
    
    getPictureDataUrl(place)
    .then(reqUrl => {
        getPlaceImage(reqUrl, place)
        .then(res => {
            const imagePlace = document.getElementById('placeImage');
            if (res.imageURL) {
                imagePlace.style.backgroundImage = `url(${res.imageURL})`;
            } else {
                imagePlace.style.backgroundImage = '';
                imagePlace.classList.add("placeImage", "newImage");
            }
        })
    })
}

const getGeoNameInfo = async (place) => {
    let searchQuery = encodeURIComponent(place)
    const request = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${searchQuery}&username=${geoUsername}`);
    try {
      const data = await request.json();
      // return allData;
      if (data.postalCodes && data.postalCodes.length) {
        console.log(data.postalCodes.length);
        return data.postalCodes[0];
      }
      return;
    }
    catch(error) {
      console.log('error',error);
    }
}

/* Function to GET Web API URL */
const getWeatherDataUrl = async () => {
  try {
    const requestURLres = await fetch("http://localhost:8060/weatherDetailsURL");
    const requestURL = await requestURLres.json();
    // return requestURL
    console.log(requestURL);
    return requestURL;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Web API Data*/
const getWeatherData = async (reqUrl, details, time, place) => {
  const currentDate = Date.now();
  const miliSecInweek = 604800000;
  let requestUrl = `${reqUrl.apiUrl}&units=I&days=1&lat=${details.lat}&lon=${details.lng}`
  if (time - currentDate > miliSecInweek) {
    requestUrl = `${reqUrl.apiUrl}&units=I&days=1&lat=${details.lat}&lon=${details.lng}&ts=${time/1000}`
  }
  try {
    const request = await fetch(requestUrl);
    const data = await request.json();
    // return allData;
    const dailyData = data && data.daily && data.daily.length && data.daily.data[0];
    const allData = {
      place: details.place || place,
      country_code: data.country_code || '',
      numDay: nullDays(time, currentDate ) || 0,
      temp: data.data[0].temp || '',
      min_temp: data.data[0].min_temp || '',
      max_temp: data.data[0].max_temp || '',
    }
    console.log(allData);
    // Save data in server

    return allData;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Web API URL */
const getPictureDataUrl = async () => {
  const requestURLres = await fetch("http://localhost:8060/pictureURL");
  try {
    // Transform into JSON
    const requestURL = await requestURLres.json();
    // return requestURL
    console.log(requestURL);
    return requestURL;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Web API Data*/
const getPlaceImage = async (reqURL, place) => {
  const requestUrl = `${reqURL.apiUrl}&q=${place}&image_type=photo`
  const request = await fetch(requestUrl);
  try {
    // Transform into JSON
    const data = await request.json();
    // return allData;
    const image = data.hits.length && data.hits[0].webformatURL;
    console.log(image);
    return {imageURL: image};
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to POST data */
const postData = async (url='', data={}) => {
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }) 
  try {
    if (response.status == 200) { return;}
  } catch (error) {
    console.log('error',error);
    // appropriately handle the error
  }
}

/* Update UI */
const updateUI = async () => {
    const placeDataRes = await fetch('http://localhost:8060/all');
    try {
        const placeData = await placeDataRes.json();
        document.getElementById('placeDetail').innerHTML = `${placeData.place}, ${placeData.country_code} is ${placeData.numDay} days away!`;
        document.getElementById('weather').innerHTML = `Local Weather`;
        document.getElementById('temp').innerHTML = `Current Temperature: ${placeData.temp}&#8457;`;
        document.getElementById('maxTemp').innerHTML = `Max: ${placeData.max_temp}&#8457;`;
        document.getElementById('minTemp').innerHTML = `Min: ${placeData.min_temp}&#8457`;
    }
    catch (error) {
        console.log("error", error);
    }
}

export { handleSubmit, dataValid }
