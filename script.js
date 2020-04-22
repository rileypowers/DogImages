let numUrl = 'https://dog.ceo/api/breeds/image/random/';

'use strict';



function getDogImage(number) {
  console.log('get dog image .')
  // fetch(`${numUrl}${number}`)
  let dogBreed = $('#dogBreed').val();
    fetch(`https://dog.ceo/api/breeds/image/random/${number}`)
    .then(response => {
      if(response.statusCode === '404') {
        throw new Error('Something went wrong :(')
      } if(response.responseStatus >= 400 && response.responseStatus !== 404) {
        throw new Error('Something went wrong. Please try again.')} 
      return response.json();
    })
    .then(responseJson => displayResults(responseJson.message))
    // .catch (error => alert('Something went wrong :('));
}


function getDogImage2(number) {
  console.log('get dog image 2')
  let dogBreed = $('#dogBreed').val();
  let dogBreedUrl = `https://dog.ceo/api/breed/${dogBreed}/images/random/${number}`;
  fetch(dogBreedUrl)
    .then(response => {
      if(response.statusCode === 404) {
        throw new Error('That is not a listed dog breed. Check your spelling or choose another breed')
      } if(response.responseStatus >= 400 && response.responseStatus !== 404) {
         throw new Error('Something went wrong. Please try again.')} 
      console.log(response);

      return response.json();
    })
    .then(responseJson => {
      console.log('RESPONSE', responseJson)
      displayResults(responseJson.message)
    })
    .catch(error => alert('That is not a listed dog breed. Check your spelling or choose another breed'));
}


function watchForm() {
  $('#dogNum').submit(event => {
    event.preventDefault();
    let numOfImg = $('#numberOfDogs').val();
    getDogImage(numOfImg);
  });
}


function watchForm2() {
  $('.dogType').submit(event => {
    event.preventDefault();
    let numOfImg = $('#numberOfDogs').val();
    getDogImage2(numOfImg);
    // console.log('watchForm2 ran');
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.dogImg').html(generateNumDogs(responseJson))
}
// `<img src="${responseJson.message[0]}">`

function generateNumDogs(imgArray) {
  let imgPlaceholder = '';
  imgArray.forEach((image, i) => {
    console.log(image);
    imgPlaceholder += `<img class="doggyPic" src="${image}">`
  })
  return imgPlaceholder;
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchForm2();
});

