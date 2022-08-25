//OBJECT THAT CONTAINS ALL THE DOM STUFF
'use strict';
const startScreen = (function() {
    

    const titlePage = document.createElement("div");
    const playerImage = document.createElement("img");
    const computerImage = document.createElement("img");
    const playerDiv = document.createElement("div");
    const computerDiv = document.createElement("div");
    const inGame = document.querySelectorAll(".in-game");
    // const whichPlayer = document.querySelector(".which-player");
    // const gameBoardGrid = document.querySelector(".game-board");
    // const gameGridArray = [];

    

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

    function changeTurnClass() {
        const gameBoardTiles = document.querySelectorAll(".main-grid");
        if(gameBoard.whichTurn === 1) {
            gameBoardTiles.forEach((x) => x.classList.add("x-hover"));            
        }
        else if(gameBoard.whichTurn === 2) {
            gameBoardTiles.forEach((x) => x.classList.add("o-hover"));
        }
    }

    playerDiv.addEventListener("click", () => {
        beginGame();
    })

    computerDiv.addEventListener("click", () => {
        beginGame();
    })

    function beginGame() {
        titlePage.style.display ="none";
        gameBoard.makeGrid(gameBoard.gridArray);
        inGame.forEach((e) => {e.classList.add("visible")});
        document.querySelectorAll(".main-grid").forEach((x) => x.classList.add("x-hover"));
        gameBoard.eventListenerBonanza();
        
    }

    function eventListenerBonanza() {
        document.querySelectorAll(".main-grid").forEach((el) => {
            el.addEventListener("click", (e) => {
                  gameBoard.makeMove(gameBoard.whichPlayer, e.target.id);
                  gameBoard.makeGrid(gameBoard.gridArray);
            })
        })
    }

    return {
        beginGame, showStartScreen, changeTurnClass, eventListenerBonanza
    }
})();


//N1 OBJ
const n1 = {
    arrayX: [],
    arrayY: [],
    winConditions: {a:[0, 1, 2], b:[3, 4 ,5], c:[6, 7, 8], d:[0, 3, 6], e:[1, 4, 7],
        f:[2, 6, 8], g:[0, 4, 8], h:[2, 4, 6]},

    
    checkWin() {
        for (let i in this.winConditions) {          
            if (
                (this.winConditions[i].every(value => {
                return this.arrayX.indexOf(value) !== -1;
            }))
            ||
            (this.winConditions[i].every(value => {
                return this.arrayY.indexOf(value) !== -1;
            }))
            ) {
                console.log("GG")
            }
        };
    },
}


// GAME BOARD OBJECT MODULE
const gameBoard = (function() {

    const gridArray = [null, null, null, null, null, null, null, null, null];
    let whichTurn = 1;

    const makeGrid = function(arr) {
        for(let i = 0; i < arr.length; i++) {
            const newDiv = document.createElement("div");
            newDiv.innerText = arr[i];
            document.querySelector(".game-board").append(newDiv);  
            newDiv.classList.add("main-grid");
            newDiv.setAttribute("id", `${i + 1}`);
            document.querySelector(".game-board").append(newDiv);
        }
    }   
       
    const makeMove = function(player, choice) {
        
        if (player === this.whichPlayer) {
            let symbol = player.playerSymbol;   
            gridArray[choice] = player.playerSymbol;  //mark board with player's move
            if (symbol === "x") {
                n1.arrayX.push(choice);//push to arrayX
            }
            else if (symbol === "o") {
                n1.arrayY.push(choice);//push to arrayY
            }
            console.log(gridArray);
            console.log(n1.arrayX, n1.arrayY);
            if(this.whichPlayer === "player1"){
                 this.changeTurn = 2;
                } 
            else if (this.whichPlayer === "player2") {
                 this.changeTurn = 1;
                }
            console.log(`it is player ${this.whichTurn}'s turn.`);
            return n1.checkWin();
            
        }
        else {console.log("not ur turn lol");}
        this.makeGrid(this.gridArray);
        }

    return {
       makeMove, gridArray, whichTurn, makeGrid,

       get changeTurn() {
        return this.whichTurn;
       },

       set changeTurn(val) {
        this.whichTurn = val;
       },

       get whichPlayer() {
        if(this.changeTurn === 1){
            return "player1"
        }
        else if(this.changeTurn === 2){
            return "player2"
        }
    }
    }
})();


//Player factory function
const Player = (name, symbol, number) => {
    let playerName = name;
    let playerSymbol = symbol;
    let playerNumber = number;

    return {
        playerName, playerSymbol, playerNumber
    };
};


let player1 = Player("miggs", "x", 1);
let player2 = Player("kvp0", "o", 2);

startScreen.beginGame();






