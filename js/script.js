const Gameboard = (() => {
    let gameboard = ["X", "Y"];

    let indexesAndValues = () => gameboard;
    return {
        indexesAndValues
    };
})();

const DisplayVariables = (() => {
    let cells = document.querySelectorAll(".cell");
    cells.addEventListener("click", Player.play());
    return {
        cells
    };
})();

const DisplayActions = (() => {
    let updateCell = (cell) => {
        let id = +cell.id
        let value = Gameboard.indexesAndValues()[id];
        if (value) {
            cell.innerHTML = value;
        }
    }

    let updateGrid = () => {
        DisplayVariables.cells.forEach(cell => {
            updateCell(cell);
        })
    }

    return {
        updateGrid,
    };

})();

const Player = (name) => {
    this.currentTurn = "X";
    let play = (cell) => {
        console.log(cell);
    }
    return {
        play
    };
}



//variables de display
//acciones de display