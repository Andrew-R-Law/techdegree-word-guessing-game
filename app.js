const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const btn_reset = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const keyBtns = document.querySelectorAll('.keyrow button');

//Hides the start screen when 'start game' is clicked'
btn_reset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phrases = [
    'Phrase one',
    'Phrase two',
    'Phrase three',
    'Phrase four',
    'Phrase five'
];


//When passed the phrases array, function selects a random phrase from the array, and returns the phrase split into an array of characters.
function getRandomPhraseAsArray(arr){
    const randomString = arr[Math.floor(Math.random() * arr.length)];
    const characters = randomString.split('');
    return characters;
}

//When passed an array, it appends it to the #phrase ul as an li element. If the array item is not a space, the li element receives the class 'letter'.
function addPhraseToDisplay (arr) {
    for (i = 0; i < arr.length; i++){
        if (arr[i] !== ' ') {
            const text = arr[i];
            const ul = document.querySelector('#phrase ul');
            const li = document.createElement('li');
            li.textContent = text;
            li.className = 'letter';
            ul.appendChild(li);
        } else {
            const text = arr[i];
            const ul = document.querySelector('#phrase ul');
            const li = document.createElement('li');
            li.textContent = text;
            li.className = 'space';
            ul.appendChild(li);
        }
    }
}

//calls the addPhraseToDisplay function.
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

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

const winningPhrase = document.createElement('h3');
winningPhrase.textContent = `The phrase was "${phraseArray.join('')}."`;

function checkWin () {
    let numCorrect = document.querySelectorAll('.show').length;
    let numToGuess = document.querySelectorAll('.letter').length;

    if (numCorrect === numToGuess) {
        setTimeout(function () {
            const title = document.querySelector('.title');
            overlay.className = 'win';
            overlay.style.display = '';
            title.textContent = 'Nice Job! You are a winner!';
            btn_reset.innerText = 'Play Again';
            const winningPhrase = document.createElement('h3');
            winningPhrase.textContent = `The phrase was "${phraseArray.join('')}."`;
            overlay.appendChild(winningPhrase);
            reset();
        }, 1500);
    }
    if (missed >= 5) {
        setTimeout(function (){ 
            const title = document.querySelector('.title');
            overlay.className = 'lose';
            overlay.style.display = '';
            title.textContent = 'Game Over. You are a loser.';
            btn_reset.innerText = 'Try again';
            const winningPhrase = document.createElement('h3');
            winningPhrase.textContent = `The phrase was "${phraseArray.join('')}."`;
            overlay.appendChild(winningPhrase);
            reset();
        }, 500);
    }
}

function reset () {
    btn_reset.addEventListener('click', () => {
        missed = 0;
        for (i = 0; i < keyBtns.length; i++) {
            keyBtns[i].className = '';
            keyBtns[i].disabled = false;
        }
        overlay.removeChild(overlay.lastChild);
        winningPhrase.textContent = '';
        const phraseLetters = document.querySelector('#phrase ul');
        phraseLetters.innerHTML = '';
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
    });
}

for (i = 0; i < keyBtns.length; i++){
keyBtns[i].addEventListener('click', (e) => {
    let playerGuess = e.target.innerText;
    checkLetter(playerGuess);
    e.target.className += ' chosen';
    e.target.disabled = 'true';
    let letterFound = checkLetter(playerGuess);
    if (letterFound === null){
        document.querySelectorAll('.tries img')[missed].src = 'images/lostHeart.png';
        missed++;
    }
    checkWin();
});
}

