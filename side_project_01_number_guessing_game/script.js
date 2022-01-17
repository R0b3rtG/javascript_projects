const attemptsTxt = document.querySelectorAll('.number-of-attempts'),
      input = document.querySelector('.game-input'),
      warning = document.querySelector('.warning-game'),
      startGameModal = document.querySelector('.start-game-modal'),
      endGameModal = document.querySelector('.end-game-modal'),
      gameContainer = document.querySelector('.game'),
      minValueInput = document.querySelector('#min'),
      maxValueInput = document.querySelector('#max'),
      warningRange = document.querySelector('.warning-range');

const startGameForm = document.querySelector('.start-game-form');
startGameForm.onsubmit = startGame;

let attempts,
    number,
    min,
    max;

function startGame(e){
  e.preventDefault();
  const regex = /^-?[0-9]+$/;
  if(minValueInput.value.match(regex) && maxValueInput.value.match(regex)){
    if(parseInt(minValueInput.value) < parseInt(maxValueInput.value)){
      min = parseInt(minValueInput.value);
      max = parseInt(maxValueInput.value);
      input.value = '';
      warning.textContent = '';
      getNewNumber(min, max, number);
      attemptsTxt.forEach(element => element.textContent = attempts);
      startGameModal.style.display = 'none';
      gameContainer.style.display = 'flex';
    } else {
      warningRange.textContent = 'Min must be lower than max';
    }
  } else {
    warningRange.textContent = 'Please enter some numbers';
  }
}

const minOnScreen = document.querySelector('.min-on-screen');
const maxOnScreen = document.querySelector('.max-on-screen');

function getNewNumber(min, max){
  number = Math.random() * (max - min) + min;
  number = parseInt(number);
  minOnScreen.textContent = min;
  maxOnScreen.textContent = max;
  attempts = 0;
}

const gameForm = document.querySelector('.game-form');
gameForm.onsubmit = checkInput;

const dice = document.querySelector('.dice');

function checkInput(e) {
  e.preventDefault();
  dice.style.display = 'block';
  setTimeout(() => {
    dice.style.display = 'none';
    if(parseInt(input.value) >= min && parseInt(input.value) <= max){
      attempts++;
      attemptsTxt.forEach(element => element.textContent = attempts);
      checkIfWon(parseInt(input.value));
    } else {
      warning.textContent = `Enter a number between ${min} and ${max}`;
    }
  }, 500);
}

function checkIfWon(input){
  if(number == input) {
    youWon();
  } else {
    if(number < input)
      warning.textContent = 'Wrong! Enter a lower number';
    if(number > input)
      warning.textContent = 'Wrong! Enter a higher number';
  }
}

function youWon(){
  endGameModal.style.display = 'flex';
  gameContainer.style.display = 'none';
}

const playAgainBtn = document.querySelector('.play-again');
playAgainBtn.onclick = playAgain;

function playAgain(){
  getNewNumber(min, max);
  endGameModal.style.display = 'none';
  gameContainer.style.display = 'flex';
  warning.textContent = '';
  input.value = '';
  attempts = 0;
  attemptsTxt.forEach(element => element.textContent = attempts);
}

const changeNumbersBtn = document.querySelector('.change-numbers');
changeNumbersBtn.onclick = changeNumbers;

function changeNumbers(){
  endGameModal.style.display = 'none';
  startGameModal.style.display = 'flex';
  warning.textContent = '';
  minValueInput.value = '';
  maxValueInput.value = '';
  attempts = 0;
  warningRange.textContent = '';
}