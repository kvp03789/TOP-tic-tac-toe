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

//N1 OBJ
const n1 = {
    arrayX: [],
    arrayY: [],
    winConditions: {a:[0, 1, 2], b:[3, 4 ,5], c:[6, 7, 8], d:[0, 3, 6], e:[1, 4, 7],
        f:[2, 6, 8], g:[0, 4, 8], h:[2, 4, 6]},

    
    checkWin() {
        for (let i in this.winConditions) {          
            if (this.winConditions[i].every(value => {
                return this.arrayX.indexOf(value) !== -1;
            })) {console.log("GG")}
        };
    },


    
}


// GAME BOARD OBJECT MODULE
const gameBoard = (function() {

    const gridArray = [null, null, null, null, null, null, null, null, null];
    const whichTurn = 1;
   
    const makeMove = function(player, choice) {
        
        if (player.playerNumber === this.changeTurn) {
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
            if(this.changeTurn === 1){
                this.changeTurn = 2;
                } 
            else if (this.changeTurn === 2) {
                this.changeTurn = 1;
                }
            console.log(`it is player ${this.whichTurn}'s turn.`);
            return n1.checkWin();
            
        }
        else {console.log("not ur turn lol");}
        }

    return {
       makeMove, gridArray, whichTurn, 

       get changeTurn() {
        return this.whichTurn;
       },

       set changeTurn(val) {
        this.whichTurn = val;
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


    


let player1 = Player("miggs", "x", 1 );
let player2 = Player("kvp0", "o", 2);






startScreen.showStartScreen();






