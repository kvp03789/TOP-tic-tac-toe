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
    const playerAIIcon = document.querySelector("#playerAIIcon");
    const GGScreen = document.createElement("div");
    const GGTextContainer = document.createElement("div");
    const GGText = document.createElement("h1");
    const replayButton = document.createElement("button");
    const playerPara1 = document.querySelector("#player-para1");
    const playerPara2 = document.querySelector("#player-para2");
    const playerPara3 = document.querySelector("#player-para3");

    

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

    function showGG(arg) {
        if (GGScreen.classList.contains("hidden")) {
            GGScreen.classList.toggle("hidden"); 
        }
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
            gameBoard.changeTurn = 1;
            gameBoard.deleteGrid(gameBoard.gridArray);
            // gameBoard.makeGrid(gameBoard.getArray); 
            // startScreen.eventListenerBonanza();
            startScreen.changePlayerIconColor();
            GGScreen.classList.add("hidden"); 
            titlePage.classList.toggle("hidden");
            startScreen.showStartScreen();
        });

    }

   

    function changeTurnClass() {
        const gameBoardTiles = document.querySelectorAll(".main-grid");
        if(gameBoard.whichTurn === 1) {
            gameBoardTiles.forEach((x) => x.classList.add("x-hover"));  
                    
        }
        else if(gameBoard.whichTurn === 2) {
            gameBoardTiles.forEach((x) => x.classList.add("o-hover"));
            playerPara2.innerText = "Player 2's Turn!" 
        }
        else if(gameBoard.whichTurn === 3) {
            gameBoardTiles.forEach((x) => x.classList.add("o-hover"));
            playerPara2.innerText = "AI's Turn!" 
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
        playerAIIcon.classList.toggle("yellow");
    }

    function changePlayerText() {
        if(gameBoard.whichTurn === 1) {
        playerPara1.innerText = "Player 1's Turn!" ;
        playerPara2.innerText = ""; 
        playerPara3.innerText = "";
        }
        else if(gameBoard.whichTurn === 2) {
            playerPara2.innerText = "Player 2's Turn!"  
            playerPara1.innerText = ""; 
            }
        else if(gameBoard.whichTurn === 3) {
            playerPara3.innerText = "AI's Turn!";
            playerPara1.innerText = "";
        }
    }

    playerDiv.addEventListener("click", () => {
        beginGame();
    })

    computerDiv.addEventListener("click", () => {
        beginGameAI();
    })

    

    function beginGame() {
        // titlePage.style.display ="none";
        titlePage.classList.toggle("hidden");
        gameBoard.makeGrid(gameBoard.gridArray);
        // inGame.forEach((e) => {e.classList.add("visible")});
        if(document.querySelector("#playerOneIcon").classList.contains("hidden")) {
            document.querySelector("#playerOneIcon").classList.toggle("hidden");
        }
        
        if(document.querySelector("#playerTwoIcon").classList.contains("hidden")) {
            document.querySelector("#playerTwoIcon").classList.toggle("hidden");
        }
        if(document.querySelector("#playerAIIcon").classList.contains("visible")){
            document.querySelector("#playerAIIcon").classList.replace("visible", "hidden");
        }
        else {document.querySelector("#playerAIIcon").classList.add("hidden")}

        // document.querySelector("#playerAIIcon").classList.add("hidden");
        document.querySelectorAll(".main-grid").forEach((x) => x.classList.add("x-hover"));
        startScreen.eventListenerBonanza();
        startScreen.changePlayerText();
    }

    function beginGameAI() {
        // titlePage.style.display ="none";
        titlePage.classList.toggle("hidden");
        gameBoard.makeGrid(gameBoard.gridArray);
        if(document.querySelector("#playerOneIcon").classList.contains("hidden")) {
            document.querySelector("#playerOneIcon").classList.toggle("hidden");
        }
        
        if(document.querySelector("#playerTwoIcon").classList.contains("visible")) {
            document.querySelector("#playerTwoIcon").classList.replace("visible", "hidden");
        }
        else {
            document.querySelector("#playerTwoIcon").classList.add("hidden"); 
        }
        if(document.querySelector("#playerAIIcon").classList.contains("hidden")){
            document.querySelector("#playerAIIcon").classList.toggle("hidden");
        }
        document.querySelectorAll(".main-grid").forEach((x) => x.classList.add("x-hover"));
        startScreen.eventListenerBonanzaAI();
        startScreen.changePlayerText();
    }

    function eventListenerBonanza() {
        document.querySelectorAll(".main-grid").forEach((el) => {
            el.addEventListener("click", (e) => {
                  
                  gameBoard.makeMove(gameBoard.whichPlayer, e.target.id);
                  gameBoard.makeGrid(gameBoard.getArray);   
                  this.eventListenerBonanza();  
                  
            })
        })
    }

    function eventListenerBonanzaAI() {
        if(gameBoard.whichPlayer === "player3") {
            // startScreen.changePlayerIconColor();
            gameBoard.makeMoveAIAgain(gameBoard.whichPlayer, player3.makeMoveAI());
            
            gameBoard.makeGridAI(gameBoard.getArray); 
            eventListenerBonanzaAI();
        }
        else {
        document.querySelectorAll(".main-grid").forEach((el) => {
            el.addEventListener("click", (e) => {
                // startScreen.changePlayerIconColor();
                  gameBoard.makeMoveAIAgain(gameBoard.whichPlayer, e.target.id);
                  gameBoard.makeGridAI(gameBoard.getArray);   
                  startScreen.eventListenerBonanzaAI();  
                })
            })
        }
    }

    function eventListenerBonanzaLite() {
        document.querySelectorAll(".main-grid").forEach((el) => {
            el.addEventListener("click", (e) => {
                  gameBoard.makeMove(gameBoard.whichPlayer, e.target.id);   
            })
        })
    }

    function showError() {
        const errorScreen = document.createElement("div");
        const errorText = document.createElement("h3");
        const errorButton = document.createElement("button");
        errorText.classList.add("error-text");
        errorScreen.classList.add("error-screen");
        errorButton.classList.add("error-button");
        errorText.textContent = "Select another square! >.<"
        errorButton.innerText = "Oki!";
        errorScreen.append(errorText);
        errorScreen.append(errorButton);
        document.body.prepend(errorScreen);

        errorButton.addEventListener("click", (e) => {
            errorScreen.classList.toggle("hidden");
        })
    }

    return {
        beginGame, showStartScreen, showGG, changeTurnClass, 
        eventListenerBonanza, eventListenerBonanzaLite, eventListenerBonanzaAI,
        changePlayerIconColor, changePlayerText, showError
    }
})();


//N1 OBJ
const n1 = {
    arrayX: [],
    arrayY: [],
    winConditions: {a:[0, 1, 2], b:[3, 4 , 5], c:[6, 7, 8], d:[0, 3, 6], e:[1, 4, 7],
        f:[2, 5, 8], g:[0, 4, 8], h:[2, 4, 6]},

    
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

    const setArray = function(i, val) {
        
        gridArray[i] = val;
        
    };

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
            else{
                newDiv.classList.add("o-hover");
            } 
            if (newDiv.classList.contains("place-x")) {
                newDiv.classList.remove("o-hover");
            }
            startScreen.changePlayerText();
            
        }}
        
        const makeGridAI = function(arr) {
            for(let i = 0; i < arr.length; i++) {
                const newDiv = document.createElement("div");
                // newDiv.innerText = arr[i];
                document.querySelector(".game-board").append(newDiv);  
                newDiv.classList.add("main-grid");
                newDiv.setAttribute("id", `${i}`);
                if(arr[i] === "player1"){
                    newDiv.classList.add("place-x")
                }
                else if(arr[i] === "player3") {
                    newDiv.classList.add("place-o")
                }
                if(this.changeTurn === 1) {
                    newDiv.classList.add("x-hover");
                }
                else{
                    newDiv.classList.add("o-hover");
                } 
                if (newDiv.classList.contains("place-x")) {
                    newDiv.classList.remove("o-hover");
                }
                startScreen.changePlayerText();
                
            }}
    

    const deleteGrid = function(arr) {
        for(let i = 0; i < arr.length; i++) {
            document.querySelector(".game-board").removeChild(document.querySelector(".main-grid"));
        }
    }

    const clearArray = function(val) { 
        // this.gridArray.length = 0;
        // this.gridArray = [null, null, null, null, null, null, null, null, null];
        this.gridArray.splice(0, this.gridArray.length);
        for(let i = 0; i < 9; i++) {
            this.gridArray.push(null);
        }
    }
       
    const makeMove = function(playerSelect, choice) {   
        
        if (playerSelect == this.whichPlayer) {
            gameBoard.deleteGrid(gameBoard.gridArray);
            startScreen.changePlayerIconColor();
                setArray(choice, playerSelect);            
            if (playerSelect === "player1") {
                n1.arrayX.push(parseInt(choice));//push to arrayX
            }
            else if (playerSelect === "player2") {
                n1.arrayY.push(parseInt(choice));//push to arrayY
            }
            console.log(this.getArray);
            console.log(n1.getX(), n1.getY());
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

        const makeMoveAI = function(playerSelect, choice) {   
        
            if (playerSelect == this.whichPlayer && gameBoard.gridArray[choice] === null) {
                gameBoard.deleteGrid(gameBoard.gridArray);
                startScreen.changePlayerIconColor();
                // gridArray[choice] = playerSelect;  //mark board with player's move
                setArray(choice, playerSelect);
                if (playerSelect === "player1") {
                    n1.arrayX.push(parseInt(choice));//push to arrayX
                }
                else if (playerSelect === "player3") {
                    n1.arrayY.push(parseInt(choice));//push to arrayY
                }
                console.log(this.getArray);
                console.log(n1.getX(), n1.getY());
                if(this.whichPlayer === "player1"){
                     this.changeTurn = 3;
                    } 
                else if (this.whichPlayer === "player3") {
                     this.changeTurn = 1;
                    }
                console.log(`it is player ${this.whichTurn}'s turn.`);
                n1.checkWin();
                
            }
            else {gameBoard.makeMove();}
            
            }

            const makeMoveAIAgain = function(playerSelect, choice) {   
                
                if (playerSelect == this.whichPlayer && gameBoard.gridArray[choice] === null)  {
                    gameBoard.deleteGrid(gameBoard.gridArray);
                    startScreen.changePlayerIconColor();
                    // gridArray[choice] = playerSelect;  //mark board with player's move
                    setArray(choice, playerSelect);
                    if (playerSelect === "player1") {
                        n1.arrayX.push(parseInt(choice));//push to arrayX
                    }
                    else if (playerSelect === "player3") {
                        n1.arrayY.push(parseInt(choice));//push to arrayY
                    }
                    console.log(this.getArray);
                    console.log(n1.getX(), n1.getY());
                    if(this.whichPlayer === "player1"){
                         this.changeTurn = 3;
                        } 
                    else if (this.whichPlayer === "player3") {
                         this.changeTurn = 1;
                        }
                    console.log(`it is player ${this.whichTurn}'s turn.`);
                    n1.checkWin();
                    
                }
                else if (gameBoard.gridArray[choice] !== null){gameBoard.makeMoveAIAgain(gameBoard.whichPlayer, player3.makeMoveAI())}

                else if(gridArray.every((e) => {e !== null})){
                        return console.log("TIE")}
                
                }
              
    return {
       makeMove, makeMoveAI, makeMoveAIAgain, gridArray, whichTurn, makeGrid, makeGridAI, 
       deleteGrid, clearArray, setArray, 

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
        else if(this.changeTurn === 3){
            return "player3"
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
    let makeMoveAI = function() {
       return Math.floor((Math.random() * 8));
    }
    return {
        playerName, playerSymbol, playerNumber, makeMoveAI
    };
};


let player1 = Player("miggs", "x", 1);
let player2 = Player("kvp0", "o", 2);
let player3 = Player("AI", "o", 3)

// startScreen.beginGame();
startScreen.showStartScreen()





