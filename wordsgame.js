const divUsrLetterBtns = document.getElementById('usr-letter-btns');
const divPcWord = document.getElementById('pc-word');
const divUserWord = document.getElementById('user-word');
const btnNextPcWord = document.getElementById('next-word-button');
const btnPcWordSound = document.getElementById('pc-word-sound');
const btnBackSpace = document.getElementById('backspace-btn');
const btnSendAnswer = document.getElementById('send-btn');
const labelPcWordNumber = document.getElementById('wordnumber');
const labelPcAmountOfWords = document.getElementById('amountofwords');
const inputPoints = document.getElementById('points');
let wordsQueue = [];
let currentPcWord = "";
let currentPcWordNumber = 0;
let currentUserWord = "";
let totalPoints = 0;

document.addEventListener("DOMContentLoaded", runProgram);

function runProgram() {
    preloadAlphabetSounds();
    preloadWordSounds();
    preloadSoundfEffects();
    randomizeWordQueue();
    loadAlphabetbuttons();
    addControlButtonEvents();
    nextWord();
}

function addControlButtonEvents() {
    btnNextPcWord.addEventListener("click", nextWord);
    btnPcWordSound.addEventListener("click", onBtnPcWordSound);
    btnBackSpace.addEventListener("click",  onBtnBackSpaceClick);
    btnSendAnswer.addEventListener("click", onBtnSendAnswerClick);
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
    alphabetSounds[this.dataset['letter']].play();
    showUserLetterBlock(this.dataset['letter']);
}

function onUserLetterButtonClick(evt) {
    alphabetSounds[this.dataset['letter']].play();
}

function randomizeWordQueue() {
    const firstWords = shuffle(wordList.slice(0,8));
    const restWords = shuffle(wordList.slice(8,50));
    wordsQueue = firstWords.concat(restWords);
    currentPcWordNumber = 0;
    labelPcWordNumber.innerText = currentPcWordNumber.toString();
    labelPcAmountOfWords.innerText = wordsQueue.length.toString();
    inputPoints.value = '0';
    totalPoints = 0;
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
    currentUserWord = "";
    currentPcWord = wordsQueue.shift();
    while(!currentPcWord) {
        randomizeWordQueue();
        currentPcWord = wordsQueue.shift();
    }
    currentPcWordNumber++;
    labelPcWordNumber.innerText = currentPcWordNumber.toString();
    removeAllChilds(divPcWord);
    removeAllChilds(divUserWord);
    showPcWordBlocks(currentPcWord);
    btnPcWordSound.dataset["word"] = currentPcWord;
    wordSounds[currentPcWord].play();
    btnSendAnswer.disabled = false;
    btnBackSpace.disabled = false;
    btnNextPcWord.disabled = true;
    setDisabledAlphabetKeyButtons(false);
}

function createLetterBlock(letter, clickable, type = '') {
    const template = `
        <span class="letter-btn ${clickable} ${type}" data-letter="${letter}">${letter}</span>`;
    const divObj = document.createElement("div");
    divObj.innerHTML = template;
    return divObj.firstElementChild;
}

function showPcWordBlocks(word, showletter = false, type) {
    for (const letter of word) {
        if(showletter)
            divPcWord.appendChild(createLetterBlock(letter,'', type));
        else
            divPcWord.appendChild(createLetterBlock('',''));
    }
}

function showUserLetterBlock(letter) {
    let usrLetterBlock = createLetterBlock(letter,'clickable');
    usrLetterBlock.addEventListener('click', onUserLetterButtonClick);
    divUserWord.appendChild(usrLetterBlock);
    currentUserWord += letter;
}

function onBtnPcWordSound(evt) {
    if(this.dataset['word'].length > 0)
        wordSounds[this.dataset['word']].play();
}

function onBtnBackSpaceClick(evt) {
    effectSounds['backspacetap'].play();
    if(divUserWord.lastChild) divUserWord.removeChild(divUserWord.lastChild);
    if(currentUserWord.length > 0) {
        currentUserWord = currentUserWord.substring(0,currentUserWord.length - 1);
    }
}

function onBtnSendAnswerClick(evt) {
    btnSendAnswer.disabled = true;
    btnBackSpace.disabled = true;
    let result = "win";
    if(currentPcWord == currentUserWord) {
        effectSounds['win'].play();
        totalPoints++;
        inputPoints.value = totalPoints.toString();
    } else {
        result = 'lose';
        effectSounds['lose'].play();
    }
    showPcWord(result);
    setDisabledAlphabetKeyButtons(true);
    btnNextPcWord.disabled = false;
}

function showPcWord(result) {
    removeAllChilds(divPcWord);
    showPcWordBlocks(currentPcWord, true, result);
}

function setDisabledAlphabetKeyButtons(isDisabled = false) {
    const buttons = divUsrLetterBtns.querySelectorAll('button');
    buttons.forEach(letter_button => {
        letter_button.disabled = isDisabled; 
    });
}


