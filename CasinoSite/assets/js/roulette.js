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

var jelen_ertek = document.querySelector("#rouletteBet")
function plusX(x) {
    let ertek = parseInt(jelen_ertek.value) + x;
    if (x > 0) {
        jelen_ertek.value = ertek
    } else {
        jelen_ertek.value = ertek * 0
    }
}
//Anim
//utolso/win-lose
//utso 5
//bet amount
//bet on ?
//Roulette wheel initialization
for (i = 0; i < 3; i++) {
    $(".rlist li").clone().appendTo(".rlist");
}
let kektomb = [50, 52, 54, 56, 59, 61, 63, 65, 68, 70, 72, 74, 77, 79, 81, 83, 86, 88, 90, 92, 95, 97, 99]
let lilatomb = [51, 53, 55, 57, 60, 62, 64, 66, 69, 71, 73, 75, 78, 80, 82, 84, 87, 89, 91, 93, 96, 98, 100]
let zoldtomb = [58, 67, 76, 85, 94]

var flipResult;
function roulette(chooseSide) {
    /* Buttons */
    let btnPurple = document.querySelector("#betPurple")
    let btnBlue = document.querySelector("#betBlue")
    let btnGreen = document.querySelector("#betGreen")
    /* Displays */
    let prevGameD = document.querySelector("#Roulette-game-prev")
    let betAmountKeres = document.querySelector("#rouletteBet")
    let kimenet = document.querySelector("#rouletteKimenet")
    let balanceBe = document.querySelector("#penz");
    var balance;
    btnPurple.disabled = true
    btnBlue.disabled = true
    btnGreen.disabled = true

    balance = parseInt(balanceBe.innerHTML)
    betAmount = parseInt(betAmountKeres.value);
    if (betAmount <= 0) {
        kimenet.style.color = "red"
        kimenet.innerHTML = "The minimum bet is 1$!"
        btnPurple.disabled = false
        btnBlue.disabled = false
        btnGreen.disabled = false
        return;
    }
    /* Have at least 1$ */
    if (!(betAmount > balance)) {
        balanceBe.innerHTML -= betAmount;
        balance -= betAmount;
        var prevGameResult;
        var prevGameResultInColor = "";

        //https://stackoverflow.com/questions/73686006/jquey-too-much-recursion-maximum-call-stack-size-exceeded-for-mousemove
        //https://codepen.io/InsaneMind/pen/OWeyjg

        /* Animation and Randomizer */
        var x;
        function selfRandom(min, max) {
            return Math.round(Math.random() * (max - min + 1)) + min;
                     //.floor()
        }
                          //100
        x = selfRandom(50, 99);
        //  x = 5
        // console.log(x)
        $('.rlist li:eq(' + x + ')').css({
            // border: '2px solid #c3bad8'
        })
        var offset = selfRandom(200, 240)
        checkResultColor(x)

        $('.rroller').animate({
            right: ((x * 50) + (x * 8 - 12) - offset)
        }, 7800);

        /* Color picker */
        function checkResultColor(x) {
            if (lilatomb.includes(x)) {
                prevGameResult = "Purple"
                prevGameResultInColor = "rgb(86, 19, 148)"
                flipResult = 0

            }
            if (kektomb.includes(x)) {
                prevGameResult = "Blue"
                prevGameResultInColor = "rgb(70, 146, 233)"
                flipResult = 1
            }
            if (zoldtomb.includes(x)) {
                prevGameResult = "Green"
                prevGameResultInColor = "rgb(66, 192, 123)"
                flipResult = 2
            }
            resetSpinAnim()

        }
        // console.log(prevGameResult)
        /* Reset animation and unlock game buttons */
        function resetSpinAnim() {
            setTimeout(() => {
                $('.rroller').css({
                    right: "0"
                })

                btnPurple.disabled = false
                btnBlue.disabled = false
                btnGreen.disabled = false

            }, 12000)
        }
        /* Old randomizer */
        /* Game 
            //0 => Purple
            //1 => Blue
            //2 => Green
         flipResult = Math.random()
        if (flipResult < 0.444) flipResult = 0
          else if(flipResult < 0.888 && flipResult > 0.444) flipResult = 1
             else flipResult = 2
            /* Result 
        var prevGameResult;
        if (flipResult == 0) {
            prevGameResult = "Purple"
            prevGameResultInColor = "rgb(86, 19, 148)"
        }else if(flipResult == 1){
            prevGameResult = "Blue"
            prevGameResultInColor = "rgb(70, 146, 233)"
        }else if(flipResult == 2){
            prevGameResult = "Green"
            prevGameResultInColor = "rgb(66, 192, 123)"
        }

        /* Response while rolling */
        let empty = " ";
        kimenet.style.color = "white"
        kimenet.innerHTML = "Rolling..."

        setTimeout(function () {
            setCookie("tizenotR", getCookie("tizennegyR"), 1)
            setCookie("tizennegyR", getCookie("tizenharomR"), 1)
            setCookie("tizenharomR", getCookie("tizenkettoR"), 1)
            setCookie("tizenkettoR", getCookie("tizenegyR"), 1)
            setCookie("tizenegyR", getCookie("tizR"), 1)
            setCookie("tizR", getCookie("kilencR"), 1)
            setCookie("kilencR", getCookie("nyolcR"), 1)
            setCookie("nyolcR", getCookie("hetR"), 1)
            setCookie("hetR", getCookie("hatR"), 1)
            setCookie("hatR", getCookie("otR"), 1)
            setCookie("otR", getCookie("negyR"), 1)
            setCookie("negyR", getCookie("haromR"), 1)
            setCookie("haromR", getCookie("kettoR"), 1)
            setCookie("kettoR", getCookie("egyR"), 1)
            setCookie("egyR", prevGameResultInColor.toString(), 1)

            let cookieR1 = getCookie("egyR")
            let cookieR2 = getCookie("kettoR")
            let cookieR3 = getCookie("haromR")
            let cookieR4 = getCookie("negyR")
            let cookieR5 = getCookie("otR")
            let cookieR6 = getCookie("hatR")
            let cookieR7 = getCookie("hetR")
            let cookieR8 = getCookie("nyolcR")
            let cookieR9 = getCookie("kilencR")
            let cookieR10 = getCookie("tizR")
            let cookieR11 = getCookie("tizenegyR")
            let cookieR12 = getCookie("tizenkettoR")
            let cookieR13 = getCookie("tizenharomR")
            let cookieR14 = getCookie("tizennegyR")
            let cookieR15 = getCookie("tizenotR")

            let prevGames = [cookieR1, cookieR2, cookieR3, cookieR4, cookieR5, cookieR6, cookieR7, cookieR8, cookieR9, cookieR10, cookieR11, cookieR12, cookieR13, cookieR14, cookieR15];
            //penzkiosztas
            if (typeof prevGameResult === 'undefined') {
                balance += betAmount
                kimenet.innerHTML = "Error!!" + '<br>'
                kimenet.style.color = "yellow"
                alert("Bajvolt->" + prevGameResult + "-" + x)

            }
            else if (chooseSide != flipResult) {
                balance
                kimenet.innerHTML = "You Lose!" + '<br>'
                kimenet.style.color = "red"
            }
            else {
                if (flipResult == 1 || flipResult == 0) {
                    balance += betAmount * 2;
                    kimenet.innerHTML = "You Win!" + '<br>'
                    kimenet.style.color = "green"
                } else {
                    balance += betAmount * 10;
                    kimenet.innerHTML = "You Win!" + '<br>'
                    kimenet.style.color = "green"

                }
            }

            //htmlbe iras
            const rouletteFinal = prevGames
            var elso = document.querySelector("#Re")
            var masodik = document.querySelector("#Rk")
            var harmadik = document.querySelector("#Rh")
            var negyedik = document.querySelector("#Rn")
            var otodik = document.querySelector("#Ro")

            var hat_R = document.querySelector("#R6")
            var het_R = document.querySelector("#R7")
            var nyolc_R = document.querySelector("#R8")
            var kilenc_R = document.querySelector("#R9")
            var tiz_R = document.querySelector("#R10")
            var tizenegy_R = document.querySelector("#R11")
            var tizenketto_R = document.querySelector("#R12")
            var tizenharom_R = document.querySelector("#R13")
            var tizennegy_R = document.querySelector("#R14")
            var tizenot_R = document.querySelector("#R15")

            /*
                                    elso.innerHTML= rouletteFinal[0]
                                    masodik.innerHTML= rouletteFinal[1]
                                    harmadik.innerHTML= rouletteFinal[2]
                                    negyedik.innerHTML= rouletteFinal[3]
                                    otodik.innerHTML= rouletteFinal[4] 
            */
            elso.style.background = rouletteFinal[0]
            masodik.style.background = rouletteFinal[1]
            harmadik.style.background = rouletteFinal[2]
            negyedik.style.background = rouletteFinal[3]
            otodik.style.background = rouletteFinal[4]

            hat_R.style.background = rouletteFinal[5]
            het_R.style.background = rouletteFinal[6]
            nyolc_R.style.background = rouletteFinal[7]
            kilenc_R.style.background = rouletteFinal[8]
            tiz_R.style.background = rouletteFinal[9]
            tizenegy_R.style.background = rouletteFinal[10]
            tizenketto_R.style.background = rouletteFinal[11]
            tizenharom_R.style.background = rouletteFinal[12]
            tizennegy_R.style.background = rouletteFinal[13]
            tizenot_R.style.background = rouletteFinal[14]



            balanceBe.innerHTML = balance
            /*
                        btnPurple.disabled = false
                        btnBlue.disabled = false
                        btnGreen.disabled = false
            */
            var sendBet = balance
            var id = getCookie("id")
            var balResult = fetch("assets/php/d_w.php?id=" + id + "&bet=" + sendBet)


        }, 8300);

    }
    else {
        kimenet.style.color = "red"
        kimenet.innerHTML = "You don't have enough money!";
        btnPurple.disabled = false
        btnBlue.disabled = false
        btnGreen.disabled = false
    }




}

