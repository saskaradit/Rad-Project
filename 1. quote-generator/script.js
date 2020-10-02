const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuote = document.getElementById('new-quote')
const loader = document.getElementById('loader');

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
var errorCounter = 0;

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl+apiUrl);
    const data = await response.json();
    //If no author, use unkown
    if(data.quoteAuthor==='') authorText.innerText = 'Unknown' 
    else authorText.innerText = data.quoteAuthor;

    // If too many characters
    if(data.quoteText.length>120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();

  } catch (error) {
    if(errorCounter<10){
      errorCounter+=1;
      getQuote();
    }
    else alert('Something is Wrong')
  }
}

// Tweet Quote
function tweetQuote(){
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuote.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);


// On Load
getQuote();