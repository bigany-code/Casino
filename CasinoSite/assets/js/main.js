//Sutik
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
//---//
//Login gomb 
function LogINout() {
    if (getCookie("status") == "online") {
        eraseCookie("status");
        eraseCookie("id");
        eraseCookie("uname");
        setCookie("id", "999999", 1)
        location.reload();
    } else {
        window.location.href = "menu/login.html"
    }
}
//Login gomb text
function belepes() {
    let check = getCookie("id")
    let belepGomb = document.getElementById("belep")
    if (document.cookie == '') {
        setCookie("id", "999999", 1)
    }
    if (getCookie("id")==null) {
        setCookie("id", "999999", 1)
    }
    if (check == "999999" || check == "" || document.cookie == '') {
        belepGomb.innerHTML = "Sign In"
    } else belepGomb.innerHTML = "Sign Out"
    //setCookie("id","999999",1)

}
//Pénz megjelenites weboldalon
function balanceMutatMain() {
    var obj;
    var id = getCookie("id")
    const penz = document.getElementById("penz");
    fetch("assets/php/d_w.php?sendBal=" + id)
        .then((res) => res.json())
        .then((data) => (obj = data))
        .then(() => {
            penz.innerHTML = obj;
        })
}
//menu folder stuff
function LogINoutM() {
    if (getCookie("status") == "online") {
        eraseCookie("status");
        eraseCookie("id");
        eraseCookie("uname");
        setCookie("id", "999999", 1)
        location.reload();
    } else {
        window.location.href = "login.html"
    }
}

/* Balance megjelenites */
function balanceMutat() {
    var obj;
    var id = getCookie("id")
    const penz = document.getElementById("penz");
    fetch("../assets/php/d_w.php?sendBal=" + id)
        .then((res) => res.json())
        .then((data) => (obj = data))
        .then(() => {
            penz.innerHTML = obj;
        })
}






/* Profile */
function profile() {

    const neve = document.getElementById("username");
    const nameCookie = getCookie("uname")
    neve.innerHTML = nameCookie
}
//https://stackoverflow.com/questions/17970734/how-to-call-window-load-event-on-specific-page
if (window.location.href.match('profile.html') != null) {
    window.onload = profile(); belepes(); balanceMutat()
}
