function handleClear(event, justResults) {
  event.preventDefault();
  // check what text was put into the form field
  if (!justResults) {
    let formPlace = document.getElementById('place');
    formPlace.value = '';
    let formDepart = document.getElementById('departDate');
    formDepart.value = '';
    const imagePlace = document.getElementById('placeImage');
    imagePlace.style.backgroundImage = '';
    imagePlace.classList.add('placeImage', 'newImage');
  }
  document.getElementById('placeDetail')
    .innerHTML = '';
  document.getElementById('weather')
    .innerHTML = `The Local Weather`;
  document.getElementById('temp')
    .innerHTML = '';
  document.getElementById('maxTemp')
    .innerHTML = '';
  document.getElementById('minTemp')
    .innerHTML = '';
  document.getElementById('details')
    .innerHTML = '';
}

export {
  handleClear
};
