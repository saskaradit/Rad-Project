import {startConfetti,stopConfetti, removeConfetti} from './confetti.js';

const playerScoreEl = document.getElementById('player-score');
const playerChoiceEl = document.getElementById('player-choice');
const computerScoreEl = document.getElementById('computer-score');
const computerChoiceEl = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');

const playerRock = document.getElementById('player-rock');
const playerPaper = document.getElementById('player-paper');
const playerScissors = document.getElementById('player-scissors');
const playerLizard = document.getElementById('player-lizard');
const playerSpock = document.getElementById('player-spock');

const computerRock = document.getElementById('computer-rock');
const computerPaper = document.getElementById('computer-paper');
const computerScissors = document.getElementById('computer-scissors');
const computerLizard = document.getElementById('computer-lizard');
const computerSpock = document.getElementById('computer-spock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerScore = 0;
let computerScore = 0;

function resetSelected(){
  allGameIcons.forEach(icons =>{
    icons.classList.remove('selected');
  })
  stopConfetti();
  removeConfetti();
}

function resetAll(){
  playerScore=0;
  computerScore=0;
  computerScoreEl.textContent = '0';
  playerScoreEl.textContent = '0';
  computerChoiceEl.textContent='';
  playerChoiceEl.textContent='';
  resultText.textContent='';
  resetSelected();
}
window.resetAll = resetAll;

function computerRandomChoice(){
  const computerRandomNumber = Math.random();
  if(computerRandomNumber <= 0.2) computerChoice = 'rock'
  else if( computerRandomNumber <= 0.4 ) computerChoice = 'paper'
  else if( computerRandomNumber <= 0.6 ) computerChoice = 'scissors'
  else if( computerRandomNumber <= 0.8 ) computerChoice = 'lizard'
  else  computerChoice = 'spock'
}

// Add Selected Styling
function displayComputerChoice(){
  switch(computerChoice){
    case 'rock':
      computerRock.classList.add('selected')
      computerChoiceEl.textContent = ' --- Rock'
      break;
    case 'paper':
      computerPaper.classList.add('selected')
      computerChoiceEl.textContent = ' --- paper'
      break;
    case 'scissors':
      computerScissors.classList.add('selected')
      computerChoiceEl.textContent = ' --- scissors'
      break;
    case 'lizard':
      computerLizard.classList.add('selected')
      computerChoiceEl.textContent = ' --- lizard'
      break;
    case 'spock':
      computerSpock.classList.add('selected')
      computerChoiceEl.textContent = ' --- spock'
      break;
    default: break;
  }
}

function updateScore(playerChoice){
  if(playerChoice === computerChoice) resultText.textContent = "It's a Tie";
  else {
    const choice = choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice) > -1){
      startConfetti();
      resultText.textContent = "You Won";
      playerScore++;
      playerScoreEl.textContent = playerScore
    }else{
      computerScore++;
      resultText.textContent = "You Lost";
      computerScoreEl.textContent = computerScore;
    }
  }
}

// Process turn
function checkResult(playerChoice){
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// Passing Player Selection
function select(playerChoice){
  checkResult(playerChoice);
  switch(playerChoice){
    case 'rock':
      playerRock.classList.add('selected')
      playerChoiceEl.textContent = ' --- Rock'
      break;
    case 'paper':
      playerPaper.classList.add('selected')
      playerChoiceEl.textContent = ' --- paper'
      break;
    case 'scissors':
      playerScissors.classList.add('selected')
      playerChoiceEl.textContent = ' --- scissors'
      break;
    case 'lizard':
      playerLizard.classList.add('selected')
      playerChoiceEl.textContent = ' --- lizard'
      break;
    case 'spock':
      playerSpock.classList.add('selected')
      playerChoiceEl.textContent = ' --- spock'
      break;
    default: break;
  }
}
window.select = select;

// On Start Set Initial Value
resetAll();

