document.addEventListener("DOMContentLoaded", () => {
    const messageEl = document.getElementById("message-el");
    const cardsEl = document.getElementById("cards-el");
    const sumEl = document.getElementById("sum-el");
    const playerEl = document.getElementById("player-el");

    const startBtn = document.getElementById("start-btn");
    const drawBtn = document.getElementById("draw-btn");

    const player = {
        name: "Player",
        chips: 200
    }

    playerEl.textContent = player.name + ": $" + player.chips;

    function getRandomCard() {
        let randomNumber = Math.floor(Math.random() * 13) + 1;

        if (randomNumber > 10) {
            return 10;
        } else if (randomNumber === 1) {
            return 11;
        }

        return randomNumber;
    }

    let cards;
    let gameEnded;

    function startGame() {
        cards = [getRandomCard(), getRandomCard()];
        gameEnded = false;
        renderGame();
    }

    function renderGame() {
        let message = "";
        let sum = 0;

        cardsEl.textContent = "Cards:";

        for (const card of cards) {
            cardsEl.textContent += " " + card;
            sum += card;
        }

        sumEl.textContent = "Sum: " + sum;

        if (sum <= 20) {
            message = "Do you want to draw a new card?";
        } else if (sum === 21) {
            message = "You've got Blackjack!";
            gameEnded = true;
        } else {
            message = "You're out of the game!";
            gameEnded = true;
        }

        messageEl.textContent = message;
    }

    function drawCard() {
        if (gameEnded) return;

        cards.push(getRandomCard());
        renderGame();
    }

    startBtn.addEventListener("click", startGame);
    drawBtn.addEventListener("click", drawCard);
});
