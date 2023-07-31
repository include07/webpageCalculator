//SUS
const sus = new Audio('sus.mp3');
// define functions 
function add(a, b) {
    return a+b;
  };
  
function substract(a, b) {
    return a-b;
};
  
function sum(elements) {
    let x = elements.reduce(function(total, currentValue){
    return total + currentValue;
},0)
return x;
};
  
function multiply(...args) {
let x = args.reduce(function(total, currentValue){
    return total * currentValue;
},1)
return x;
};

function divide(a, b){
    if(b != 0) return a/b;
    else return NaN;
}

function operations(string, a, b){
    if(string == '+'){
        return add(a,b);
    }else if(string == '/'){
        return divide(a, b);
    }else if(string == '*'){
        return multiply(a, b);
    }else if(string == '-'){
        return substract(a, b);
    }
}

// defining result element

let result = document.querySelector(".yes");
let firstOperator = JSON.stringify({value : '', state :'false'});
let secondOperator = JSON.stringify({value : '', state :'false'});
result.setAttribute('data-firstOperator', firstOperator);
result.setAttribute('data-secondOperator', secondOperator);
result.setAttribute('data-operation', '');
result.setAttribute('data-pointState','false');
result.setAttribute('data-flag','0');

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
        if(result.getAttribute('data-operation')==''){
            result.textContent = result.textContent + `${index}`;
            setFirstOperatorState(result.textContent, 'true');
        }else{
            if(getSecondOperatorState().state == 'false'){
                result.textContent = `${index}`;
                setSecondOperatorState(result.textContent, 'true');
            }else{
                result.textContent = result.textContent + `${index}`;
                setSecondOperatorState(result.textContent, 'true');
            }
        }
    })
});

pointButton.addEventListener('click', function(){
    if(result.getAttribute('data-pointState') == 'false'){
        result.setAttribute('data-pointState','true');
        result.textContent = result.textContent + '.';
        setFirstOperatorState(result.textContent, 'true');
    }
})

// adding event listeners to operation buttons

ac.addEventListener('click', function(e){
    result.textContent = '';
    setFirstOperatorState('','false');
    setSecondOperatorState('','false');
    setOperationState('','1');
    result.setAttribute('data-pointState','false');
})

divideButton.addEventListener('click', function(e){
    result.setAttribute('data-operation','/');
    setOperationState('/');
    result.setAttribute('data-flag','0')
})

plusButton.addEventListener('click', function(e){
    result.setAttribute('data-operation','+');
    setOperationState('+');
    result.setAttribute('data-flag','0')
})

minusButton.addEventListener('click', function(e){
    result.setAttribute('data-operation','-');
    setOperationState('-');
    result.setAttribute('data-flag','0')
})

multiplyButton.addEventListener('click', function(e){
    result.setAttribute('data-operation','*');
    setOperationState('*');
    result.setAttribute('data-flag','0')
})

equalButton.addEventListener('click', function(e){
    result.setAttribute('data-flag','1')
})

// defining mutation observer

let observer = new MutationObserver(function(mutationList, observer){
    if (getFirstOperatorState().state === 'true' && getOperationState() !== '' && getSecondOperatorState().state === 'true' && result.getAttribute('data-flag')=='1') {
        // Calculate result
        let resultValue = operations(getOperationState(), Number(getFirstOperatorState().value), Number(getSecondOperatorState().value));
        
        // Set result in text content of the element
        result.textContent = resultValue;

        // Update first operator to be the current result
        setFirstOperatorState(resultValue.toString(), 'true');

        // Reset the operation and second operator
        setOperationState('');
        setSecondOperatorState('', 'false');
    }
    if(result.textContent == '01000101'){
        let audio = sus
        audio.currentTime = 0; //reset the current time
        audio.play(); //play sound if key is played
    }
});

let config = {
    attributes: true,
    childList: false,
    subtree: false,
    attributeOldValue: true
};

observer.observe(result, config);

