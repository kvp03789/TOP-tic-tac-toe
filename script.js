//OBJECT THAT CONTAINS ALL THE DOM STUFF
'use strict';
const startScreen = (function() {
    

    const titlePage = document.createElement("div");
    const playerImage = document.createElement("img");
    const computerImage = document.createElement("img");
    const playerDiv = document.createElement("div");
    const computerDiv = document.createElement("div");
    const inGame = document.querySelectorAll(".in-game");
    const whichPlayer = document.querySelector(".which-player");
    const gameBoardGrid = document.querySelector(".game-board");
    const gameGridArray = [];

    const makeBoard = function() {
        for(let i = 0; i < gameBoard.gridArray.length; i++){
            let newDiv = document.createElement('div');
            newDiv.classList.add("main-grid");
            newDiv.setAttribute("id", `${i + 1}`);
            gameBoardGrid.append(newDiv);
            gameGridArray.shift
        }       
    } 

    function showStartScreen() {
    //first set class lists and src for images
        titlePage.classList.add("new-game-screen");
        playerImage.src = "player-icon.svg";
        playerImage.classList.add("player-icon");
        computerImage.src = "robot-icon.svg";
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
        makeBoard();
        inGame.forEach((e) => {e.classList.add("visible")});
        whichPlayer.innerHTML = "Player 1's Turn";

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



// GAME BOARD OBJECT MODULE
const gameBoard = (function() {

    const gridArray = [null, null, null, null, null, null, null, null, null];

    const changeTurn = function() {
        if (newPlayer1.isPlayerTurn === true) {
            newPlayer1.isPlayerTurn = false;
            newPlayer2.isPlayerTurn = true;
        }
        else if(newPlayer1.isPlayerTurn === false) {
            newPlayer1.isPlayerTurn = true;
            newPlayer2.isPlayerTurn = false;
        }
    }
    return {
       changeTurn, gridArray
    }

})();



//Player factory function
const Player = (name, symbol, turn) => {
    const playerName = name;
    const playerSymbol = symbol;
    const isPlayerTurn = turn;

    const makeMove = function(choice) {
        if(isPlayerTurn === true) {
        gameBoard.gridArray[choice] = playerSymbol;
        console.log(gameBoard.gridArray);
        gameBoard.changeTurn();
        }
        else {
            console.log("u must construct additional pylons");
        }
        
    }

    return {playerName, playerSymbol, isPlayerTurn, makeMove};
};


    


let newPlayer1 = Player("miggs", "x", false );
let newPlayer2 = Player("kvp0", "o", true);






startScreen.showStartScreen();






