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

var jelen_ertek = document.querySelector("#coinBet")
function plusX(x) {
    let ertek = parseInt(jelen_ertek.value) + x;
    if (x>0) {
        jelen_ertek.value =  ertek
    }else{
        jelen_ertek.value =  ertek*0
    }
}


function coinFlip(chooseSide){
    /* Buttons */
    let btnHead = document.querySelector("#betHeads")
    let btnTail = document.querySelector("#betTails")
    /* Displays */
    // let prevGameD = document.querySelector("#Coinflip-game-prev")
    let betAmountKeres = document.querySelector("#coinBet")
    let kimenet = document.querySelector("#coinKimenet")
    let balanceBe = document.querySelector("#penz");
    var balance;
    btnHead.disabled = true
    btnTail.disabled = true

    balance = parseInt(balanceBe.innerHTML)
    betAmount = parseInt(betAmountKeres.value);

    if (betAmount<=0)  {
        kimenet.style.color = "red"
        kimenet.innerHTML = "The minimum bet is 1$!"
        btnHead.disabled = false
        btnTail.disabled = false
        return;
    }
    if (!(betAmount>balance)) {
        
        balanceBe.innerHTML -=betAmount;
        balance -= betAmount;

        var flipResult = Math.round(Math.random(0,1)*100)/100;
//fej vagy iras
        if (flipResult < 0.5) flipResult = 0
        else flipResult = 1
        // console.log("rnd:"+y)
        // console.log("valasztott:"+chooseSide)
        
//elozo jatek mentes
        var prevGameResult;
        if (flipResult == 0) {
            prevGameResult = "Tails"
        }else if(flipResult == 1){
            prevGameResult = "Heads"
        }
    // console.log("Választott:    "+chooseSide)
    // console.log("Result:    "+prevGameResult)
    let empty = " ";
    kimenet.style.color = "white"
    kimenet.innerHTML = "Flipping..."
    setTimeout(function(){
            setCookie("ot",getCookie("negy"),1)
            setCookie("negy",getCookie("harom"),1)
            setCookie("harom",getCookie("ketto"),1)
            setCookie("ketto",getCookie("egy"),1)
            setCookie("egy",prevGameResult.toString(),1)

            let cookie1 = getCookie("egy")
            let cookie2 = getCookie("ketto")
            let cookie3 = getCookie("harom")
            let cookie4 = getCookie("negy")
            let cookie5 = getCookie("ot")

            let prevGames = [cookie1,cookie2,cookie3,cookie4,cookie5];
    //penzkiosztas
            if (chooseSide != flipResult) {
                balance
                kimenet.innerHTML = "You Lose!" + '<br>'
                kimenet.style.color = "red"
            } 
            else {
                balance += betAmount*2;
                kimenet.innerHTML = "You Win!" + '<br>'
                kimenet.style.color = "green"
    
            }

        //htmlbe iras
        const coinFinal = prevGames
        var elso = document.querySelector("#e")
        var masodik = document.querySelector("#k")
        var harmadik = document.querySelector("#h")
        var negyedik = document.querySelector("#n")
        var otodik = document.querySelector("#o")

        elso.innerHTML= coinFinal[0]
        masodik.innerHTML= coinFinal[1]
        harmadik.innerHTML= coinFinal[2]
        negyedik.innerHTML= coinFinal[3]
        otodik.innerHTML= coinFinal[4] 
        // kimenet.innerHTML = coinFinal[0] + '<br>'

        // console.log(prevGameResult)
        // console.log(y)
        // console.log(balance)
        // console.log(betAmount)
        balanceBe.innerHTML = balance

        btnHead.disabled = false
        btnTail.disabled = false


        var sendBet = balance
        var id = getCookie("id")
        var balResult =fetch("assets/php/d_w.php?id="+id+"&bet="+sendBet)


    },3500);

    }
    else{
        kimenet.style.color = "red"
        kimenet.innerHTML = "You don't have enough money!" ;
        btnHead.disabled = false
        btnTail.disabled = false
    }

    /* Animation */
    
    
    removeClass()
    setTimeout(function(){
        if(flipResult == 1){
            addClass("heads");
        }
        else if(flipResult == 0){
            addClass("tails");
        }
    }, 100);
    //Coin Face back to heads
    /*setTimeout(function(){
        removeClass()
    },4850)*/
    
    
}
let coinAnimation = document.querySelector('#playSide');

function removeClass(){
    coinAnimation.className -= "heads"
    coinAnimation.className -= "tails"
}
function addClass(flipResult){
    coinAnimation.className += " "+flipResult+""
}
