const Player = (mark) => {

    return {
        mark
    };
}

let playerX = Player("X");
let playerO = Player("O");

const GameFlow = (() => {
    let currentTurn = playerX;
    let turnCounter = 1;

    const idToIndex = id => {
        let index = [];
        id.split("").forEach(e => {
            index.push(+e);
        })

        
        return index;
    }

    const checkForWinner = (index, mark) => {
        let check = 0;

        //check diagonal
        if (index[0] === index[1]) {
            for (let i = 0; i < 3; i++) {
                if (Gameboard.indexesAndValues()[i][i] != mark) {
                    check ++;
                }
            }
            if (check === 0) return true;
        }
        check = 0;

        //check c col var row
        for (let i = 0; i < 3; i++) {
            if (Gameboard.indexesAndValues()[index[0]][i] != mark) {
                check ++;
            }
        }
        if (check === 0) return true;
        check = 0;

        //check c row var col
        for (let i = 0; i < 3; i++) {
            if (Gameboard.indexesAndValues()[i][index[1]] != mark) {
                check ++;
            }
        }
        if (check === 0) return true;
        check = 0;

    }

    const restartGame = () => {
        Gameboard.reset();
        DisplayActions.enableGrid();
        DisplayActions.updateGrid();
        currentTurn = playerX;
        turnCounter = 1;
    }

    const playTurn = (cell) => {

        let index = idToIndex(cell.target.id);

        if (Gameboard.isFree(index)) {
            if (currentTurn == playerX) {
                Gameboard.addMark(index, playerX.mark);
                DisplayActions.updateGrid();
                if (checkForWinner(index, currentTurn.mark)) {
                    DisplayActions.informWinner(currentTurn);
                    DisplayActions.blockGrid();
                } else {
                    currentTurn = playerO;
                    DisplayActions.informTurn(currentTurn);
                }
            } else {
                Gameboard.addMark(index, playerO.mark);
                DisplayActions.updateGrid();
                if (checkForWinner(index, currentTurn.mark)) {
                    DisplayActions.informWinner(currentTurn);
                    DisplayActions.blockGrid();
                } else {
                    currentTurn = playerX;
                    DisplayActions.informTurn(currentTurn);
                }
            }
        }
        turnCounter++;
        console.log(turnCounter);
        if (turnCounter == 10) {
            DisplayActions.informTie();
            DisplayActions.blockGrid();
        }
    }

    return {
        playTurn,
        idToIndex,
        restartGame
    }
})();


const Gameboard = (() => {
    let gameboard = [["","",""],["", "", ""],["","",""]];

    const indexesAndValues = () => gameboard;

    const addMark = (index, mark) => {
        gameboard[index[0]][index[1]] = mark;
    }

    const isFree = (index) => (gameboard[index[0]][index[1]]) ? false : true;

    const reset = () => {
        gameboard = [["","",""],["", "", ""],["","",""]];
    }

    return {
        indexesAndValues,
        isFree,
        addMark,
        reset
    };
})();

const DisplayVariables = (() => {
    let cells = document.querySelectorAll(".cell");

    let gameState = document.getElementById("game-state");

    let restartButton = document.getElementById("restart");

    restartButton.addEventListener("click", GameFlow.restartGame);

    cells.forEach(cell => {
    cell.addEventListener("click", GameFlow.playTurn);
    })

    return {
        cells,
        gameState,
        restartButton
    };
})();

const DisplayActions = (() => {
    let updateCell = (cell) => {
        let index = GameFlow.idToIndex(cell.id);
        let value = Gameboard.indexesAndValues()[index[0]][index[1]];
        cell.innerHTML = value;
    }

    let updateGrid = () => {
        DisplayVariables.cells.forEach(cell => {
            updateCell(cell);
        })
    }

    const informTurn = (player) => {
        DisplayVariables.gameState.innerHTML = `It's player ${player.mark}'s turn!`;
    }

    const blockGrid = () => {
        DisplayVariables.cells.forEach(cell => {
            cell.removeEventListener("click", GameFlow.playTurn);
        })
    }

    const enableGrid = () => {
        DisplayVariables.cells.forEach(cell => {
            cell.addEventListener("click", GameFlow.playTurn);
        })
    }

    const informWinner = (player) => {
        DisplayVariables.gameState.innerHTML = `the winner is player ${player.mark}`
    }

    const informTie = () => {
        DisplayVariables.gameState.innerHTML = "It's a tie!!";
    }

    return {
        updateGrid,
        blockGrid,
        enableGrid,
        informWinner,
        informTie,
        informTurn
    };

})();




//DONE
//variables de display 
//acciones de display 
//logica que controla quien gana 
//block grid when game is over 
//take care of player o actions
//check for ties


//TODO
//add style



