let number;
function getNewNumber(){
  number = parseInt(Math.random()*1000+1);
  console.log(number);
}
let attempts = 0;

getNewNumber();

function checkIfWon(input){
  if(number == input) {
    youWon();
  } else {
    if(number < input)
      text.textContent = 'Enter a lower number';
    if(number > input)
      text.textContent = 'Enter a higher number';
  }
}

const attemptsTxt = document.querySelectorAll('.number-of-attempts');
const input = document.querySelector('.input');
const form = document.querySelector('.form');
const text = document.querySelector('.text');

form.onsubmit = (e) => {
  e.preventDefault();

  if(input.value >= 1 && input.value <= 1000){
    attempts++;
    attemptsTxt.forEach(element => element.textContent = attempts);
    checkIfWon(input.value);
  } else {
    text.textContent = 'Enter a number between 1 and 1000';
  }
}

const modal = document.querySelector('.modal');
const mainContainer = document.querySelector('.container');
const playAgainBtn = document.querySelector('.play-again');

function youWon(){
  modal.style.display = 'flex';
  mainContainer.style.display = 'none';
}

function playAgain(){
  getNewNumber();
  modal.style.display = 'none';
  mainContainer.style.display = 'flex';
  text.textContent = '';
  input.value = '';
  attempts = 0;
  attemptsTxt.forEach(element => element.textContent = attempts);
}

playAgainBtn.onclick = playAgain;