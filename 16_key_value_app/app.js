const ctrl = document.querySelector('.ctrl');
const alt = document.querySelector('.alt');
const shift = document.querySelector('.shift');
const meta = document.querySelector('.meta');
const ctrlDiv = document.querySelector('.ctrl-div');
const altDiv = document.querySelector('.alt-div');
const shiftDiv = document.querySelector('.shift-div');
const metaDiv = document.querySelector('.meta-div');
const key = document.querySelector('span');
const html = document.querySelector('html');

html.addEventListener('keydown', function(e){
  if(e.ctrlKey === true){
    ctrl.style.fontWeight = 700;
    ctrlDiv.style.backgroundColor = '#0f0';
  }
  if(e.altKey === true){
    alt.style.fontWeight = 700;
    altDiv.style.backgroundColor = '#0f0';
  }
  if(e.shiftKey === true){
    shift.style.fontWeight = 700;
    shiftDiv.style.backgroundColor = '#0f0';
  }
  if(e.metaKey === true){
    meta.style.fontWeight = 700;
    metaDiv.style.backgroundColor = '#0f0';
  }
  key.textContent = e.key;
});

html.addEventListener('keyup', function(e){
  if(e.ctrlKey === false){
    ctrl.style.fontWeight = 500;
    ctrlDiv.style.backgroundColor = 'transparent';
  }
  if(e.altKey === false){
    alt.style.fontWeight = 500;
    altDiv.style.backgroundColor = 'transparent';
  }
  if(e.shiftKey === false){
    shift.style.fontWeight = 500;
    shiftDiv.style.backgroundColor = 'transparent';
  }
  if(e.metaKey === false){
    meta.style.fontWeight = 500;
    metaDiv.style.backgroundColor = 'transparent';
  }
});