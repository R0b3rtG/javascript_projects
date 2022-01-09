const image = document.querySelector('.the-image');
const body = document.querySelector('body');
const root = document.querySelector(':root');
const widthIn = document.querySelector('.width-in');
const heightIn = document.querySelector('.height-in');
const urlIn = document.querySelector('.url-in');
const subDims = document.querySelector('.submit-dims');
const subUrl = document.querySelector('.submit-url');
const btnRight = document.querySelector('.arrow-right');
const btnDown = document.querySelector('.arrow-down');
const btnLeft = document.querySelector('.arrow-left');
const btnUp = document.querySelector('.arrow-up');

let y = 1;
let x = 1;

function onlyNumbers(event){
  let code = event.keycode || event.which;
  if(code > 47 && code < 58){
    return true;
  } else {
    return false;
  }
}

subDims.addEventListener('click', function(){
  image.setAttribute('src', '');
  image.setAttribute('src', `https://source.unsplash.com/random/${widthIn.value}x${heightIn.value}`);
  root.style.setProperty('--imageWidth', `${widthIn.value}px`);
  root.style.setProperty('--imageHeight', `${heightIn.value}px`);
  widthIn.value = '';
  heightIn.value = '';
  urlIn.value = '';
});

subUrl.addEventListener('click', function(){
  image.setAttribute('src', urlIn.value);
  setTimeout(function(){
    root.style.setProperty('--imageWidth', `${image.clientWidth}px`);
    root.style.setProperty('--imageHeight', `${image.clientHeight}px`);
    console.log(image.clientWidth);
    console.log(image.clientHeight); 
  }, 500);
  widthIn.value = '';
  heightIn.value = '';
  urlIn.value = '';
});

btnDown.addEventListener('click', function(){
  if(y === 1){
    y = -1;
  } else {
    y = 1;
  }
  image.style.transform = `scale(${x}, ${y})`;
});

btnUp.addEventListener('click', function(){
  if(y === 1){
    y = -1;
  } else {
    y = 1;
  }
  image.style.transform = `scale(${x}, ${y})`;
});

btnLeft.addEventListener('click', function(){
  if(x === 1){
    x = -1;
  } else {
    x = 1;
  }
  image.style.transform = `scale(${x}, ${y})`;
});

btnRight.addEventListener('click', function(){
  if(x === 1){
    x = -1;
  } else {
    x = 1;
  }
  image.style.transform = `scale(${x}, ${y})`;
});