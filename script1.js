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
    const playerOneIcon = document.querySelector("#playerOneIcon");
    const playerTwoIcon = document.querySelector("#playerTwoIcon");
    const GGScreen = document.createElement("div");
    const GGTextContainer = document.createElement("div");
    const GGText = document.createElement("h1");
    const replayButton = document.createElement("button");

    

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

    function showGG(arg) {
        GGScreen.classList.add("gg-screen");
        if (arg === "x") {
        GGText.innerText = "GG! PLAYER 1 WINS!";
        }
        else {
        GGText.innerText = "GG! PLAYER 2 WINS!";
        }

        GGText.classList.add("GGText");
        GGTextContainer.classList.add("fade-in-text");
        replayButton.classList.add("replay-button");
        replayButton.innerText = "Replay?";
        

        GGTextContainer.append(GGText);
        GGScreen.append(GGTextContainer);
        GGScreen.append(replayButton);
        
        document.body.prepend(GGScreen);
        document.querySelector(".replay-button").addEventListener("click", () => {
            gameBoard.clearArray(null);
            // gameBoard.setArray = null;
            // gameBoard.gridArray.length = 0;
            gameBoard.changeTurn = 1;
            gameBoard.deleteGrid(gameBoard.gridArray);
            gameBoard.makeGrid(gameBoard.getArray); 
            startScreen.eventListenerBonanza();
            GGScreen.classList.toggle("hidden"); 
            this.changePlayerIconColor();
 
        });

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

    function changePlayerIconColor() {
        // if (gameBoard.changeTurn() === 1) {
        //     playerOneIcon.classList.toggle("yellow");
        //     playerTwoIcon.classList.toggle("yellow");
        // }
        // else if(gameBoard.changeTurn() === 2) {
        //     playerTwoIcon
        // }
        playerOneIcon.classList.toggle("yellow");
        playerTwoIcon.classList.toggle("yellow");
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
        startScreen.eventListenerBonanza();
        
    }

    function eventListenerBonanza() {
        document.querySelectorAll(".main-grid").forEach((el) => {
            el.addEventListener("click", (e) => {
                  
                  gameBoard.makeMove(gameBoard.whichPlayer, e.target.id);
                  gameBoard.makeGrid(gameBoard.gridArray);   
                  this.eventListenerBonanza();  
                  
            })
        })
    }

    function eventListenerBonanzaLite() {
        document.querySelectorAll(".main-grid").forEach((el) => {
            el.addEventListener("click", (e) => {
                  gameBoard.makeMove(gameBoard.whichPlayer, e.target.id);   
            })
        })
    }

    return {
        beginGame, showStartScreen, showGG, changeTurnClass, 
        eventListenerBonanza, eventListenerBonanzaLite,
        changePlayerIconColor,
    }
})();


//N1 OBJ
const n1 = {
    arrayX: [],
    arrayY: [],
    winConditions: {a:[0, 1, 2], b:[3, 4 , 5], c:[6, 7, 8], d:[0, 3, 6], e:[1, 4, 7],
        f:[2, 6, 8], g:[0, 4, 8], h:[2, 4, 6]},

    
    checkWin() {
        for (let i in this.winConditions) {          
            if (
                (this.winConditions[i].every(value => {
                 return this.arrayX.indexOf(value) !== -1;
            }))) {
                startScreen.showGG("x");
                this.arrayX.length = 0;
                this.arrayY.length = 0;
                return console.log("GG PLAYER1!")
            }
            else if (
            (this.winConditions[i].every(value => {
                 return this.arrayY.indexOf(value) !== -1;
            }))
            ) {
                startScreen.showGG("o");
                this.arrayX.length = 0;
                this.arrayY.length = 0;
               return console.log("GG PLAYER2!");
            }
        };
    },

    getX() {
        return this.arrayX;
    },

    getY() {
        return this.arrayY;
    },
}


// GAME BOARD OBJECT MODULE
const gameBoard = (function() {

    const gridArray = [null, null, null, null, null, null, null, null, null];
    let whichTurn = 1;

    const makeGrid = function(arr) {
        for(let i = 0; i < arr.length; i++) {
            const newDiv = document.createElement("div");
            // newDiv.innerText = arr[i];
            document.querySelector(".game-board").append(newDiv);  
            newDiv.classList.add("main-grid");
            newDiv.setAttribute("id", `${i}`);
            if(arr[i] === "player1"){
                newDiv.classList.add("place-x")
            }
            else if(arr[i] === "player2") {
                newDiv.classList.add("place-o")
            }
            if(this.changeTurn === 1) {
                newDiv.classList.add("x-hover");
            }
            else {newDiv.classList.add("o-hover");}
            document.querySelector(".game-board").append(newDiv);
        }
        
    }   

    const deleteGrid = function(arr) {
        for(let i = 0; i < arr.length; i++) {
            document.querySelector(".game-board").removeChild(document.querySelector(".main-grid"));
        }
    }

    const clearArray = function(val) { 
        this.gridArray.length = 0;
        this.gridArray = [val, val, val, val, val, val, val, val, val];
    }
       
    const makeMove = function(playerSelect, choice) {   
        
        if (playerSelect == this.whichPlayer) {
            gameBoard.deleteGrid(gameBoard.gridArray);
            startScreen.changePlayerIconColor();
            gridArray[choice] = playerSelect;  //mark board with player's move
            if (playerSelect === "player1") {
                n1.arrayX.push(parseInt(choice));//push to arrayX
            }
            else if (playerSelect === "player2") {
                n1.arrayY.push(parseInt(choice));//push to arrayY
            }
            console.log(this.gridArray);
            console.log(n1.arrayX, n1.arrayY);
            if(this.whichPlayer === "player1"){
                 this.changeTurn = 2;
                } 
            else if (this.whichPlayer === "player2") {
                 this.changeTurn = 1;
                }
            console.log(`it is player ${this.whichTurn}'s turn.`);
            n1.checkWin();
            
        }
        else {console.log("not ur turn lol");}
        
        }

    return {
       makeMove, gridArray, whichTurn, makeGrid, deleteGrid, clearArray,

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
      },

      get getArray() {
        return this.gridArray;
      },
      
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






