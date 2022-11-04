/*
Todo:
    2dimenzios tomb generálása setPlayArea()-ban 0-sokkal feltöltve ✓
    megadott mine alapjan a mineSetupban() random elemeket 1-esre lecserélni (mineok helye) ✓
    gameSetup() az elkészült tömb alapján elkészíti a boardot ✓
    footer es mainDiv méretezése nagy pályákhoz  ✓
    default mine amount kivonása feltöltéskor ✓
    mine gomb disabled ha lehetetlen a board feltoltes ✓
    nem engedelyezett mine gombok tiltasa tileok alapjan ✓
    bet gombra kattintva a mine tile gombok feloldása ✓
    ha tartalmaz 1est akkor reseteli a boardot es ujratolti ✓
    szorzo beallitasa mineok es tile alapjan ✓
    {
        chooseTile() func:
        tilesChosen szamlalasa kattintasokkor(penzkiosztashoz) ✓
        1est tartalmazo tile-ra kattintva vege a jateknak, ✓
        0-as novekszik a tilesChosen ✓
        {
            Animacio készítése kattintáshoz  ✓
        }
    }
    gameSetup() func-ba minden tile .hiddenSide tartalma ✓ ha 0 lenne ✓
                                                         ✗ ha 1 lenne ✓
    {
        jatek agyanak megirasa(szorzok,cashout,php)  ✓
        alap jatekszabalyok(min bet,tul nagy bet)  ✓ 
    }
    reset gomb?(jatek vegekor jatek resetelesehez) ✓
    kinezet befejezése ✓
    jatek elindul, osszes masik gomb tiltasa(palya nelegyen valtozhato, nelehessen kilepni) ✓
    crash megelozese ha tul kicsi palyan tul sok mine-t akarnank berakni ✓
    alap mineAmount valtoztatasa 6x6 és 8x8 palyakon ✓
    tile gombok tiltasa ha mar ra lett kattintva(vegtelen penz szerzes fixalasa) ✓
    ha 0-val kezdodik a betamount és nagyobb mint amennyi penzunk van:
                            akkor a bet sikeres (vegtelen penz szerzes fixalasa) ✓
                            és a mineAmount valamiért elbuggol ✓
*/


/* Raising the bet amount */
var jelen_ertek = document.querySelector("#minesBet")
function plusX(x) {
    let ertek = parseInt(jelen_ertek.value) + x;
    if (x > 0) {
        jelen_ertek.value = ertek
    } else {
        jelen_ertek.value = ertek * 0
    }
}
/* szamlalok */
let mineTileDiv
let tileAmount
let minesAmount
let szorzo
let tilesChosen = 0;
/* displays */
let playArea = document.querySelector("#Mines-game")
let betAmountKeres = document.querySelector("#minesBet")
let balanceBe = document.querySelector("#penz");
let kimenet = document.querySelector("#minesKimenet")
/* start game Buttons */
let btnBet = document.querySelector("#betMines")
let btnCash = document.querySelector("#cashOut")
let btnReset = document.querySelector("#resetBoard")
/* gameSize buttons */
let btn3x3 = document.querySelector("#x3")
let btn4x4 = document.querySelector("#x4")
let btn5x5 = document.querySelector("#x5")
let btn6x6 = document.querySelector("#x6")
let btn8x8 = document.querySelector("#x8")
/* mineAmount buttons */
let btn1db = document.querySelector("#m1db")
let btn3db = document.querySelector("#m3db")
let btn5db = document.querySelector("#m5db")
let btn10db = document.querySelector("#m10db")
let btn20db = document.querySelector("#m20db")
//Generates a clean board to the choosen size 
async function setPlayArea(meret) {
    board = Array(meret)
    tileAmount = meret
    if (board[board.length] != 0) {
        for (let i = 0; i < meret; i++) {
            board[i] = Array(meret).fill(0)
        }
    } else {
        board = []
        setPlayArea(meret)
    }
    mineSetup(0)
    gameSetup()
    await disableImpBtns()
    kimenet.innerHTML = ""
}
setPlayArea(4)
/*Adds the mines to the board*/
function mineSetup(mineAmount) {
    let found = 0;
    if (mineAmount == 0) {
        mineAmount = 3
    }
    for (let i = 0; i < board.length; i++) {
        if (board[i].includes(1)) {
            setPlayArea(tileAmount)
        }
    }
    removeAccesMines()
    //crash prevention
    if (mineAmount > (tileAmount * tileAmount)) {
        return
    }
    //wrong amount on areas prevention
    if ((tileAmount == 6 || tileAmount == 8) && mineAmount == 3) {
        mineAmount = 5
    }
    while (found != mineAmount) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * tileAmount);
        let c = Math.floor(Math.random() * tileAmount);
        if (board[r][c] == 0) {
            board[r][c] = 1;
            found++;
        }
    }
    document.querySelector("#mas").innerHTML = mineAmount
    gameSetup()
    minesAmount = mineAmount
    kimenet.innerHTML = ""
}
/*removes the 3 default mines added at start*/
function removeAccesMines() {
    for (let i = 0; i < tileAmount; i++) {
        for (let j = 0; j < tileAmount; j++) {
            if (board[i][j] == 1) {
                board[i][j] = 0
            }
        }
    }
}
/* Creates the game board based on the choosen amount of tiles */
function gameSetup() {
    sorSzam = tileAmount
    oszlopSzam = tileAmount
    mineChar = ''
    if (playArea.innerHTML == "") {
        for (let s = 0; s < sorSzam; s++) {
            for (let o = 0; o < oszlopSzam; o++) {
                switch (board[s][o]) {
                    case 0:
                        mineChar = '✓'
                        break;
                    case 1:
                        mineChar = '✗'
                        break;

                    default:
                        break;
                }
                playArea.innerHTML += '<button onclick="chooseTile(' + s + "," + o + ');" class="invisBtn" id="invis-' + s + "-" + o + '">'
                    + '<div class="minegrid" id="mine-' + s + "-" + o + '">'
                    + '<div class="playSide"></div>'
                    + '<div class="hiddenSide">' + mineChar + '</div>'
                    + '</div>'
                '</button>'
            }
            playArea.innerHTML += '<br>'
        }

    } else {
        playArea.innerHTML = ""
        gameSetup()
        startGame(false)
    }
    // kimenet.innerHTML = ""
    // kimenet.style.color = "white"
    btnBet.disabled = false
    btnBet.style.display = "inline-block"
    btnReset.style.display = "none"
}
/* Display currently active mines set */
document.addEventListener("change", () => {
    document.querySelector("#mas").innerHTML = minesAmount
})
/* Sets the multiplier based on tiles and mines */
function setMulti() {
    let getTileJson = ""
    let getMinesJson = ""
    switch (tileAmount) {
        case 3:
            getTileJson = "x3"
            break;
        case 4:
            getTileJson = "x4"
            break;
        case 5:
            getTileJson = "x5"
            break;
        case 6:
            getTileJson = "x6"
            break;
        case 8:
            getTileJson = "x8"
            break;

        default:
            break;
    }
    switch (minesAmount) {
        case 1:
            getMinesJson = "mine-1"
            break;
        case 3:
            getMinesJson = "mine-3"
            break;
        case 5:
            getMinesJson = "mine-5"
            break;
        case 10:
            getMinesJson = "mine-10"
            break;
        case 20:
            getMinesJson = "mine-20"
            break;

        default:
            break;
    }
    //Fetch multi
    fetch("assets/multi.json")
        .then((res) => res.json())
        .then((data) => (obj = data))
        .then(() => {
            szorzo = obj[getTileJson][getMinesJson]
        })
}
/* bet variables */
let betAmount;
var balance;
/* Starts the bet initializes necessary functions */
async function betOnMines() {
    balance = parseInt(balanceBe.innerHTML)
    betAmount = parseInt(betAmountKeres.value);
    //jatek nem engedelyezese
    if (betAmount <= 0) {
        kimenet.innerHTML = "The minimum bet is 1$!"
        kimenet.style.color = "red"
        btnCash.style.display = "none"
        btnBet.style.display = "inline-block"
        document.querySelector("#mas").innerHTML = minesAmount
        return;
    }
    if (!(betAmount > balance)) {
        balanceBe.innerHTML -= betAmount;
        balance -= betAmount;

        /* Jatek indito gomb */
        btnBet.style.display = "none"
        btnCash.style.display = "inline-block"

        kimenet.style.color = "white"
        kimenet.innerHTML = "";

        document.querySelector("#mas").innerHTML = minesAmount
        //unlock tiles
        startGame(true)
        //setmulti
        await setMulti()
        switchMineBtns(true)
    } else {
        kimenet.style.color = "red"
        kimenet.innerHTML = "You don't have enough money!";
    }
}
/* Disable impossible buttons (too low/high amounts of mines on x sized area)*/
function disableImpBtns() {
    switch (tileAmount) {
        case 3:
            /* 10x és 20x mine nem hasznalhato */
            btn1db.disabled = false
            btn3db.disabled = false
            btn5db.disabled = false
            btn10db.disabled = true
            btn20db.disabled = true
            break;
        case 4:
            /* 20x mine nem hasznalhato */
            btn1db.disabled = false
            btn3db.disabled = false
            btn5db.disabled = false
            btn10db.disabled = false
            btn20db.disabled = true
            break;
        case 6:
            /* 1 mine nem hasznalhato */
            btn1db.disabled = true
            btn3db.disabled = true
            btn5db.disabled = false
            btn10db.disabled = false
            btn20db.disabled = false
            break;
        case 8:
            /* 1x,3x,5x mine nem hasznalhato */
            btn1db.disabled = true
            btn3db.disabled = true
            btn5db.disabled = false
            btn10db.disabled = false
            btn20db.disabled = false
            break;
        default:
            btn1db.disabled = false
            btn3db.disabled = false
            btn5db.disabled = false
            btn10db.disabled = false
            btn20db.disabled = false
            break;
    }
}
/* Disable/enable all minearea/playarea changer buttons */
function switchMineBtns(onOff) {
    btn3x3.disabled = onOff
    btn4x4.disabled = onOff
    btn5x5.disabled = onOff
    btn6x6.disabled = onOff
    btn8x8.disabled = onOff

    btn1db.disabled = onOff
    btn3db.disabled = onOff
    btn5db.disabled = onOff
    btn10db.disabled = onOff
    btn20db.disabled = onOff
}
//https://www.fwait.com/how-to-add-and-remove-class-in-javascript/
/* 100ms min varakozás kell mig a js legenerálja a html elemeket (75ms min)*/
/* Disables all mine(tile) buttons */
function startGame(started) {
    setTimeout(() => {
        document.querySelectorAll(".invisBtn").forEach(e => e.disabled = !started)
    }, 100);
}
startGame(false)
/* Animation */
/* Removes the animation class */
function removeClass() {
    mineTileDiv.classList.remove("revealer")
}
/* Adds the animation class */
function addClass(classNeve) {
    mineTileDiv.classList.add(classNeve)
}
/* Flips the tiles and determines when to add money/when you lose  */
function chooseTile(e, k) {
    mineTileDiv = document.querySelector("#mine-" + e + "-" + k)
    let invisBtn = document.querySelector("#invis-" + e + "-" + k)
    addClass("revealer")
    if (board[e][k] == 0) {
        tilesChosen++
        mineTileDiv.style.color = "rgb(127, 66, 240)"
        invisBtn.disabled = true
    }
    /* Game lost */
    if (board[e][k] == 1) {
        mineTileDiv.style.color = "red"
        var sendBet = balance
        var id = getCookie("id")
        fetch("assets/php/d_w.php?id=" + id + "&bet=" + sendBet)
        startGame(false)
        setTimeout(() => {
            disAmountBtn(true)
            btnBet.style.display = "inline-block"
            btnCash.style.display = "none"
            kimenet.innerHTML = "You Lost!"
            kimenet.style.color = "red"
            btnReset.style.display = "inline-block"
            btnBet.style.display = "none"
            tilesChosen = 0
            switchMineBtns(false)
        }, 110);

    }
}
/* Ends the game and adds the money won */
function out() {
    /* Take earning */
    var ki = betAmount * Math.pow(szorzo, tilesChosen)
    balance += parseInt(ki)
    balanceBe.innerHTML = balance
    btnCash.style.display = "none"
    // btnBet.style.display = "inline-block"
    btnReset.style.display = "inline-block"
    var sendBet = balance
    var id = getCookie("id")
    var balResult = fetch("assets/php/d_w.php?id=" + id + "&bet=" + sendBet)
    kimenet.innerHTML = "You Won: $" + parseInt(ki)
    kimenet.style.color = "green"
    tilesChosen = 0
    //disable button to prevent crash
    disAmountBtn(true)
    startGame(false)
    switchMineBtns(false)
}
/* Resets the game for re-bet/replay */
function resetBoard() {
    btnBet.style.display = "inline-block"
    btnReset.style.display = "none"
    setPlayArea(4)
    kimenet.innerHTML = ""
}
//disable button to prevent crash/wrong values
function disAmountBtn(state) {
    setTimeout(() => {
        btn1db.disabled = state
        btn3db.disabled = state
        btn5db.disabled = state
        btn10db.disabled = state
        btn20db.disabled = state
    }, 10);
}