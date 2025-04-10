let startTime;
let interval;
let perSecondRate = 0;
let totalEarned = 0;
let paused = false;
let pausedAt = 0;

const salaryInput = document.getElementById("salary");
const salaryTypeSelect = document.getElementById("salaryType");
const hoursInput = document.getElementById("hoursPerMonth");
const currencySelect = document.getElementById("currency");
const counterDisplay = document.getElementById("counter");

const formCard = document.getElementById("formCard");
const counterCard = document.getElementById("counterCard");

const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");

function startCounting() {
  startTime = Date.now();
  interval = setInterval(() => {
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const earned = totalEarned + elapsed * perSecondRate;
    counterDisplay.textContent = `${currencySelect.value} ${earned.toFixed(2).replace(".", ",")}`;
  }, 100);
}

document.getElementById("startButton").addEventListener("click", () => {
  const salary = parseFloat(salaryInput.value);
  const salaryType = salaryTypeSelect.value;
  const hoursPerMonth = parseFloat(hoursInput.value);

  if (isNaN(salary) || isNaN(hoursPerMonth)) {
    alert("Please enter valid numbers.");
    return;
  }

  const yearlySalary = salaryType === "monthly" ? salary * 12 : salary;
  const totalHours = hoursPerMonth * 12;
  const totalSeconds = totalHours * 3600;
  perSecondRate = yearlySalary / totalSeconds;

  totalEarned = 0;
  paused = false;

  formCard.classList.add("d-none");
  counterCard.classList.remove("d-none");

  startCounting();
});

pauseButton.addEventListener("click", () => {
  clearInterval(interval);
  totalEarned += (Date.now() - startTime) / 1000 * perSecondRate;
  paused = true;
  pauseButton.classList.add("d-none");
  resumeButton.classList.remove("d-none");
});

resumeButton.addEventListener("click", () => {
  paused = false;
  startCounting();
  resumeButton.classList.add("d-none");
  pauseButton.classList.remove("d-none");
});

document.getElementById("resetButton").addEventListener("click", () => {
  clearInterval(interval);
  totalEarned = 0;
  paused = false;

  formCard.classList.remove("d-none");
  counterCard.classList.add("d-none");
  pauseButton.classList.remove("d-none");
  resumeButton.classList.add("d-none");

  salaryInput.value = "";
  hoursInput.value = "160";
  salaryTypeSelect.value = "monthly";
  currencySelect.value = "DKK";
  counterDisplay.textContent = "DKK 0,00";
});