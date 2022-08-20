function createNewGameScreen() {
    const titlePage = document.createElement("div");
    titlePage.classList.add("new-game-screen");

    const playerImage = document.createElement("img");
    playerImage.src = "/images/player-icon.svg";
    playerImage.classList.add("player-icon");

    const computerImage = document.createElement("img");
    computerImage.src = "/images/robot-icon.svg";
    computerImage.classList.add("robot-icon");

    const playerDiv = document.createElement("div");
    const computerDiv = document.createElement("div");
    playerDiv.classList.add("player-div")
    computerDiv.classList.add("player-div")

    playerDiv.append(playerImage);
    computerDiv.append(computerImage);
    titlePage.append(playerDiv, computerDiv);
    document.body.prepend(titlePage);
}

createNewGameScreen();