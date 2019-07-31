/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let allCards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];
let openCards = [];
let matchedCards = [];
let numberMoves = 0;
const cardFlip = document.querySelector(".deck");
const deck = cardFlip.children;
const resetGame = document.querySelector(".restart");
const stars = document.getElementsByClassName("stars")[0].children;
const timerMins = document.querySelector("#timer .minutes");
const timerSecs = document.querySelector("#timer .seconds");
let timer = undefined;
let elapsedSeconds = 0;
let min = 0;
let sec = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    console.log("shuffle");
  }

  return array;
}

// Responds to click on card
cardFlip.addEventListener("click", actToClick);
startTimer();

// Responds to click on reset button
resetGame.addEventListener("click", restartGame);

// flips card
function actToClick(evt) {
  if (evt.target.tagName == "LI") {
    evt.target.className = "card open show";
    addToOpen(evt.target.firstElementChild);
    reduceStars();
    if (openCards.length > 1) {
      checkCards();
    }
  }
}

// Add card to open list
function addToOpen(card) {
  openCards.push(card);
}

//Restart Game
function restartGame() {
  openCards = [];
  matchedCards = [];
  numberMoves = 0;
  mixedCards = shuffle(allCards);
  let index = 0;

  // flips card back to original position
  for (item of deck) {
    item.className = "card";
    item.children.className = `fa ${mixedCards[index]}`;
    console.log("after shuffle");
    index++;
  }

  // show stars again
  let starIndex = 0;
  for (star of stars) {
    star.style.display = "";
  }
  elapsedSeconds = 0;
  min = 0;
  sec = 0;
  timerMins.textContent = "00";
  timerSecs.textContent = "00";
  stopTimer();
  console.log("end restart");
}

// compare cards
function checkCards() {
  moveCounter();
  if (openCards[0].classList[1] == openCards[1].classList[1]) {
    cardMatch();
    matchedCards.push(...openCards);
    openCards = [];
  } else {
    // when cards dont match
    setTimeout(function() {
      openCards[0].parentElement.className = "card";
      openCards[1].parentElement.className = "card";
      openCards = [];
    }, 1000);
  }
}

//when cards match
function cardMatch() {
  openCards[0].parentElement.className = "card match";
  openCards[1].parentElement.className = "card match";
}

// move counter
function moveCounter() {
  if (openCards.length > 1) {
    numberMoves++;
    document.querySelector(".moves").innerHTML = "Moves - " + numberMoves;
  }
}

//reduce stars
function reduceStars() {
  if (numberMoves > 10) {
    stars[0].style.display = "none";
  }
  if (numberMoves > 14) {
    stars[1].style.display = "none";
  }
  if (numberMoves > 17) {
    stars[2].style.display = "none";
  }
}

// start timer function
function startTimer() {
  timer = setInterval(setTime, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function setTime() {
  let remainderSeconds = ++elapsedSeconds;
  min = parseInt(remainderSeconds / 60);
  timerMins.textContent = stringTime(min);
  remainderSeconds = remainderSeconds % 60;
  sec = remainderSeconds;
  timerSecs.textContent = stringTime(sec);
}

function stringTime(val) {
  let valString = val + "";
  return valString.length >= 2 ? `${val}` : `0${val}`;
}
