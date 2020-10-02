const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photoArray = [];
let initialized = true;

// Unsplash API
let initialCount = 10;
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const apiKey='z-fFE9mkEgHw1_uTYD3pGgFRiUJHfUtESjMKJTzsjzE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(imgCount){
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`
}

function allImageLoaded(){
  imageLoaded++;
  if(imageLoaded===totalImages){
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element,attributes){
  for(const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}

// Get photos from API
function displayPhotos(){
  imageLoaded = 0;
  totalImages = photoArray.length
  // Create Elements for Links and Photos
  photoArray.forEach((e)=>{
    // Create Anchor Element
    const item = document.createElement('a');
    setAttributes(item,{href:e.links.html,target:'_blank'})
    // Create Image
    const img = document.createElement('img');
    setAttributes(img,{src:e.urls.regular,alt:e.alt_description,title:e.alt_description})
    // Event Listener
    img.addEventListener('load',allImageLoaded);
    // Put img inside <a>, and then put both inside the container
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

async function getPhotos(){
  try {
    const response = await fetch(proxyUrl+apiUrl);
    photoArray = await response.json();
    displayPhotos();
    if(initialized) {
      updateAPIURLWithNewCount(30);
      initialized = false;
    }
    // console.log(data);
  } catch (error) {
    console.log(error)
  }
}

// Check if scrolled to the bottom
window.addEventListener('scroll',()=>{
  // console.log('scrolled');
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
    && ready){
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();