import Bingo from "./bingo.js";

export default class Card {
  constructor(title) {
    // the constructor is called when you create a new instance of the class
    this.title = title;
    console.log(`Created a new card with title: ${title}`);
  }

  markDone(target) {
    // to mark a card as done, we add a class .bingo__card--done to it
    // mark or unmark (toggle) a bingo card when clicked
    console.log("Marking card as done");

      
    if(target.className.includes("bingo__card--done")){
      // Niet meer doorstrepen
      target.className = "bingo__card"
    }else{
      // Doorstrepen
      target.className = target.className + " bingo__card--done"
    }
  }

  render(counter) {
    // rendering the card to the screen is done by building up a string of HTML
    // after that, we append the HTML to the DOM - check the index.html file to see what structure to use
    // <div class="bingo__card" data-number="1" id="bingo__card1">
    // </div>
    console.log("Rendering card...");

    // Build card HTML
    let card = document.createElement("div");
    card.id = "bingo__card" + (counter + 1);
    card.dataset.number = counter + 1;
    card.className = "bingo__card";
    card.innerText = this.title;

    // append to bingo board
    document.querySelector(".bingo__board").appendChild(card);

    card.addEventListener("click", (e) => {
      // Mark card as done
      this.markDone(e.target);
      // Check for winners
      Bingo.checkWinner()
      // Save the selection to storage
      Bingo.save()
    });
  }
}
