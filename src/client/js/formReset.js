function handleClear(event, onlyResults) {
  event.preventDefault();
  // check what text was put into the form field
  if (!onlyResults) {
    let formPlace = document.getElementById('place');
    formPlace.value = '';
    let formDepart = document.getElementById('departDate');
    formDepart.value = '';
    const imageBox = document.getElementById('placeImage');
    imageBox.style.backgroundImage = '';
    imageBox.classList.add('placeImage', 'newImage');
  }
  document.getElementById('placeDetail').innerHTML = '';
  document.getElementById('weather').innerHTML = `The Local Weather`;
  document.getElementById('temp').innerHTML = '';
  document.getElementById('maxTemp').innerHTML = '';
  document.getElementById('minTemp').innerHTML = '';
  document.getElementById('details').innerHTML = '';
}

export { handleClear };
