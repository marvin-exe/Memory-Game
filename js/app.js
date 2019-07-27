/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
  if (evt.target.tagName == "LI") {
    evt.target.className = "card open show";
    addToOpen(evt.target.firstElementChild);
    console.log(evt.target.firstElementChild);
  }
}

// Responds to click on card
cardFlip.addEventListener("click", actToClick);

// Add card to open list
function addToOpen(card) {
  openCards.push(card);
  console.log(openCards);
  if (openCards.length == 2) {
    cardMatch();
  }
}

// card match
function cardMatch() {
  firstCard = openCards[0];
  secondCard = openCards[1];
  if (firstCard == secondCard) {
    firstCard.parentElement.className = "card match";
    secondCard.parentElement.className = "card match";
  }
}

/*
 * DONE!!--- set up the event listener for a card. If a card is clicked:
 * DONE!!--- - display the card's symbol (put this functionality in another function that you call from this one)
 * DONE!!--- - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
