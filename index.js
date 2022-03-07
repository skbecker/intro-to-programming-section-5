const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const belowZeroMessage = document.getElementById('below-zero');
const aboveOneHundredMessage = document.getElementById('above-one-hundred');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function hideAllMessages(messageArr) {
  for (let elementIndex = 0; elementIndex < messageArr.length; elementIndex++) {
    messageArr[elementIndex].style.display = 'none';
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;
  hideAllMessages(messages);
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
if (guess > 0 && guess < 100) {
    if (guess !== targetNumber) {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
        tooHighMessage.style.display = '';
      }

      const remainingAttempts = (maxNumberOfAttempts - attempts);
      numberOfGuessesMessage.style.display = '';
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }

    if (attempts === maxNumberOfAttempts) {
      submitButton.disabled = true;
      guessInput.disabled = true;
    }

    guessInput.value = '';

    resetButton.style.display = '';
  }
  else if (guess <= 0) {
    belowZeroMessage.style.display = '';
    submitButton.disabled = true;
    guessInput.disabled = true;
    guessInput.value = '';
    resetButton.style.display = '';
  }
  else if (guess >= 100) {
    aboveOneHundredMessage.style.display = '';
    submitButton.disabled = true;
    guessInput.disabled = true;
    guessInput.value = '';
    resetButton.style.display = '';
  }
}

function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages(messages);
  resetButton.style.display = 'none';
  return targetNumber;
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);
setup();
