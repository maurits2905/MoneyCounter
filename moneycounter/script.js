let startTime;
let interval;
let perSecondRate = 0;

const salaryInput = document.getElementById("salary");
const salaryTypeSelect = document.getElementById("salaryType");
const hoursInput = document.getElementById("hoursPerMonth");
const currencySelect = document.getElementById("currency");
const counterDisplay = document.getElementById("counter");

const formCard = document.getElementById("formCard");
const counterCard = document.getElementById("counterCard");

document.getElementById("startButton").addEventListener("click", () => {
  const salary = parseFloat(salaryInput.value);
  const salaryType = salaryTypeSelect.value;
  const hoursPerMonth = parseFloat(hoursInput.value);
  const currency = currencySelect.value;

  if (isNaN(salary) || isNaN(hoursPerMonth)) {
    alert("Please enter valid numbers.");
    return;
  }

  const yearlySalary = salaryType === "monthly" ? salary * 12 : salary;
  const totalHours = hoursPerMonth * 12;
  const totalSeconds = totalHours * 3600;

  perSecondRate = yearlySalary / totalSeconds;

  formCard.classList.add("d-none");
  counterCard.classList.remove("d-none");

  startTime = Date.now();
  interval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const earned = elapsed * perSecondRate;
    counterDisplay.textContent = `${currency} ${earned.toFixed(2).replace(".", ",")}`;
  }, 100);
});

document.getElementById("resetButton").addEventListener("click", () => {
  clearInterval(interval);
  formCard.classList.remove("d-none");
  counterCard.classList.add("d-none");

  salaryInput.value = "";
  hoursInput.value = "160";
  salaryTypeSelect.value = "monthly";
  currencySelect.value = "DKK";
});