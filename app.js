const operators = ["+", "-", "*", "/"];
const operation = document.createElement("h3");

const input = document.querySelector("#answer");
const container = document.querySelector(".container-div p");
const form = document.querySelector("form");
const scoreSelect = document.querySelector(".score");
const answerText = document.querySelector(".answer-text");

const progressBar = document.querySelector(".progress-bar");

let randomNumber;
let randomNumber2;
let randomOperatorArray;

let width = 0;

function randomOperator() {
  randomNumber = Math.floor(Math.random() * 11);
  randomNumber2 = Math.floor(Math.random() * 11);

  if (randomNumber == 0 || randomNumber == 1) {
    randomNumber = 2;
  }

  if (randomNumber2 == 0 || randomNumber2 == 1) {
    randomNumber2 = 2;
  }

  randomOperatorArray = Math.floor(Math.random() * operators.length);

  operation.innerText =
    parseInt(randomNumber) +
    " " +
    operators[randomOperatorArray] +
    " " +
    parseInt(randomNumber2);

  return randomOperatorArray;
}

let widthIncrement = 1;

function result() {
  let result = randomNumber + operators[randomOperatorArray] + randomNumber2;
  result = Math.round(eval(result) * 100) / 100;
  if (eval(result) == input.value) {
    document.body.style.background = "#2ECC71";
    answerText.innerText = "Bonne réponse !";

    randomOperator();
    
    widthIncrement *= 1.1;
    width = 0;
    score++;
  } else {
    document.body.style.background = "#E74C3C";
    answerText.innerText = "Mauvaise réponse !";
  }
  scoreSelect.innerText = `Score : ${score}`;

  return result;
}

randomOperator();

let score = 0;

let interval = setInterval(() => {
  if (width >= 100) {
    const gameover = document.createElement("h2");
    gameover.innerText = `Fin du temps ! Votre score est de ${score}, le resultat était ${eval(
      result()
    )}`;
    scoreSelect.insertAdjacentElement("beforebegin", gameover);
    input.disabled = true
    answerText.remove();

    document.body.style.background = "#E74C3C";

    clearInterval(interval);
    return;
  }
  width += widthIncrement;
  progressBar.style.width = width + "%";
}, 100);

container.insertAdjacentElement("afterend", operation);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isNaN(input.value)) {
    alert("Veuillez entrer un nombre !");
    input.value = "";
    return;
  }

  result();

  input.value = "";
});
