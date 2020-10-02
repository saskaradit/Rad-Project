// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuess = [];
let bestScoresArr = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penalty = 0;
let finalTime = 0;
let finalTimeDisplay ='0.0'

// Scroll
let valueY = 0;

// Refresh Splash Page Best Score
function bestScoresToDOM(){
  bestScores.forEach((bs,index) =>{
    const bestScoreEl = bs;
    bestScoreEl.textContent = `${bestScoresArr[index].bestScore}s`
  })
}

// Check Local Storage
function getSavedBestScores(){
  if(localStorage.getItem('bestScores')){
    bestScoresArr = JSON.parse(localStorage.getItem('bestScores'));
  }else{
    bestScoresArr = [
      {questions: 10,bestScore: finalTimeDisplay},
      {questions: 25,bestScore: finalTimeDisplay},
      {questions: 50,bestScore: finalTimeDisplay},
      {questions: 99,bestScore: finalTimeDisplay}
    ];
    localStorage.setItem('bestScores', JSON.stringify(bestScoresArr))
  }
  bestScoresToDOM();
}

// Update Best Score
function updateBestScore(){
  bestScoresArr.forEach((score,index)=>{
    // Select Best Score
    if(questionAmount == score.questions){
      // Return Best Score
      const saveBest = Number(bestScoresArr[index].bestScore);
      // Update If Less
      if(saveBest===0 ||saveBest > finalTime){
        bestScoresArr[index].bestScore = finalTimeDisplay;
      }
    }
  })
  // Update Splash Page
  bestScoresToDOM();
  // Save to Local Storage
  localStorage.setItem('bestScores',JSON.stringify(bestScoresArr))
}

// Play Again
function playAgain(){
  gamePage.addEventListener('click',startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuess = [];
  valueY = 0;
  playAgainBtn.hidden = true;
  itemContainer.textContent = ''
}

// showScorePage
function showScorePage(){
  setTimeout(()=>{
    playAgainBtn.hidden = false;
  },1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
}

// Format Time, score to DOM
function scoresToDOM(){
  finalTimeDisplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penalty = penalty.toFixed(1);
  baseTimeEl.textContent = `Base Time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty Time: +${penalty}s`;
  finalTimeEl.textContent = `${finalTimeDisplay}s`;
  updateBestScore();
  // Scroll to Top
  itemContainer.scrollTo({
    top:0,
    behavior:'instant'
  })
  showScorePage();
}

// Stop Timer, Process
function checkTime(){
  if(playerGuess.length == questionAmount) {
    clearInterval(timer);
    equationsArray.forEach((eq,index)=>{
    if(eq.evaluated===playerGuess[index]){/*Correct*/}
      else{
        // Incorrect Guess
        penalty+=0.5;
      }
    })
    finalTime = timePlayed + penalty;
    scoresToDOM();
  }

}

// Add time +0.1s
function addTime(){
  timePlayed += 0.1;
  checkTime();
}

// Start Time when Clicked
function startTimer(){
  // Reset Time
  timePlayed =0, penalty=0, finalTime=0;
  timer = setInterval(addTime,100);
  gamePage.removeEventListener('click',startTimer);
}

// Scroll, Store Selection
function select(guessTrue){
  // Scroll 80px
  valueY += 80;
  itemContainer.scroll(0,valueY)
  // Add Player Guess to Array
  return guessTrue ? playerGuess.push('true') : playerGuess.push('false');
}

// Display Game Page
function showGamePage(){
  gamePage.hidden = false;
  countdownPage.hidden = true;
}

// Random Number Up to Max
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);
}

// Add Equation to DOM
function equationsToDOM(){
  equationsArray.forEach(eq =>{
    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    const eqText = document.createElement('h1');
    eqText.textContent = eq.value;
    item.appendChild(eqText);
    itemContainer.appendChild(item);
  })
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// Run Countdown
function countdownStart(){
  let count = 3;
  countdown.textContent ='3';
  const time = setInterval(()=>{
    count--;
    if(count===0){
      countdown.textContent = 'GO!'
    }
    else if(count == -1){
      showGamePage();
      clearInterval(time);
    }
    else{
      countdown.textContent = count;
    }
  },1000)
  // countdown.textContent = '3';
  // setTimeout(()=>{
  //   countdown.textContent = '2';
  // },1000)
  // setTimeout(()=>{
  //   countdown.textContent = '1';
  // },2000)
  // setTimeout(()=>{
  //   countdown.textContent = 'GO!';
  // },3000)
}

// Navigate
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  populateGamePage();
  countdownStart();
  // setTimeout(showGamePage,4000)
}

// Get Selected Radio Value
function getRadioValue(){
  let radioValue;
  radioInputs.forEach(e =>{
    if(e.checked){
      radioValue = e.value;
    }
  })
  return radioValue;
}

// Form Question Amount
function selectQuestion(event){
  event.preventDefault();
  questionAmount = getRadioValue();
  if(questionAmount) showCountdown();
}


startForm.addEventListener('click',()=>{
  radioContainers.forEach((radio)=>{
    // Remove
    radio.classList.remove('selected-label');
    if(radio.children[1].checked){
      radio.classList.add('selected-label');
    }
  })
})

// Event Listener
startForm.addEventListener('submit',selectQuestion);
gamePage.addEventListener('click',startTimer);

// On Load
getSavedBestScores();