// ========= General START ==============

let sessionTime = 25;
let breakTime = 5;

let current = 'session';
const isSessionOrBreakText = document.querySelector('.session-break-text');

// ============ General END ============

// ========= Play Btn START =========

const playPauseBtn = document.querySelector('.play-pause-btn');
playPauseBtn.addEventListener('click', playFunc);

function playFunc(){
  if(playPauseBtn.classList.contains('play')){
    changeBtnTo('pause');
    toggleTimerTo('play');
  } else {
    changeBtnTo('play');
    toggleTimerTo('pause');
  }
}

let sessionTimeInSec = 1500;
let breakTimeInSec = 300;
let timeInSec = 1500;

let myInterval;
function toggleTimerTo(state){
  if(state == 'play'){
    myInterval = setInterval(updateTime, 1000);
  } else if(state == 'pause'){
    clearInterval(myInterval);
  }
}

// ========= Play Btn END =========

// =========== Update Clock START ===============

function updateTime(){
  if(timeInSec == 0){
    if(current == 'session'){
      current = 'break';
      timeInSec = breakTimeInSec;
      isSessionOrBreakText.textContent = 'Break';
      updateClock(timeInSec);
    } else if(current == 'break'){
      current = 'session';
      timeInSec = sessionTimeInSec;
      isSessionOrBreakText.textContent = 'Session';
      updateClock(timeInSec);
    }
  } else {
    updateClock(timeInSec);
    timeInSec--;
  }
}

const titleClock = document.querySelector('title');

function updateClock(timeInSec){
  let minuteCount;
  let secondCount;
  // Split Time Into Seconds And Minutes
  minuteCount = parseInt(timeInSec / 60);
  secondCount = timeInSec % 60;

  // Format Time
  let formatedMinute = minuteCount > 9 ? minuteCount : `0${minuteCount}`;
  let formatedSecond = secondCount > 9 ? secondCount : `0${secondCount}`;
  updateMainClock(formatedMinute, formatedSecond);
  updateTitleClock(formatedMinute, formatedSecond);
}

// Update Clock
function updateMainClock(formatedMinute, formatedSecond){
  clockMinutes.textContent = formatedMinute;
  clockSeconds.textContent = formatedSecond;
}

// Update Title Clock
function updateTitleClock(formatedMinute, formatedSecond){
  titleClock.innerHTML = `(${formatedMinute}:${formatedSecond}) ${isSessionOrBreakText.textContent} - Pomodoro Clock`;
}

// =========== Update Clock END ===============

// =========== Change The Play Btn Functionality And Looks START ==========

const playPauseicon = document.querySelector('.play-pause-btn i');
const playPauseTxt = document.querySelector('.play-txt');

function changeBtnTo(state){
  if(state == 'play'){
    playPauseBtn.classList.remove('pause');
    playPauseBtn.classList.add('play');
    playPauseTxt.textContent = 'Play';
    playPauseicon.classList.remove('fa-pause-circle');
    playPauseicon.classList.add('fa-play-circle');
  } else if(state == 'pause'){
    playPauseBtn.classList.remove('play');
    playPauseBtn.classList.add('pause');
    playPauseTxt.textContent = 'Pause';
    playPauseicon.classList.remove('fa-play-circle');
    playPauseicon.classList.add('fa-pause-circle');
  }
}

// =========== Change The Play Btn Functionality And Looks END ==========

// ================= Set Time Arrows START ==============

const sessionUp = document.querySelector('.session-up-btn');
const sessionDown = document.querySelector('.session-down-btn');
const breakUp = document.querySelector('.break-up-btn');
const breakDown = document.querySelector('.break-down-btn');

sessionUp.addEventListener('click', sessionTimeUp);
sessionDown.addEventListener('click', sessionTimeDown);
breakUp.addEventListener('click', breakTimeUp);
breakDown.addEventListener('click', breakTimeDown);

const sessionInputValue = document.querySelector('.session-input-value');

function sessionTimeUp(){
  if(playPauseBtn.classList.contains('play')){
    let sessionValue = parseInt(sessionInputValue.textContent);
    if(sessionValue < 25){
      sessionValue++;
    }
    sessionInputValue.textContent = sessionValue;
  }
}

function sessionTimeDown(){
  if(playPauseBtn.classList.contains('play')){
    let sessionValue = parseInt(sessionInputValue.textContent);
    if(sessionValue > 1){
      sessionValue--;
    }
    sessionInputValue.textContent = sessionValue;
  }
}

const breakInputValue = document.querySelector('.break-input-value');

function breakTimeUp(){
  if(playPauseBtn.classList.contains('play')){
    let breakValue = parseInt(breakInputValue.textContent);
    if(breakValue < 5){
      breakValue++;
    }
    breakInputValue.textContent = breakValue;
  }
}

function breakTimeDown(){
  if(playPauseBtn.classList.contains('play')){
    let breakValue = parseInt(breakInputValue.textContent);
    if(breakValue > 1){
      breakValue--;
    }
    breakInputValue.textContent = breakValue;
  }
}

// ============== Set Time Arrows END =================

// ============= Set New Time Interval START ===============

const setNewTimeBtn = document.querySelector('.set-new-btn');

setNewTimeBtn.addEventListener('click', setNewTime);

const clockMinutes = document.querySelector('.clock .minutes');
const clockSeconds = document.querySelector('.clock .seconds');

function setNewTime(){
  if(playPauseBtn.classList.contains('play')){
    sessionTime = sessionInputValue.textContent;
    breakTime = breakInputValue.textContent;
    current = 'session';
    isSessionOrBreakText.textContent = 'Session';
    clockMinutes.textContent = sessionTime > 9 ? `${sessionTime}` : `0${sessionTime}`;
    clockSeconds.textContent = '00';
    sessionTimeInSec = parseInt(sessionTime) * 60;
    breakTimeInSec = parseInt(breakTime) * 60;
    timeInSec = sessionTimeInSec;
  }
}

// ============= Set New Time Interval END ===============

// Reset Btn START

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', reset);

function reset(){
  current = 'session';
  isSessionOrBreakText.textContent = 'Session';
  sessionInputValue.textContent = '25';
  breakInputValue.textContent = '5';
  titleClock.textContent = 'Pomodoro Clock';
  updateMainClock('25', '00');
  changeBtnTo('play');
  clearInterval(myInterval);
  sessionTime = 25;
  breakTime = 5;
  sessionTimeInSec = 1500;
  breakTimeInSec = 300;
  timeInSec = 1500;
}

// Reset Btn END