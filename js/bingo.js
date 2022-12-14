import Card from "./card.js";

export default class Bingo {
  constructor() {
    // the constructor is called when you create a new instance of the class
    console.log("Welcome to Bingo! 🎉");

    // an array including 25 cards (5x5)
    this.cards = [
      "Already made a website",
      "Already worked before they started studying",
      "Already designed a logo",
      "Doesn't live with their parents",
      "Doesn't have a Discord account",
      "Has to commute more than 1 hour to school",
      "Is a vegetarian",
      "Can play the guitar",
      "Has already visited the US of A",
      "Is older than 25",
      "Owns a goldfish",
      "Is afraid of snakes",
      "Speaks 3 different languages",
      "Has never been to a festival before",
      "Knows what CSS is",
      "Is a Marvel Comics fan",
      "Knows all the ingredients for a mojito",
      "Has a student job",
      "Plays a team sport",
      "Knows how to play chess",
      "Is a DJ",
      "Likes cilantro",
      "Is afraid of heights",
      "Loves heavy metal music",
      "Is famous on Instagram"
    ];

    // we start by rendering the cards to the screen
    this.renderCards();

    // then we load the saved bingo cards from localstorage to mark them as done
    Bingo.load();
  }

  renderCards() {
    // this function renders the cards to the screen
    console.log("rendering cards");

    for(let i = 0; i < this.cards.length; i++){
      // create a new card
      const card = new Card(this.cards[i]);
      // render the card to the screen
      card.render(i);
    }
  }

  static checkWinner() {
    // a static function can be called without creating an instance of the class
    console.log("Checking for a winner");

    // count all cards that are marked as done (select done items and count them with .length)
    let cardsDone = document.querySelectorAll(".bingo__card--done");
    if (cardsDone.length === 5) {
      console.log("Winner winner chicken dinner")
      // show the animated gif to the winner
      document.querySelector(".bingo__overlay").style.display = "block";
    }
  }

  static save() {
    // save the cards that are done to localstorage
    // you can simply save an array with the card numbers like [1, 6, 8]
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    console.log("Saving bingo to localstorage");
    
    let cards = document.querySelectorAll(".bingo__card--done");
    let cardsWon = []

    
    // if there are not done cards, remove localstorage
    if (cards.length === 0) {
      // remove localstorage
      localStorage.clear();
    }

    for(let i = 0; i < cards.length; i++){
      let number = cards[i].dataset.number
      cardsWon.push(number)
    }

    localStorage.setItem('bingo', JSON.stringify(cardsWon));
  }

  static load() {
    // load the cards that are done from localstorage
    // this works the other way around of the save function
    // load the saved string from localstorage and parse it as an array, then loop over it
    console.log("loading bingo selection from localstorage");

    // check if localstorage item exists
    if (localStorage.getItem("bingo")) {
      let cardsWon = localStorage.getItem('bingo'); // '"[2,4,8,9]"'
      // JSON.parse() will convert the string [1, 7, 8] back to an array which you can loop
      cardsWon = JSON.parse(cardsWon) // [2, 4, 8, 9]

      // loop over the numbers 1, 7, 8 and mark those cards as done by adding the right CSS class
      // .bingo__card--done
      for(let i = 0; i < cardsWon.length; i++) {
        let currentCard = cardsWon[i] // bvb 2
        let card = document.querySelector("#bingo__card" + currentCard)

        card.className = card.className + " bingo__card--done"
      }
    }
  }
}
