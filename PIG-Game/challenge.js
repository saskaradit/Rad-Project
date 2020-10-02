/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, isPlaying, lastDice;

init();

var finalScore;

// Roll Dice

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isPlaying) {
    // Random Number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Display Dice
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // Double Six Lost All Score
    // if (lastDice == 6 && dice == 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector("#score-" + activePlayer).textContent = 0;
    //   nextPlayer();
    // }

    // // Update Round Score if Dice is not 1
    // else if (dice != 1) {
    //   // add score
    //   roundScore += dice;
    //   document.querySelector(
    //     "#current-" + activePlayer
    //   ).textContent = roundScore;
    // } else {
    //   // Change Player
    //   nextPlayer();
    // }
    // lastDice = dice;

    if (dice1 != 1 && dice2 != 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Change Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isPlaying) {
    // Add current Score to Global Score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check Final Score Input
    var input = document.querySelector(".finalScore").value;
    if (input) {
      finalScore = input;
    } else {
      finalScore = 100;
    }

    console.log(finalScore);

    // Check if won
    if (scores[activePlayer] >= finalScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      isPlaying = false;
    } else {
      nextPlayer(); //Change Player
    }
  }
});

function nextPlayer() {
  // Change Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  // Change Class

  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  isPlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}
