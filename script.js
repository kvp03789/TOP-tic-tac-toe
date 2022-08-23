//OBJECT THAT CONTAINS ALL THE DOM STUFF
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
        gameBoard.startPlayerOneTurn();
    }

    function changePlayerTurnText() {
        if (whichPlayer.innerHTML = "Player 1's Turn") {
            whichPlayer.innerHTML = "Player 2's Turn";
        }
        if (whichPlayer.innerHTML = "Player 2's Turn") {
            whichPlayer.innerHTML = "Player 1's Turn";
        }
    }

    return {
        showStartScreen, changePlayerTurnText
    }
})();



//GAME BOARD OBJECT MODULE
const gameBoard = (function() {

    const gameGrid = document.querySelectorAll(".main-grid");
    let gameBoardGrid = Array.from(gameGrid);
   

    //player 1 turn
    const startPlayerOneTurn = function() {

        gameGrid.forEach((el) => {
            el.classList.remove("o-hover");
        });
        gameGrid.forEach((el) => {
                el.classList.add("x-hover");
        });

        gameGrid.forEach((el) => {
            el.addEventListener("click", (e) => {
                e.target.setAttribute('id', 'place-x');
                e.target.classList.add("marked");
                startScreen.changePlayerTurnText();
                gameBoard.startPlayerTwoTurn();
            })
        });

        }

    //player 2 turn

    const startPlayerTwoTurn = function () {
        gameGrid.forEach((el) => {
            el.classList.remove("x-hover");
        });

        gameGrid.forEach((el) => {
                el.classList.add("o-hover");   
        })

        gameGrid.forEach((el) => {
            el.addEventListener("click", (e) => {
                e.target.setAttribute('id', 'place-o');
                e.target.classList.add("marked");  
                startScreen.changePlayerTurnText();
                gameBoard.startPlayerOneTurn();
            })
        });
        }

        return {
            gameBoardGrid, startPlayerOneTurn, startPlayerTwoTurn
        }
})();



//Player factory function
const Player = (name, symbol, turn) => {
    const playerName = name;
    const playerSymbol = symbol;
    const isPlayerTurn = turn;
};








startScreen.showStartScreen();






