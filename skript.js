let modesMenu = document.querySelector(".start-menu")
let mainBody = document.querySelector("main")
let namesMenu = document.querySelector('.names-menu')
let nameAddBtn = document.querySelector(".add-players-btn")
let modeHeading = document.querySelectorAll('.game-mode-heading')
let _4x4board = document.querySelector(".game-board-4x4")
let _3x3board = document.querySelector(".game-board-3x3")
let matchDrawBox = document.querySelector(".match-draw-box")
let _3x3boardspots = document.querySelectorAll("._3x3spots")
let _4x4boardspots = document.querySelectorAll("._4x4spots")
let spotSound = new Audio("asserts/audios/ting.mp3")
let newGameBtns = document.querySelectorAll(".new-game-btn")
let allSpots = document.querySelectorAll(".spots")
let againGameBtns = document.querySelectorAll(".again-game-btn")
let mode;
let winnerName;
let winnerBox = document.querySelector('.winner-box')
let _3x3currentSymbol = "X";
let _4x4Wins = [
    [0, 1, 2], [1, 2, 3], [4, 5, 6], [5, 6, 7], [8, 9, 10], [9, 10, 11], [12, 13, 14], [13, 14, 15],
    [0, 4, 8], [4, 8, 12], [1, 5, 9], [5, 9, 13], [2, 6, 10], [6, 10, 14], [3, 7, 11], [7, 11, 15],
    [2, 5, 8], [3, 6, 9], [6, 9, 12], [7, 10, 13], [1, 6, 11], [0, 5, 10], [5, 10, 15], [4, 9, 14]
]
let _3x3Wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let _4x4turns = {
    "X": 8,
    "O": 8,
}
let _3x3turns = {
    "X": 4,
    "O": 4,
}

function removeTurn(symbol, num) {
    document.querySelectorAll(`.${symbol}-${num}`).forEach((e) => { e.textContent = ""; });
}
function _3x3getBackTurns(s1, s2) {
    document.querySelectorAll(`.turn-${s1}`).forEach((e) => {
        e.textContent = `${s1}`
    })
    document.querySelectorAll(`.turn-${s2}`).forEach((e) => {
        e.textContent = `${s2}`
    })
}

function showWinnerBox(winner) {
    winnerName = document.querySelector(`.player${winner}-name`).textContent
    winnerBox.querySelector(".winner-name").textContent = winnerName;
    winnerBox.classList.remove("hidden")
    mainBody.classList.add('blur')
}
function _4x4WinCheck(win_symbol) {
    let isWin;
    _4x4Wins.forEach((e) => {
        if ((document.querySelector(`._4x4spot-${e[0]}`).textContent === document.querySelector(`._4x4spot-${e[1]}`).textContent) && (document.querySelector(`._4x4spot-${e[1]}`).textContent === document.querySelector(`._4x4spot-${e[2]}`).textContent) && document.querySelector(`._4x4spot-${e[0]}`).textContent === win_symbol) {
            _3x3boardspots.forEach(e => {
                e.removeEventListener("click", _3x3FillBox)
            });
            showWinnerBox(win_symbol);
            isWin = true;
        }
    }

    )

    if (isWin) {
        return true;
    }
    else {

        return false;
    }
}

function _3x3WinCheck(win_symbol) {
    let isWin;
    _3x3Wins.forEach((e) => {
        if ((document.querySelector(`._3x3spot-${e[0]}`).textContent === document.querySelector(`._3x3spot-${e[1]}`).textContent) && (document.querySelector(`._3x3spot-${e[1]}`).textContent === document.querySelector(`._3x3spot-${e[2]}`).textContent) && document.querySelector(`._3x3spot-${e[0]}`).textContent === win_symbol) {
            _3x3boardspots.forEach(e => {
                e.removeEventListener("click", _3x3FillBox)
            });
            showWinnerBox(win_symbol);
            isWin = true;
        }
    }

    )

    if (isWin) {
        return true;
    }
    else {

        return false;
    }
}

function _3x3makeactiveplayer(currentplayer) {
    document.querySelectorAll(`.player-${currentplayer}`).forEach((e) => {
        e.classList.add("active")
    })
}
function _3x3removeActivePlayer(previosplayer) {
    document.querySelectorAll(`.player-${previosplayer}`).forEach((e) => {
        e.classList.remove("active")
    })
}
function selectMode(e) {
    if (e.target.classList.contains("mode-box")) {
        mode = e.target.textContent;
        modesMenu.classList.add("hidden")
        namesMenu.classList.remove("hidden")
        modeHeading.forEach((e) => {
            e.textContent = mode + " Game";
        })

        if (mode == "3 X 3") {
            let _4x4 = document.getElementsByClassName("_4x4")

            Array.from(_4x4).forEach((e) => {
                e.classList.add("hidden")

            })

            _4x4board.classList.add("hidden")
            _3x3board.classList.remove("hidden")
        }
        else {
            let _4x4 = document.getElementsByClassName("_4x4")

            Array.from(_4x4).forEach((e) => {
                e.classList.remove("hidden")

            })
            _4x4board.classList.remove("hidden")
            _3x3board.classList.add("hidden")
        }

    }
}
function replaceNames(p1, p2, p3) {

    document.querySelectorAll(".playerX-name").forEach((e) => { e.textContent = p1; })
    document.querySelectorAll(".playerO-name").forEach((e) => { e.textContent = p2; })
    document.querySelectorAll(".playerT-name").forEach((e) => { e.textContent = p3; })

}
function addNames() {
    const p2 = document.querySelector(".player2-input").value;
    const p1 = document.querySelector(".player1-input").value;
    if (p1 == "" || p2 == "") {

    } else {
        replaceNames(p1, p2);
        namesMenu.classList.add("hidden")
        mainBody.classList.remove("blur")
    }

}
function _3x3FillBox(e) {
    if (e.target.textContent === "") {
        e.target.textContent = _3x3currentSymbol;
        spotSound.currentTime = 0;
        spotSound.play();


        if (_3x3turns["X"] > 0 || _3x3turns["O"] > 0) {
            removeTurn(_3x3currentSymbol, _3x3turns[_3x3currentSymbol]--);
        }
        else if (_3x3turns["X"] == 0 || _3x3turns["O"] == 0) {
            _3x3turns[_3x3currentSymbol]--;
        }
        if (_3x3WinCheck(_3x3currentSymbol)) {
        }
        else if ((_3x3turns["X"] < 0 || _3x3turns["O"] < 0)) {
            matchDrawBox.classList.remove("hidden");
        }




        _3x3removeActivePlayer(_3x3currentSymbol);
        _3x3currentSymbol = _3x3currentSymbol === "X" ? "O" : "X";
        _3x3makeactiveplayer(_3x3currentSymbol)

    }

}
function _4x4FillBox(e) {
    if (e.target.textContent === "") {
        e.target.textContent = _3x3currentSymbol;

        spotSound.currentTime = 0;
        spotSound.play();

        if (_4x4turns["X"] > 0 || _4x4turns["O"] > 0) {
            removeTurn(_3x3currentSymbol, _4x4turns[_3x3currentSymbol]--);
        }
        else if (_4x4turns["X"] == 0 || _4x4turns["O"] == 0) {
            _4x4turns[_3x3currentSymbol]--;
        }
        if (_4x4WinCheck(_3x3currentSymbol)) {
        }
        else if ((_4x4turns["X"] == 0 && _4x4turns["O"] == 0)) {
            matchDrawBox.classList.remove("hidden");
        }



        _3x3removeActivePlayer(_3x3currentSymbol);
        _3x3currentSymbol = _3x3currentSymbol === "X" ? "O" : "X";
        _3x3makeactiveplayer(_3x3currentSymbol)

    }

}
function newGameStart() {

    winnerBox.classList.add("hidden");
    modesMenu.classList.remove("hidden");
    allSpots.forEach((e) => {
        e.textContent = "";
    })
    // making active to player 1
    document.querySelectorAll(".player-X").forEach((e) => { e.classList.add("active") });
    document.querySelectorAll(".player-O").forEach((e) => { e.classList.remove("active") });
    document.querySelectorAll(".player-T").forEach((e) => { e.classList.remove("active") });

    // Getting back event on game board blocks 
    _3x3boardspots.forEach(e => {
        e.addEventListener("click", _3x3FillBox)
    });
    matchDrawBox.classList.add("hidden")
    _3x3getBackTurns("X", "O")
    _3x3turns["X"] = 4;
    _3x3turns["O"] = 4;
    _4x4turns["X"] = 8;
    _4x4turns["O"] = 8;
    _3x3currentSymbol = "X";
    mainBody.classList.add("blur")

}


function againGameStart() {
    winnerBox.classList.add("hidden");
    allSpots.forEach((e) => {
        e.textContent = "";
    })
    document.querySelectorAll(".player-X").forEach((e) => { e.classList.add("active") });
    document.querySelectorAll(".player-O").forEach((e) => { e.classList.remove("active") });
    document.querySelectorAll(".player-T").forEach((e) => { e.classList.remove("active") });
    // Getting back event on game board blocks 
    _3x3boardspots.forEach(e => {
        e.addEventListener("click", _3x3FillBox)
    });
    matchDrawBox.classList.add("hidden")
    _3x3getBackTurns("X", "O")
    _3x3turns["X"] = 4;
    _3x3turns["O"] = 4;
    _4x4turns["X"] = 8;
    _4x4turns["O"] = 8;
    _3x3currentSymbol = "X";
    //remove blur 
    mainBody.classList.remove("blur")
}
// Events 
// on new gae button
newGameBtns.forEach((e) => {
    e.addEventListener("click", newGameStart);

})
// again game button event
againGameBtns.forEach((e) => {
    e.addEventListener("click", againGameStart)
})
// mode selection buttons 
modesMenu.addEventListener("click", selectMode);
// add names button to add players name on sccreen
nameAddBtn.addEventListener("click", addNames);
// every spot of _3x3board box
_3x3boardspots.forEach(e => {
    e.addEventListener("click", _3x3FillBox)
});
// every spot of _4x4board box
_4x4boardspots.forEach(e => {
    e.addEventListener("click", _4x4FillBox)
});