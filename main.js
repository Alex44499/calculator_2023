// Variables to store user input and chosen operation
let firstInputValue = '';
let secondInputValue = '';
let chosenOperator = '';

// Variable to store user calculation result 
let result = ''

// DOM element selectors
const numberButtons = document.querySelectorAll('.number');       // Buttons for numbers
const operationButtons = document.querySelectorAll('.operation'); // Buttons for mathematical operations
const displayResult = document.querySelector('.current-value');   // Display area for showing user input and results
const equalsButton = document.querySelector('.equal');           // Button to trigger the calculation
const cleaningButton = document.querySelector('.AC');    		 // Button to clean the display
const percentButton = document.querySelector('.percent');		// Button to calculate percentage 
const decimalButton = document.querySelector('.dot');          // Button to add decimal to user input values    


function handleNumberInput() {
	numberButtons.forEach((button) => {
		button.addEventListener('click', () => {
			// If there's a result displayed and user starts a new calculation, reset the calculator
			if (result && !chosenOperator && !secondInputValue) {
				resetCalculator();
			}

			// If no operator is chosen yet and first input value has less than 9 numbers
			if (!chosenOperator && firstInputValue.length < 9) {
				firstInputValue += button.textContent;
				displayResult.textContent = firstInputValue;
			}
			// If an operator is chosen and second input value has less than 9 numbers
			else if (chosenOperator && secondInputValue.length < 9) {
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


function performCalculation(firstNumber, mathOperation, secondNumber) {
	let rawResult;
	switch (mathOperation) {
		case '+':
			rawResult = parseFloat(firstNumber) + parseFloat(secondNumber);
			break;
		case '-':
			rawResult = parseFloat(firstNumber) - parseFloat(secondNumber);
			break;
		case 'x':
			rawResult = parseFloat(firstNumber) * parseFloat(secondNumber);
			break;
		case '/':
			if (parseFloat(secondNumber) === 0) {
				return "Can't divide by zero!";  // Error message for division by zero
			}
			rawResult = parseFloat(firstNumber) / parseFloat(secondNumber);
			break;
		default:
			return "0";  // Error message for any other unexpected operation
	}

	// Check if the result is a float and round only if it is
	if (rawResult % 1 !== 0) {
		return rawResult.toFixed(3);  // Round the result to 2 decimal places if it's a float
	}
	return rawResult.toString();  // Return as a string to maintain consistency
}



// Function to handle the equal button click and display the result
function handleEqualsOperation() {
	equalsButton.addEventListener('click', () => {
		result = performCalculation(firstInputValue, chosenOperator, secondInputValue);
		displayResult.textContent = result;

		// Set the result as a first input for chain calculations
		firstInputValue = result.toString();
		secondInputValue = '';
		chosenOperator = '';

	});
}


// Function to handle AC button click and clean the display
function handleACbutton() {
	cleaningButton.addEventListener('click', () => {
		displayResult.textContent = 0
		resetCalculator()
	})

}

// Function to reset the calculator's state
function resetCalculator() {
	firstInputValue = '';
	secondInputValue = '';
	chosenOperator = '';
	result = '';
}



// Function to  handle % button and display the result 
function handlePercentButton() {
	percentButton.addEventListener('click', () => {
		if (firstInputValue) {
			result = parseFloat(firstInputValue) / 100
			displayResult.textContent = result
			firstInputValue = result.toString();
		}
	}
	)
}


// Function to add decimal to input values

function handleDecimalButton() {
	decimalButton.addEventListener('click', () => {
		if (firstInputValue && !firstInputValue.includes('.') && (!chosenOperator)) {
			firstInputValue += decimalButton.textContent
			displayResult.textContent = firstInputValue
		}

		else if (secondInputValue && !secondInputValue.includes('.')) {
			secondInputValue += decimalButton.textContent

			displayResult.textContent = firstInputValue + ' ' + chosenOperator + ' ' + secondInputValue
		}
	})

}





// Initialize event listeners

handleDecimalButton()
handlePercentButton()
resetCalculator()
handleACbutton();
handleEqualsOperation();
handleOperatorSelection();
handleNumberInput();


