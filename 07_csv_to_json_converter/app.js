const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output');
const convertToCSVBtn = document.querySelector('.to-csv');
const convertToJSONBtn = document.querySelector('.to-json');
const resetBtn = document.querySelector('.reset-btn');
const BtnDiv = document.querySelector('.buttons');

let csvText;
let jsonText;

convertToCSVBtn.addEventListener('click', convertToCSV);
convertToJSONBtn.addEventListener('click', convertToJSON);
resetBtn.addEventListener('click', resetFields);

function convertToCSV(){
  if(validateJSON()){
    csvText = '';
    jsonText = inputField.value;
    jsonText = jsonText.replace(/[\r\s\n\]\[\{"]/g,'');
    jsonText = jsonText.replace(/},/g,'}')
    let objects;
    objects = jsonText.split('}');
    // console.log(jsonText);
    for(let i = 0; i < objects.length - 1; i++){
      let currObject;
      currObject = objects[i];
      objectVars = currObject.split(',');
      for(let j = 0; j < objectVars.length; j++){
        objectVars[j] = objectVars[j].split(':');
      }
      // console.log(objectVars);
      for(let j = 0; j< objectVars.length; j++){
        if(i == 0){
          csvText += `${objectVars[j][0]}`;
          if(j < objectVars.length - 1){
            csvText += ',';
          } else {
            csvText += '\n';
          }
        }
      }
      for(let j = 0; j< objectVars.length; j++){
        csvText += `${objectVars[j][1]}`;
        if(j < objectVars.length - 1){
          csvText += ',';
        } else {
          csvText += '\n';
        }  
      }
      outputField.value = csvText;
      // console.log(csvText);
    }
  } else {
    createAlert('Invalid JSON');
  }
}

function convertToJSON(){
  if(validateCSV()){
    csvText = inputField.value;
    jsonText = `[
  `;
    let rows;
    rows = csvText.split(/\r?\n|\r/);
    headings = rows[0].split(',');
    for(let i = 1; i < rows.length; i++){
      let currRow = rows[i].split(',');
      if(i < rows.length && i != 1){
        jsonText += `,
  `;
      }
      jsonText += `{
    `;
      for(let j = 0; j < currRow.length; j++){
        jsonText += `"${headings[j]}": "${currRow[j]}"`;
        if(j != currRow.length - 1){
          jsonText += `,
    `;
        } else {
          jsonText += `
  }`;
        }
      }
    }
    jsonText += `
]`;
    outputField.value = jsonText;
  } else {
    createAlert('Invalid CSV');
  }
}

function validateJSON(){
  const string = inputField.value;
  try {
    JSON.parse(string);
  } catch (err) {
    return false;
  }
  return true;
}

function validateCSV(){
  testCSV = inputField.value;
  let ok = true;
  let testRows;
  testRows = testCSV.split(/\r?\n|\r/);
  // console.log(testRows);
  testHeadings = testRows[0].split(',');
  if(testRows.length > 1){
    for(let i = 1; i < testRows.length; i++){
      let testCurrRow = testRows[i].split(',');
      for(let j = 0; j < testCurrRow.length; j++){
        if(testCurrRow[j] == ' ' || testCurrRow[j] == '\s' || testCurrRow[j] == ''){
          ok = false;
        }
      }
      if(testHeadings.length != testCurrRow.length){
        ok = false;
      }
    }
  } else {
    ok = false;
  }
  return ok;
}

function createAlert(text){
  const alert = document.createElement('h1');
  alert.classList.add('alert');
  alert.textContent = text;
  BtnDiv.appendChild(alert);
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

function resetFields(){
  inputField.value = '';
  outputField.value = '';
  createAlert('Fields have been emptied');
}