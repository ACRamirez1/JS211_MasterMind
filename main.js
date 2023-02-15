'use strict';

const assert = require('assert');
const readline = require('readline');
const { string } = require('stylelint/lib/formatters');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {

  // your code here
  let solutionArray = solution.split('')
  let guessArray = guess.split('')
  let correctLetters = 0                        
  let correctLetterLocation = 0 // record how many correct 'leter-locations' were guessed

//compare the values at each index with a for loop
for(let i=0; i < solutionArray.length; i++){

    if(solutionArray[i] === guessArray[i]) {
      correctLetterLocation++;
      solutionArray[i] = null;
    }

    
}

//check for correct letter  in the wrong location
for(let i=0; i < solutionArray.length; i++){
  let targetIndex = solutionArray.indexOf(guessArray[i]);
  if (targetIndex > -1) {
    correctLetters++
    solutionArray[targetIndex] = null; 
  }
}
return correctLetterLocation + '-' + correctLetters;

}

const mastermind = (guess) => {

// solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
let hint = generateHint(guess)

  board.push(`${guess} - ${hint}`)
  //Spec 1 - Detect a correct solution: In mastermind(), if the guess you passed in equals the solution, return 'You guessed it!';
  if(solution === guess){
    return 'You guessed it!'
  } else if(board.length === 10) {
    return `You ran out of turns! The solution was ${solution}.`
  } else {
    return 'Guess again.'
  }


  //Define a variable called hint that collects the returned value of generateHint(guess).
  

  
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}