const boardContainer = document.getElementById("spelling-b-board");
const bigWordButton = document.getElementById("big-word-btn");
const wordModal = new bootstrap.Modal('#word-modal', {});

document.addEventListener("DOMContentLoaded", runProgram);
bigWordButton.addEventListener("click", onBigWordButtonClick);

function runProgram() {
    preloadSounds();
    showWordsUI();
}

function showWordsUI() {
    for (const word of wordList) {
        let wordBtn = createWordButton(word);
        boardContainer.appendChild(wordBtn);
        addWordBtnEvent(wordBtn);
    }
}

function createWordButton(word) {
    const template = `
        <div class="col-12 col-md-2 mb-2">
            <div class="word-btn card text-bg-success font-monospace" data-word="${word}">
                <span>${word}</span>
            </div>
        </div>`;
    const divObj = document.createElement("div");
    divObj.innerHTML = template;
    return divObj.firstElementChild;
}

function addWordBtnEvent(wordBtn) {
    wordBtn.querySelector('.word-btn').addEventListener("click", onWordBtnClick);
}

function onWordBtnClick(evt) {
    configWordModal(this.dataset['word']);
}

function configWordModal(word) {
    const bigWordBtn = document.getElementById("big-word-btn");
    bigWordBtn.innerHTML = word.split('').join(' ');
    bigWordBtn.dataset["word"] = word;
    loadLettersFromWord(word);
    wordModal.show();
    wordSounds[word].play();
}

function loadLettersFromWord(word) {
    const wordLettersDiv = document.getElementById("word-letters");
    removeAllChilds(wordLettersDiv)
    for (const letter of word) {
        const btn = getLetterButton(letter);
        addLetterButtonEvent(btn);
        wordLettersDiv.appendChild(btn);
    }
}

function getLetterButton(letter) {
    const template = `
        <button type="button" class="btn btn-primary m-2 font-monospace" data-letter="${letter}">${letter}</button>`;
    const divObj = document.createElement("div");
    divObj.innerHTML = template;
    return divObj.firstElementChild;
}

function addLetterButtonEvent(btn) {
    btn.addEventListener('click', onLetterButtonClick);
}

function onLetterButtonClick(evt) {
    alphabetSounds[this.dataset['letter']].play();
}

function onBigWordButtonClick(evt) {
    wordSounds[this.dataset['word']].play();
}