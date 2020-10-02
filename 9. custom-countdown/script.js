const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeElBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function updateDOM(){
  countdownActive = setInterval(()=>{
  const now = new Date().getTime();
  const distance = countdownValue - now;
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance% day)/hour);
  const minutes = Math.floor((distance % hour)/minute);
  const seconds = Math.floor((distance % minute)/second);

  inputContainer.hidden = true;

  // If countdown Ended
  if(distance<0){
    countdownEl.hidden = true;
    clearInterval(countdownActive);
    completeElInfo.textContent = `${countdownTitle} Finished On ${countdownDate}`
    completeEl.hidden = false;
  }
  else{
    // Show Countdown In Progress
    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`
    timeElements[0].textContent = `${days}`
    timeElements[1].textContent = `${hours}`
    timeElements[2].textContent = `${minutes}`
    timeElements[3].textContent = `${seconds}`
    completeEl.hidden= true;
    countdownEl.hidden = false;
  }
  },second)
}


// Set Date Input Minimum
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

function updateCountdown(e){
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown={
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown',JSON.stringify(savedCountdown))
  // Check if Valid
  if(countdownDate===''){
    alert('Please Select A Date');
  }
  else{
    // Get Number Version
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset(){
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true;
  clearInterval(countdownActive);
  countdownTitle='';
  countdownDate='';
  localStorage.removeItem('countdown');
}

function restoreCountdown(){
  // Get Countdown
  if(localStorage.getItem('countdown')){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click',reset);
completeElBtn.addEventListener('click',reset);

// On load Check Local Storage
restoreCountdown();