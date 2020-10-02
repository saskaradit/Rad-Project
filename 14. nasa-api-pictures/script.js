const resultNav = document.getElementById('results-nav');
const favNav = document.getElementById('fav-nav');
const imgContainer = document.querySelector('.img-container');
const saveConfirm = document.querySelector('.save-confirm')
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const api_key = 'DEMO_KEY'
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&count=${count}`

let resultArray = [];
let favorites ={};

function showContent(page){
  window.scrollTo({
    top:0,
    behavior: 'instant'
  })
  if(page==='results'){
    resultNav.classList.remove('hidden');
    favNav.classList.add('hidden');
  }else{
    resultNav.classList.add('hidden');
    favNav.classList.remove('hidden');
  }
  loader.classList.add('hidden');
}

function createDOMNodes(page){
  const currArray = page === 'results' ? resultArray : Object.values(favorites);
  currArray.forEach(res =>{
    // Card
    const card = document.createElement('div');
    card.classList.add('card')
    // Link
    const link = document.createElement('a');
    link.href = res.hdurl;
    link.title = 'Viw Full Image'
    link.target = '_blank'
    // Image
    const img = document.createElement('img');
    img.src = res.url;
    img.alt = 'NASA Picture of the Day'
    img.loading = 'lazy';
    img.classList.add('card-img-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title')
    cardTitle.textContent = res.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    if(page==='results'){
      saveText.textContent = 'Add to Favorites'
      saveText.setAttribute('onclick',`saveFavorites('${res.url}')`)
    }else{
      saveText.textContent = 'Remove from Favorites'
      saveText.setAttribute('onclick',`removeFavorites('${res.url}')`)
    }
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = res.explanation;
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = res.date;
    // Copyright
    const copyrightRes = res.copyright === undefined ? '' : res.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightRes}`;

    // Append
    footer.append(date,copyright);
    cardBody.append(cardTitle,saveText,cardText,footer);
    link.appendChild(img);
    card.append(link,cardBody);
    imgContainer.append(card);
    console.log(imgContainer);
  })
}

function updateDOM(page){
  // Get Fav
  if(localStorage.getItem('nasaFav')){
    favorites = JSON.parse(localStorage.getItem('nasaFav'));
  }
  imgContainer.textContent = '';
  createDOMNodes(page);
  showContent(page);
}

async function getNasaPic(){
  loader.classList.remove('hidden');
  try {
    const response = await fetch(apiUrl);
    resultArray = await response.json();
    console.log(resultArray);
    updateDOM('results');
  } catch (error) {
    console.log(error)
  }
}

// Add to Fav
function saveFavorites(itemUrl){
  // Loop through
  resultArray.forEach(item =>{
    if(item.url.includes(itemUrl) && !favorites[itemUrl]){
      favorites[itemUrl] = item;
      // Show Save Confirm
      saveConfirm.hidden = false;
      setTimeout(()=>{
        saveConfirm.hidden = true;
      },2000);
      // Save in Local Storage
      localStorage.setItem('nasaFav',JSON.stringify(favorites));
    }
  })
}

// Remove itemo from favorite
function removeFavorites(itemUrl){
  if(favorites[itemUrl]){
    delete favorites[itemUrl];
    // Save in Local Storage
    localStorage.setItem('nasaFav',JSON.stringify(favorites));
    updateDOM('favorite')
  }
}

// On Load
getNasaPic();