function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var jelen_ertek = document.querySelector("#crashBet")
function plusX(x) {
    let ertek = parseInt(jelen_ertek.value) + x;
    if (x > 0) {
        jelen_ertek.value = ertek
    } else {
        jelen_ertek.value = ertek * 0
    }
}


let btnBet = document.querySelector("#betCrash")
let btnCash = document.querySelector("#cashOut")
let gameSzorzo = document.getElementById("szorzo");
let prevGameD = document.querySelector("#Crash-game-prev")
let betAmountKeres = document.querySelector("#crashBet")
let kimenet = document.querySelector("#crashKimenet")
let balanceBe = document.querySelector("#penz");
var balance;
let cookie1
let prevGameResult;
var rnd = 0;

function crash() {
    //prevgame update
    // prevGameResult = gameSzorzo.innerHTML
    // setCookie("Crash-prev",prevGameResult.toString(),1)
    prevGameD.innerHTML = getCookie("Crash-prev")


    btnBet.style.display = "none"
    btnCash.style.display = "inline-block"

    balance = parseInt(balanceBe.innerHTML)
    betAmount = parseInt(betAmountKeres.value);

    if (betAmount <= 0) {
        kimenet.style.color = "red"
        kimenet.innerHTML = "The minimum bet is 1$!"
        btnBet.style.display = "inline-block"
        btnCash.style.display = "none"

        return;
    }
    if (!(betAmount > balance)) {
        // console.log(!(betAmount>balance))
        balanceBe.innerHTML -= betAmount;
        balance -= betAmount;

        var i = 101;
        var rnd2 = Math.floor(Math.random() * 100, 1) * 10
        rnd = Math.floor(Math.random() * rnd2, 2) + 101;
        //   console.log(rnd)
        //   console.log("rnd2:"+rnd2)
        loopCR(i, rnd)
        balanceBe.innerHTML = balance
    }
    else {
        kimenet.style.color = "red"
        kimenet.innerHTML = "You don't have enough money!";
        btnBet.style.display = "inline-block"
        btnCash.style.display = "none"
    }
}
var loopSpeed = 100;
function loopCR(i, rnd) {
    setTimeout(function () {
        gameSzorzo.innerHTML = i / 100
        i++;
        if (i == rnd) {
            gameSzorzo.style.color = "red"
            btnBet.style.display = "inline-block"
            btnBet.disabled = false
            btnCash.style.display = "none"
            prevGameResult = gameSzorzo.innerHTML
            setTimeout(() => {
                gameSzorzo.innerHTML = 0
                gameSzorzo.style.color = "white"
            }, 5000);
            setCookie("Crash-prev", prevGameResult.toString(), 1)
            setPrevGame()
        } else {
            gameSzorzo.style.color = "white"
        }

        if (i < rnd) loopCR(i, rnd);
        switch (true) {
            case i <= 150:
                loopSpeed = 100;
                break;
            case i <= 200:
                loopSpeed = 70;
                break;
            case i <= 300:
                loopSpeed = 50;
                break;
            case i <= 500:
                loopSpeed = 30;
                break;
            case i <= 1000:
                loopSpeed = 10;
                break;
            default:
                break;
        }
        // console.log(loopSpeed)
        // setPrevGame()
        var sendBet = balance
        var id = getCookie("id")
        var balResult = fetch("assets/php/d_w.php?id=" + id + "&bet=" + sendBet)

    }, loopSpeed);
}

function out() {
    var ki = parseFloat(gameSzorzo.innerHTML)
    balance += parseInt(ki * betAmount)
    balanceBe.innerHTML = balance
    btnCash.style.display = "none"
    btnBet.style.display = "inline-block"
    btnBet.disabled = true

    var sendBet = balance
    var id = getCookie("id")
    var balResult = fetch("assets/php/d_w.php?id=" + id + "&bet=" + sendBet)
    //prevgame update
    // setCookie("Crash-prev",prevGameResult.toString(),1)
    setPrevGame()

}

//pev game update
function setPrevGame() {
    cookie1 = getCookie("Crash-prev")
    prevGameD.innerHTML = cookie1
}
setPrevGame()