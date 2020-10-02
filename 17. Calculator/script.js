const calculatorDisplay = document.querySelector('h1')
const inputBtn = document.querySelectorAll('button')
const clearBtn = document.getElementById('clr-btn');

// Calculate first and second num
const calculate = {
  '/':(firstNum,secondNum) => firstNum / secondNum,
  '+':(firstNum,secondNum) => firstNum + secondNum,
  '-':(firstNum,secondNum) => firstNum - secondNum,
  '*':(firstNum,secondNum) => firstNum * secondNum,
  '=':(firstNum,secondNum) => secondNum,
}

let firstNum = 0;
let operatorValue ='';
let awaitNextValue = false;

function sendNumberValue(num){
  // Replace current display if first num is entered
  if(awaitNextValue){
    calculatorDisplay.textContent = num;
    awaitNextValue = false;
  }else{
    // If curr value is 0
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? num : displayValue + num;
  }
}

function addDecimal(){
  // If operator pressed, dont add decimal
  if(awaitNextValue) return
  // if no decimal
  if(!calculatorDisplay.textContent.includes('.')){
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
  }
}



function useOperator(operator){
  const currValue = Number(calculatorDisplay.textContent);
  // Prevent Multiple Operator
  if(awaitNextValue && operatorValue){
    operatorValue= operator
    return;
  }

  // if first num is non existent
  if(!firstNum){
    firstNum = currValue;
  }else{
    const calculation = calculate[operatorValue](firstNum,currValue);
    calculatorDisplay.textContent = calculation;
    firstNum = calculation;
  }
  awaitNextValue = true;

  operatorValue = operator;
}

// Reset Display 
function resetAll(){
  calculatorDisplay.textContent = '0';
  firstNum = 0;
  operatorValue ='';
  awaitNextValue = false;
}

// Add Event Listener
clearBtn.addEventListener('click',resetAll);

// Event for button
inputBtn.forEach(btn =>{
  if(btn.classList.length === 0){
    btn.addEventListener('click',() => sendNumberValue(btn.value));
  }else if(btn.classList.contains('operator')){
    btn.addEventListener('click',() => useOperator(btn.value));
  }else if(btn.classList.contains('decimal')){
    btn.addEventListener('click',addDecimal);
  }
})