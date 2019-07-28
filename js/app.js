/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let allCards = [];
let openCards = [];

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
  }

  return array;
}

// flips card
const cardFlip = document.querySelector(".deck");
function actToClick(evt) {
  moveCounter();
  console.log("counter");
  if (evt.target.tagName == "LI") {
    evt.target.className = "card open show";
    addToOpen(evt.target.firstElementChild);
    if (openCards.length > 1) {
      checkCards();
    }
  }
}

// Responds to click on card
cardFlip.addEventListener("click", actToClick);

// Add card to open list
function addToOpen(card) {
  openCards.push(card);
}

// compare cards
function checkCards() {
  if (openCards[0].classList[1] == openCards[1].classList[1]) {
    cardMatch();
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
  let numberMoves = 0;
  console.log(numberMoves);
  if (openCards.length == 1) {
    numberMoves += 1;
    console.log(numberMoves);
    document.querySelector(".moves").innerHTML = numberMoves + " Moves";
  }
}
/*
 * DONE!!--- set up the event listener for a card. If a card is clicked:
 * DONE!!--- - display the card's symbol (put this functionality in another function that you call from this one)
 * DONE!!--- - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * DONE!!--- - if the list already has another card, check to see if the two cards match
 * DONE!!---   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * DONE!!---   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
