let total = document.getElementById("total");

const calculate = document.getElementById("calculate").addEventListener("click", calcTip);

function calcTip() {
    const bill = document.getElementById("bill").value;
    const percent = document.getElementById("percent").value;
    const tip = bill * (percent / 100);
    return total.innerHTML = `$${(Number(bill) + Number(tip)).toFixed(2)}`;
}

