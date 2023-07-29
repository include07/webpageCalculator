// define functions 

const add = function(a, b) {
    return a+b;
  };
  
  const subtract = function(a, b) {
      return a-b;
  };
  
  const sum = function(elements) {
      let x = elements.reduce(function(total, currentValue){
      return total + currentValue;
    },0)
    return x;
  };
  
  const multiply = function(...args) {
    let x = args.reduce(function(total, currentValue){
      return total * currentValue;
    },1)
    return x;
  };

// defining result element

let result = document.querySelector(".yes");
let firstOperator = JSON.stringify({value : '', state :'false'});
let secondOperator = JSON.stringify({value : '', state :'false'});
result.setAttribute('data-firstOperator', firstOperator);
result.setAttribute('data-secondOperator', secondOperator);
result.setAttribute('data-operation', '');
result.setAttribute('data-pointState','false');

// getters

function getFirstOperatorState(){
    let firstOperator = JSON.parse(result.getAttribute('data-firstOperator'));
    return firstOperator;
}

function getSecondOperatorState(){
    let secondOperator = JSON.parse(result.getAttribute('data-secondOperator'));
    return secondOperator;
}

function getOperationState(){
    let operation = result.getAttribute('data-operation');
    return operation;
}

// setters

function setFirstOperatorState(value, state){
    let firstOperator = JSON.stringify({value : value, state : state});
    result.setAttribute('data-firstOperator', firstOperator);
}

function setSecondOperatorState(value, state){
    let secondOperator = JSON.stringify({value : value, state : state});
    result.setAttribute('data-secondOperator', secondOperator);
}

function setOperationState(value){
    result.setAttribute('data-operation', value);
}

// defining other DOM elements

const ac = document.querySelector("#AC");
const zeroNumber = document.querySelector("#zero");
const oneNumber = document.querySelector("#one");
const twoNumber = document.querySelector("#two");
const threeNumber = document.querySelector("#three");
const fourNumber = document.querySelector("#four");
const fiveNumber = document.querySelector("#five");
const sixNumber = document.querySelector("#six");
const sevenNumber = document.querySelector("#seven");
const eightNumber = document.querySelector("#eight");
const nineNumber = document.querySelector("#nine");
const divideButton = document.querySelector("#division");
const multiplyButton = document.querySelector("#multiply");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plus");
const equalButton = document.querySelector("#equal");
const pointButton = document.querySelector("#point");

const numButtons = [];
numButtons.push(zeroNumber, oneNumber, twoNumber, threeNumber, fourNumber, fiveNumber, sixNumber, sevenNumber, eightNumber, nineNumber);

// adding event listeners to num Buttons

numButtons.forEach(function (button,index){
    button.addEventListener('click', function(){
        result.textContent = result.textContent + `${index}`;
        setFirstOperatorState(result.textContent, true);
    })
});

pointButton.addEventListener('click', function(){
    if(result.getAttribute('data-pointState') == 'false'){
        result.setAttribute('data-pointState','true');
        result.textContent = result.textContent + '.';
        setFirstOperatorState(result.textContent, true);
    }
})

// adding event listeners to operation buttons

ac.addEventListener('click', function(e){
    result.textContent = '';
    setFirstOperatorState('',false);
    setSecondOperatorState('',false);
    setOperationState('',1);
    result.setAttribute('data-pointState','false');
})

divideButton.addEventListener('click', function(e){
    setOperationState('/');
})

plusButton.addEventListener('click', function(e){
    setOperationState('+');
})

minusButton.addEventListener('click', function(e){
    setOperationState('-');
})

multiplyButton.addEventListener('click', function(e){
    setOperationState('*');
})

equalButton.addEventListener('click', function(e){
    setOperationState('=');
})

