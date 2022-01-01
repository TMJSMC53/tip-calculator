"use strict";
const bill = document.getElementById("bill-input");
const tipBtns = document.querySelectorAll(".tip-percent");
const peopleNum = document.getElementById("people-input");
const tipCustom = document.getElementById("custom-input");
const results = document.querySelectorAll(".value");
const errorMsg = document.querySelector(".error-msg");
const resetBtn = document.getElementById("reset-btn");

let tipAmount = 0;
let totalAmount = 0;

let billValue = 0;
let tipValue = 0.15;
let peopleValue = 1;

// Event Listeners
bill.addEventListener("input", handleBillChange);
tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleTipClick);
});
tipCustom.addEventListener("input", handleCustomTip);
peopleNum.addEventListener("input", handlePeopleChange);
resetBtn.addEventListener("click", reset);

function handleBillChange() {
  if (bill.value.includes(",")) {
    bill.value.replace(",", ".");
  }
  billValue = parseFloat(bill.value);
  calculateAmounts();
}

function handleTipClick(e) {
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");

    if (e.target.dataset.value === btn.dataset.value) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  tipCustom.value = "";
  calculateAmounts();
  console.log(tipValue);
}

function handleCustomTip() {
  tipValue = parseFloat(tipCustom.value / 100);

  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (tipValue.value !== "") {
    calculateAmounts();
  }
}

function handlePeopleChange() {
  peopleValue = parseFloat(peopleNum.value);

  if (peopleValue <= 0) {
    errorMsg.classList.add("show-error-msg");
    setTimeout(function () {
      errorMsg.classList.remove("show-error-msg");
    }, 5000);
  }
  calculateAmounts();
}

function calculateAmounts() {
  if (peopleValue >= 1) {
    tipAmount = (billValue * tipValue) / peopleValue;
    totalAmount = (billValue * (tipValue + 1)) / peopleValue;

    results[0].innerHTML = `${tipAmount.toFixed(2)}`;
    results[1].innerHTML = `${totalAmount.toFixed(2)}`;
  }
}

function reset() {
  bill.value = 0.0;
  handleBillChange();

  tipBtns[2].click();
  peopleNum.value = "1";
  handlePeopleChange();
}
