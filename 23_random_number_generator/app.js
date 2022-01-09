const min = document.querySelector('#min');
const max = document.querySelector('#max');
const output = document.querySelector('#result');
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  let minNumber = parseInt(min.value);
  let maxNumber = parseInt(max.value);
  if(minNumber < maxNumber){
    let randomNumber = parseInt(Math.random() * (maxNumber - minNumber) + minNumber);
    output.value = randomNumber;
  } else {
    maxNumber = minNumber + 1;
    max.value = maxNumber;
    let randomNumber = parseInt(Math.random() * (maxNumber - minNumber) + minNumber);
    output.value = randomNumber;
  }
});