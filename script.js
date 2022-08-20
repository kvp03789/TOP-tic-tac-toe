
const startScreen = (function() {
    'use strict';

    const titlePage = document.createElement("div");
    const playerImage = document.createElement("img");
    const computerImage = document.createElement("img");
    const playerDiv = document.createElement("div");
    const computerDiv = document.createElement("div");
    const inGame = document.querySelectorAll(".in-game");
    const whichPlayer = document.querySelector(".which-player");

    function showStartScreen() {
    //first set class lists and src for images
        titlePage.classList.add("new-game-screen");
        playerImage.src = "/images/player-icon.svg";
        playerImage.classList.add("player-icon");
        computerImage.src = "/images/robot-icon.svg";
        computerImage.classList.add("robot-icon");
        playerDiv.classList.add("player-div")
        computerDiv.classList.add("player-div")
    //everything append/prepend to DOM
        playerDiv.append(playerImage);
        computerDiv.append(computerImage);
        titlePage.append(playerDiv, computerDiv);
        document.body.prepend(titlePage);
    }

    playerDiv.addEventListener("click", () => {
        beginGame();
    })

    computerDiv.addEventListener("click", () => {
        beginGame();
    })

    function beginGame() {
        titlePage.style.display ="none";
        inGame.forEach((e) => {e.classList.add("visible")});
        whichPlayer.innerHTML = "Player 1's Turn";
    }

    return {
        showStartScreen
    }
})();

//gameboard module/object
const gameBoard = (function() {

    const gameGrid = document.querySelectorAll(".main-grid");
    const gameBoardGrid = Array.from(gameGrid);

    function placeX() {

    }

    return {
        gameBoardGrid,
    }
})();

//Player factory function
const Player = (name, symbol) => {
    const playerName = name;
    const playerSymbol = symbol;
};


startScreen.showStartScreen();




