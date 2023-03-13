const divUsrLetterBtns = document.getElementById('usr-letter-btns');
let wordsQueue = [];
let currentWord = "";

document.addEventListener("DOMContentLoaded", runProgram);

function runProgram() {
    preloadSounds();
    randomizeWordQueue();
    loadAlphabetbuttons();
    nextWord();
}

function loadAlphabetbuttons() {
    for (const letter of alphabetList) {
        const btn = createLetterButton(letter);
        addLetterButtonEvent(btn);
        divUsrLetterBtns.appendChild(btn);
    }
}

function createLetterButton(letter) {
    const template = `
        <button type="button" class="btn btn-primary btn-lg" data-letter="${letter}">${letter}</button>`;
    const divObj = document.createElement("div");
    divObj.innerHTML = template;
    return divObj.firstElementChild;
}

function addLetterButtonEvent(btn) {
    btn.addEventListener('click', onLetterButtonClick);
}

function onLetterButtonClick(evt) {
    alphabetSounds[this.dataset['letter'].toLowerCase()].play();
}

function randomizeWordQueue() {
    const firstWords = shuffle(wordList.slice(0,8));
    const restWords = shuffle(wordList.slice(8,50));
    wordsQueue = firstWords.concat(restWords);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function nextWord() {
    currentWord = wordsQueue.shift();
    console.log(currentWord);
}