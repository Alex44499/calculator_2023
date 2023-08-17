// Variables to store user input and chosen operation
let firstInputValue = '';
let secondInputValue = '';
let chosenOperator = '';

// DOM element selectors
const numberButtons = document.querySelectorAll('.number');       // Buttons for numbers
const operationButtons = document.querySelectorAll('.operation'); // Buttons for mathematical operations
const displayResult = document.querySelector('.current-value');   // Display area for showing user input and results
const equalsButton = document.querySelector('.equal');           // Button to trigger the calculation

// Function to handle user's number input
function handleNumberInput() {
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // If no operator is chosen yet, append to the first input value
            if (!chosenOperator) {
                firstInputValue += button.textContent;
                displayResult.textContent = firstInputValue;
            } 
            // If an operator is chosen, append to the second input value
            else {
                secondInputValue += button.textContent;
                displayResult.textContent = firstInputValue + ' ' + chosenOperator + ' ' + secondInputValue;
            }
        });
    });
}

// Function to handle user's choice of mathematical operation
function handleOperatorSelection() {
    operationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // If an operator hasn't been chosen and there's a first input value
            if (!chosenOperator && firstInputValue) {
                chosenOperator = button.textContent;
                displayResult.textContent = firstInputValue + ' ' + chosenOperator;
            }
        });
    });
}

// Function to perform the mathematical operation based on user's input
function performCalculation(firstNumber, mathOperation, secondNumber) {
    switch (mathOperation) {
        case '+':
            return parseFloat(firstNumber) + parseFloat(secondNumber);
        case '-':
            return parseFloat(firstNumber) - parseFloat(secondNumber);
        case 'x':
            return parseFloat(firstNumber) * parseFloat(secondNumber);
        case '/':
            return parseFloat(firstNumber) / parseFloat(secondNumber);
        default:
            return "Invalid operator";
    }
}

// Function to handle the equal button click and display the result
function handleEqualsOperation() {
    equalsButton.addEventListener('click', () => {
        let result = performCalculation(firstInputValue, chosenOperator, secondInputValue);
        displayResult.textContent = result;
		  firstInputValue = '';
		  secondInputValue = '';
        chosenOperator = '';


    });
}

// Initialize event listeners
handleEqualsOperation();
handleOperatorSelection();
handleNumberInput();
