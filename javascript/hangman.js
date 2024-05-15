class Hangman {

  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    // ... your code goes here

    const wlength = this.words.length;
    const index = Math.floor(Math.random() * wlength);
    const randomInd =  this.words[index];
    return randomInd;

  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    
    if(keyCode >= 65 && keyCode <= 90){
      return true;
    }
    return false;
  }

  checkClickedLetters(letter) {
    // ... your code goes here
   
    if(this.letters.includes(letter)){
      return false;
    }
    return true;
  }

  addCorrectLetter(letter) {
    // ... your code goes here

    this.guessedLetters += this.secretWord[letter];
    /*if(this.checkWinner()){
      alert('You Won!');
      console.log('You Won!');
      return;
    }*/
  }

  addWrongLetter(letter) {
    // ... your code goes here
    // 
    this.errorsLeft--;
    if(!this.letters.includes(letter)){
      this.letters.push(letter);
      console.log(this.letters);
    }

  }

  checkGameOver() {
    // ... your code goes here
   
    if(this.errorsLeft === 0){
      return true;
    }
    return false;
  }

  checkWinner() {
    // ... your code goes here

    let win =  this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
    console.log(win);
    console.log(this.guessedLetters);
    return win;
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');


if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    // hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();

    // ... your code goes here
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here


  if (!hangman.checkGameOver() && !hangman.checkWinner()) {
    console.log("carry on!");
    if (hangman.checkIfLetter(event.which)) {
      console.log("letter");
      if (hangman.checkClickedLetters(event.key)) {
        if (hangman.secretWord.includes(event.key)) {

          const indx = [];

          for(let i = 0; i < hangman.secretWord.length; i++) {
            if (hangman.secretWord[i] === event.key) indx.push(i);
          }

          indx.map(index => {
            hangman.addCorrectLetter(index);
            hangmanCanvas.writeCorrectLetter(index);
          })

        } else {
          // wrong letter
          hangman.addWrongLetter(event.key);
          hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangmanCanvas.hangmanShape[10-hangman.errorsLeft])
        }

      } 
      else {
        alert('letter Repeated .Please enter new letter');
      }
    }
    else
      console.log("not a letter");
  }
  else{
    if(hangman.checkWinner())
      hangmanCanvas.winner();
    else
      hangmanCanvas.gameOver();
  }
});