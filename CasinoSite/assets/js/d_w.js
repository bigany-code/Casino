const switchBtn = document.getElementById("depoSW")
const switchText = document.getElementById("dws")
const dwAmount = document.getElementById("amountDW")
const dwText = document.getElementById("dwpText")
const dwBtn = document.getElementById("dwBtn")
const dwBtnText = document.getElementById("dwBtnText")
switchBtn.addEventListener("change", () => {
    if (switchBtn.checked == true) {
        switchText.innerHTML = "Withdraw"
        dwText.innerHTML = "Withdraw amount:"
        dwBtnText.innerHTML = "Withdraw"
    } else {
        switchText.innerHTML = "Deposit"
        dwText.innerHTML = "Deposit amount:"
        dwBtnText.innerHTML = "Deposit"
    }
})
