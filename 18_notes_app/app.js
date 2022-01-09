class Note{
  constructor(title, content, color, id){
    this._title = title;
    this._content = content;
    this._color = color;
    this._id = id;
  }
}

let date = new Date();
console.log(date);

let notes = [];

const notesContainer = document.querySelector('.container');

function addToUI(noteToAdd){
  let newDiv = document.createElement('div');
  newDiv.classList.add('note');
  newDiv.setAttribute('id', noteToAdd._id);
  let newBorder = document.createElement('div');
  newBorder.classList.add('upper-color');
  newBorder.style.backgroundColor = noteToAdd._color;
  newDiv.appendChild(newBorder);
  let newTitle = document.createElement('h2');
  newTitle.classList.add('UI-note-title');
  newTitle.innerText = noteToAdd._title;
  newDiv.appendChild(newTitle);
  let newFlex = document.createElement('div');
  newFlex.classList.add('p-flex');
  let newContent = document.createElement('p');
  newContent.classList.add('content');
  newContent.innerText = noteToAdd._content;
  newFlex.appendChild(newContent);
  let newOptions = document.createElement('div');
  newOptions.classList.add('options');
  let newDelete = document.createElement('i');
  newDelete.classList.add('fas');
  newDelete.classList.add('fa-trash-alt');
  newOptions.appendChild(newDelete);
  let newCheck = document.createElement('i');
  newCheck.classList.add('far');
  newCheck.classList.add('fa-eye');
  newOptions.appendChild(newCheck);
  newFlex.appendChild(newOptions);
  newDiv.appendChild(newFlex);
  notesContainer.appendChild(newDiv);
}

const addBtn = document.querySelector('.fa-plus-square');
const promptDiv = document.querySelector('.input-prompt');
const backtThing = document.querySelector('.back-thing');
const body = document.querySelector('body');

let isSelected = false;
let selectedColor = '';

// Show Input Prompt
addBtn.addEventListener('click', function(){
  if(promptDiv.style.display === 'none'){
    promptDiv.style.display = 'block';
  }
  if(backtThing.style.display === 'none'){
    backtThing.style.display = 'block';
  }
});

const titleInput = document.querySelector('#note-title-q');
const textArea = document.querySelector('#note-text');
const hexInput = document.querySelector('#hex-color');

const colorsDiv = document.querySelector('.colors');
const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const choose = document.querySelector('.choose');

// Color Picker
colorsDiv.addEventListener('click', function(e){
  if(e.target.classList.contains('choose')){
    e.target.classList.add('selected');
    red.classList.remove('selected');
    blue.classList.remove('selected');
    green.classList.remove('selected');
    yellow.classList.remove('selected');
    hexInput.removeAttribute('readonly');
    hexInput.select();
    hexInput.value = '#';
    isSelected = true;
    selectedColor = 'choose';
  }
  if(e.target.classList.contains('red')){
    e.target.classList.add('selected');
    choose.classList.remove('selected');
    blue.classList.remove('selected');
    green.classList.remove('selected');
    yellow.classList.remove('selected');
    hexInput.setAttribute('readonly', 'true');
    hexInput.value = '';
    isSelected = true;
    selectedColor = '#f00';
  }
  if(e.target.classList.contains('blue')){
    e.target.classList.add('selected');
    red.classList.remove('selected');
    choose.classList.remove('selected');
    green.classList.remove('selected');
    yellow.classList.remove('selected');
    hexInput.setAttribute('readonly', 'true');
    hexInput.value = '';
    isSelected = true;
    selectedColor = '#00f';
  }
  if(e.target.classList.contains('green')){
    e.target.classList.add('selected');
    red.classList.remove('selected');
    blue.classList.remove('selected');
    choose.classList.remove('selected');
    yellow.classList.remove('selected');
    hexInput.setAttribute('readonly', 'true');
    hexInput.value = '';
    isSelected = true;
    selectedColor = '#0f0';
  }
  if(e.target.classList.contains('yellow')){
    e.target.classList.add('selected');
    red.classList.remove('selected');
    blue.classList.remove('selected');
    green.classList.remove('selected');
    choose.classList.remove('selected');
    hexInput.setAttribute('readonly', 'true');
    hexInput.value = '';
    isSelected = true;
    selectedColor = '#ff0';
  }
});

const createBtn = document.querySelector('.submit-btn');
const cancelBtn = document.querySelector('.cancel-btn');

let re1 = /^#[0-9a-fA-F]{3}/;
let re2 = /^#[0-9a-fA-F]{6}/;

// Create and Cancle Buttons
createBtn.addEventListener('click', function(e){
  let hexCode = hexInput.value;
  let noteTitle = titleInput.value;
  let noteText = textArea.value;
  hexInput.style.border = '1px solid #aaa'
  titleInput.style.border = '1px solid #aaa';
  textArea.style.border = '1px solid #aaa';

  if(noteTitle != '' && noteText != ''){
    if(isSelected == true){
      if(selectedColor == 'choose'){
        if((re1.test(hexCode) && hexCode.length === 4) || re2.test(hexCode)){
          selectedColor = hexCode;
          createNote(selectedColor, noteTitle, noteText);
        } else {
          hexInput.style.border = '2px solid #f00';
        }
      } else {
        createNote(selectedColor, noteTitle, noteText);
      }
    } else {
      flashColors();
    }
  } else {
    if(noteTitle == ''){
      titleInput.style.border = '2px solid #f00';
    }
    if(noteText == ''){
      textArea.style.border = '2px solid #f00';
    }
  }

  e.preventDefault();
});

cancelBtn.addEventListener('click', function(e){
  reset();
  promptDiv.style.display = 'none';
  backtThing.style.display = 'none';

  e.preventDefault();
});

function flashColors(){
  setTimeout(() => {
    red.classList.add('selected');
    blue.classList.add('selected');
    green.classList.add('selected');
    yellow.classList.add('selected');
    choose.classList.add('selected');
    setTimeout(() => {
      red.classList.remove('selected');
      blue.classList.remove('selected');
      green.classList.remove('selected');
      yellow.classList.remove('selected');
      choose.classList.remove('selected');
      setTimeout(() => {
        red.classList.add('selected');
        blue.classList.add('selected');
        green.classList.add('selected');
        yellow.classList.add('selected');
        choose.classList.add('selected');
        setTimeout(() => {
          red.classList.remove('selected');
          blue.classList.remove('selected');
          green.classList.remove('selected');
          yellow.classList.remove('selected');
          choose.classList.remove('selected');
        }, 200);
      }, 200);
    }, 200);
  }, 200);
}

function reset(){
  titleInput.value = '';
  hexInput.value = '';
  textArea.value = '';
  hexInput.setAttribute('readonly', 'true');
  red.classList.remove('selected');
  blue.classList.remove('selected');
  green.classList.remove('selected');
  yellow.classList.remove('selected');
  choose.classList.remove('selected');
  hexInput.style.border = '1px solid #aaa';
  titleInput.style.border = '1px solid #aaa';
  textArea.style.border = '1px solid #aaa';
  isSelected = false;
  selectedColor = '';
}

(function(){
  reset();
  getNotes();
  if(localStorage.getItem('notes') == null){
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
})();

function createNote(selectedColor, noteTitle, noteText){
  let lastIndexHere;
  lastIndexHere = notes.length === 0 ? 0 : notes[notes.length - 1]._id + 1;
  let gen = generateId(lastIndexHere);
  let newNote = new Note(noteTitle, noteText, selectedColor, gen.next().value);
  pushToLocalStorage(newNote);
  addToUI(newNote);

  reset();
  promptDiv.style.display = 'none';
  backtThing.style.display = 'none';
}

function pushToLocalStorage(newNote){
  if(localStorage.getItem('notes') == null){
    notes = [];
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

function getNotes(){
  if(localStorage.getItem('notes') != null){
    let arr = JSON.parse(localStorage.getItem('notes'));
    arr.forEach(currNote => {
      addToUI(currNote);      
    });
  }
}

function* generateId(lastIndex){
  let i = lastIndex;
  while(true){
    yield i++;
  }
}

notesContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('fa-trash-alt')){
    idValue = parseInt(e.target.parentElement.parentElement.parentElement.id);
    e.target.parentElement.parentElement.parentElement.remove();
    if(localStorage.getItem('notes') == null){
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    for(let i = 0 ; i < notes.length; i++){
      if(notes[i]._id == idValue){
        notes.splice(i, 1);
      }
    }
    localStorage.setItem('notes', JSON.stringify(notes)); 
  }
});

const viewTitle = document.querySelector('#note-title-q-view');
const viewContent = document.querySelector('#note-text-view');
const backThingView = document.querySelector('.back-thing-view');
const viewEdit = document.querySelector('.view-edit');

let titleToShow;
let contentToShow;
let colorToShow;
let idToUse;

notesContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('fa-eye')){
    redView.classList.remove('selected');
    blueView.classList.remove('selected');
    greenView.classList.remove('selected');
    yellowView.classList.remove('selected');
    chooseView.classList.remove('selected');
    hexCodeView.value = '';
    const noteToShow = e.target.parentElement.parentElement.parentElement;
    if(localStorage.getItem('notes') == null){
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    for(let i = 0; i < notes.length; i++){
      if(notes[i]._id == noteToShow.id){
        titleToShow = notes[i]._title;
        contentToShow = notes[i]._content;
        colorToShow = notes[i]._color;
        idToUse = notes[i]._id;
      }
    }
    viewTitle.value = titleToShow;
    viewContent.value = contentToShow;
    viewEdit.style.borderColor = colorToShow;
    backThingView.style.display = 'block';
    viewEdit.style.display = 'block';
  }
});

const backBtn = document.querySelector('.back-btn');
const colorsTitle = document.querySelector('.colors-label');
const colorsList = document.querySelector('.colors-view');
const hexCodeView = document.querySelector('#hex-color-view');

backBtn.addEventListener('click', function(e){
  backThingView.style.display = 'none';
  viewEdit.style.display = 'none';
  colorsTitle.style.display = 'none';
  colorsList.style.display = 'none';
  hexCodeView.style.display = 'none';

  e.preventDefault();
});

const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn');
const cancelEditBtn = document.querySelector('.cancel-edit-btn');

editBtn.addEventListener('click', function(e){
  editBtn.style.display = 'none';
  backBtn.style.display = 'none';
  saveBtn.style.display = 'block';
  cancelEditBtn.style.display = 'block';
  viewTitle.removeAttribute('readonly');
  viewContent.removeAttribute('readonly');
  colorsTitle.style.display = 'block';
  colorsList.style.display = 'flex';
  hexCodeView.style.display = 'block';
  e.preventDefault();
});

cancelEditBtn.addEventListener('click', function(e){
  viewTitle.setAttribute('readonly', 'true');
  viewContent.setAttribute('readonly', 'true');
  colorsTitle.style.display = 'none';
  colorsList.style.display = 'none';
  hexCodeView.style.display = 'none';
  editBtn.style.display = 'block';
  backBtn.style.display = 'block';
  saveBtn.style.display = 'none';
  cancelEditBtn.style.display = 'none';
  isSelected = false;
  selectedColor = '';
  viewTitle.style.border = '1px solid #aaa';
  hexCodeView.style.border = '1px solid #aaa';
  viewContent.style.border = '1px solid #aaa';
  redView.classList.remove('selected');
  blueView.classList.remove('selected');
  greenView.classList.remove('selected');
  yellowView.classList.remove('selected');
  chooseView.classList.remove('selected');
  hexCodeView.value = '';

  e.preventDefault();
});

const viewColorsDiv = document.querySelector('.colors-view');
const redView = document.querySelector('.red-view');
const blueView = document.querySelector('.blue-view');
const greenView = document.querySelector('.green-view');
const yellowView = document.querySelector('.yellow-view');
const chooseView = document.querySelector('.choose-view');

viewColorsDiv.addEventListener('click', function(e){
  if(e.target.classList.contains('choose-view')){
    e.target.classList.add('selected');
    redView.classList.remove('selected');
    blueView.classList.remove('selected');
    greenView.classList.remove('selected');
    yellowView.classList.remove('selected');
    hexCodeView.removeAttribute('readonly');
    hexCodeView.select();
    hexCodeView.value = '#';
    isSelected = true;
    selectedColor = 'choose';
  }
  if(e.target.classList.contains('red-view')){
    e.target.classList.add('selected');
    chooseView.classList.remove('selected');
    blueView.classList.remove('selected');
    greenView.classList.remove('selected');
    yellowView.classList.remove('selected');
    hexCodeView.setAttribute('readonly', 'true');
    hexCodeView.value = '';
    isSelected = true;
    selectedColor = '#f00';
  }
  if(e.target.classList.contains('blue-view')){
    e.target.classList.add('selected');
    redView.classList.remove('selected');
    chooseView.classList.remove('selected');
    greenView.classList.remove('selected');
    yellowView.classList.remove('selected');
    hexCodeView.setAttribute('readonly', 'true');
    hexCodeView.value = '';
    isSelected = true;
    selectedColor = '#00f';
  }
  if(e.target.classList.contains('green-view')){
    e.target.classList.add('selected');
    redView.classList.remove('selected');
    blueView.classList.remove('selected');
    chooseView.classList.remove('selected');
    yellowView.classList.remove('selected');
    hexCodeView.setAttribute('readonly', 'true');
    hexCodeView.value = '';
    isSelected = true;
    selectedColor = '#0f0';
  }
  if(e.target.classList.contains('yellow-view')){
    e.target.classList.add('selected');
    redView.classList.remove('selected');
    blueView.classList.remove('selected');
    greenView.classList.remove('selected');
    chooseView.classList.remove('selected');
    hexCodeView.setAttribute('readonly', 'true');
    hexCodeView.value = '';
    isSelected = true;
    selectedColor = '#ff0';
  }
});

saveBtn.addEventListener('click', function(e){
  viewTitle.style.border = '1px solid #aaa';
  hexCodeView.style.border = '1px solid #aaa';
  viewContent.style.border = '1px solid #aaa';

  let ok = true;

  if(titleToShow != viewTitle.value){
    if(viewTitle.value == ''){
      viewTitle.style.border = '2px solid #f00';
      ok = false;
    } else {
      titleToShow = viewTitle.value;
    }
  }
  if(contentToShow != viewContent.value){
    if(viewContent.value == ''){
      viewContent.style.border = '2px solid #f00';
      ok = false;
    } else {
      contentToShow = viewContent.value;
    }
  }
  if(isSelected == true){
    if(selectedColor == 'choose'){
      if((re1.test(hexCodeView.value) && hexCodeView.value.length === 4) || re2.test(hexCodeView.value)){
        selectedColor = hexCodeView.value;
      } else {
        hexCodeView.style.border = '2px solid #f00';
        ok = false;
      }
    } else {
      console.log(selectedColor);
    }
    if(colorToShow != selectedColor){
      if(selectedColor != ''){
        colorToShow = selectedColor;
      }
    }
  }
  if(localStorage.getItem('notes') == null){
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  for(let i = 0; i < notes.length; i++){
    if(idToUse == notes[i]._id){
      notes[i]._title = titleToShow;
      notes[i]._content = contentToShow;
      notes[i]._color = colorToShow;
    }
  }
  if(ok){
    localStorage.setItem('notes', JSON.stringify(notes));
    notesContainer.innerHTML = '';
    backThingView.style.display = 'none';
    hexCodeView.value = '';
    hexCodeView.setAttribute('readonly', 'true');
    hexCodeView.style.display = 'none';
    colorsList.style.display = 'none';
    colorsTitle.style.display = 'none';
    viewTitle.setAttribute('readonly', 'true');
    viewContent.setAttribute('readonly', 'true');
    editBtn.style.display = 'block';
    backBtn.style.display = 'block';
    cancelEditBtn.style.display = 'none';
    saveBtn.style.display = 'none';
    redView.classList.remove('selected');
    blueView.classList.remove('selected');
    greenView.classList.remove('selected');
    yellowView.classList.remove('selected');
    chooseView.classList.remove('selected');
    getNotes();
  }

  e.preventDefault();
});