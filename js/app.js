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
const stars = document.querySelector(".stars");

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
  for (star of stars) {
    star.style.display = "";
  }
  clearInterval();
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
    stars.children[0].style.display = "none";
  }
  if (numberMoves > 14) {
    stars.children[1].style.display = "none";
  }
  if (numberMoves > 17) {
    stars.children[2].style.display = "none";
  }
}

// timer function
function startTimer() {
  clearInterval();
  let sec = 0;
  function pad(val) {
    return val > 9 ? val : "0" + val;
  }
  setInterval(function timer() {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
  }, 1000);
}

/*
 *  set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
