const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const btn_reset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const keyBtns = document.querySelectorAll('.keyrow button');
const hearts = document.querySelectorAll('.tries img');


//Hides the start screen when 'start game' is clicked'
btn_reset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//Array of phrases for player to guess
const phrases = [
    'We are going to need a bigger boat',
    'No soup for you',
    'Milk was a bad choice',
    'Follow the yellow brick road',
    'Oh how the turn tables'
];


//When passed the phrases array, function selects a random phrase from the array, and returns the phrase split into an array of characters.
function getRandomPhraseAsArray(arr){
    const randomString = arr[Math.floor(Math.random() * arr.length)];
    const characters = randomString.split('');
    return characters;
}

//When passed an array, it appends each item to the #phrase ul as an li element. If the array item is not a space, the li element receives the class 'letter'. Else, receives the class 'space'.
function addPhraseToDisplay (arr) {
    for (i = 0; i < arr.length; i++){
        const text = arr[i];
        const ul = document.querySelector('#phrase ul');
        const li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = text;
        if (arr[i] !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
}

//Gets a random string of characters and calls the addPhraseToDisplay function.
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//A function that takes the player's guess as a parameter and shows that letter if it is in the phrase. Otherwise, returns null.
function checkLetter (playerGuess) {
    const letters = document.getElementsByClassName('letter');
    let correctLetter = null;
    for (i = 0; i < letters.length; i++) {
        if (playerGuess === letters[i].innerText.toLowerCase()) {
            letters[i].className = 'letter show';
            correctLetter = letters[i].innerText;
        }
    }
    return correctLetter;
}

//Stores the winning phrase inside an h3 element to be appended to the overlay screen upon completion of the game.
const winningPhrase = document.createElement('h3');
winningPhrase.textContent = `The phrase was "${phraseArray.join('')}."`;

//function that checks whether the player has correctly guessed the phrase or if they are out of hearts.
//If they correctly guess, then overlay is displayed with a congratulatory phrase as well as the winning phrase.
//If they run out of hearts, overlay is displayed with a non-congratulatory phrase as well as the winning phrase.
//Also calls the reset function, allowing the player to play another round when clicking 'play again'.
function checkWin () {
    let numCorrect = document.querySelectorAll('.show').length;
    let numToGuess = document.querySelectorAll('.letter').length;
    const title = document.querySelector('.title');
    const winningPhrase = document.createElement('h3');
    winningPhrase.textContent = `The phrase was "${phraseArray.join('')}."`;

    if (numCorrect === numToGuess) {
        setTimeout(function () {
            overlay.className = 'win';
            overlay.style.display = '';
            title.textContent = 'Nice Job! You are a winner!';
            btn_reset.innerText = 'Play Again';
            overlay.appendChild(winningPhrase);
            reset();
        }, 1500);
    }
    if (missed >= 5) {
        setTimeout(function (){ 
            overlay.className = 'lose';
            overlay.style.display = '';
            title.textContent = 'Game Over. Better luck next time.';
            btn_reset.innerText = 'Try again';
            overlay.appendChild(winningPhrase);
            reset();
        }, 500);
    }
}

//Listens for the player's guess as a click on the qwerty display, calls the checkLetter function, and calls the checkWin function.
for (i = 0; i < keyBtns.length; i++){
    keyBtns[i].addEventListener('click', (e) => {
        let playerGuess = e.target.innerText;
        checkLetter(playerGuess);
        e.target.className += ' chosen';
        e.target.disabled = 'true';
        let letterFound = checkLetter(playerGuess);
        if (letterFound === null){
            hearts[missed].src = 'images/lostHeart.png';
            missed++;
        }
        checkWin();
    });
}

//function that resets the game when called.
function reset () {
    btn_reset.addEventListener('click', () => {
        missed = 0;
        for (i = 0; i < keyBtns.length; i++) {
            keyBtns[i].className = '';
            keyBtns[i].disabled = false;
        }
        for (i = 0; i < hearts.length; i++){
            hearts[i].src = 'images/liveHeart.png';
        }
        overlay.removeChild(overlay.lastChild);
        winningPhrase.textContent = '';
        const ul = document.querySelector('#phrase ul');
        ul.innerHTML = '';
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
    });
}



