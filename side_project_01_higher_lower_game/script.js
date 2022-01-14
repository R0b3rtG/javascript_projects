let number;
function getNumber(){
  number = parseInt(Math.random()*1000+1);
  console.log(number);
}

getNumber();

function checkNumber(input){
  if(number == input) {
    text.textContent = 'Congrats!! It\'s right';
  } else {
    if(number < input)
      text.textContent = 'Enter a lower number';
    if(number > input)
      text.textContent = 'Enter a higher number';
  }
}

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const text = document.querySelector('.text');

btn.onclick = () => {
  if(input.value < 1000 && input.value > 1){
    checkNumber(input.value);
  } else {
    text.textContent = 'Enter a number between 1 and 1000';
  }
}