const wordsPath = "wwwroot/words";
const alphabetPath = "wwwroot/alphabet";
const wordList = ['Lion','Tiger','Elephant','Shark','Snake','Zebra','Horse','Spider','About','After','Again','Jump','Those','Recalls','Mitten','Three','Step','Scram','Splat','Craft','Clam','Grunt','Brass','People','Favorite','Glint','Strap','Spring','Human','Rude','Crisp','Holding','Alert','Before','School','Eggs','Litter','Tent','Possible','Grade','Character','Setting','Adjective','Tiptoe','Accept','Flowerpot','Announce','Desert','Habitat','Mention'];
const alphabetList = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const boardContainer = document.getElementById("spelling-b-board");
const bigWordButton = document.getElementById("big-word-btn");
const wordModal = new bootstrap.Modal('#word-modal', {});
const alphabetSounds = {};
const wordSounds = {};

document.addEventListener("DOMContentLoaded", runProgram);
bigWordButton.addEventListener("click", onBigWordButtonClick);

function runProgram() {
    preloadSounds();
    showWordsUI();
    hideLoading();
}

function hideLoading() {
    document.getElementById("loading").classList.add("hide");
}

function preloadSounds() {
    for (const letter of alphabetList) {
        let filepath = `${alphabetPath}/${letter}.mp3`;
        alphabetSounds[letter] = preloadSound(filepath);
    }
    for (const word of wordList) {
        let filepath = `${wordsPath}/${word}.mp3`;
        wordSounds[word] = preloadSound(filepath);
    }
}

function preloadSound(src) {
    let sound = document.createElement("audio");
    if ("src" in sound) {
        sound.autoPlay = false;
    }
    sound.src = src;
    sound.preload = "auto";
    document.body.appendChild(sound);
    return sound;
}

function showWordsUI() {
    // const MaxWordLength = wordList.map(word => word.length).reduce((prev, cur) => (cur > prev ? cur : prev ));
    for (const word of wordList) {
        let wordBtn = createWordButton(word);
        boardContainer.appendChild(wordBtn);
        addWordBtnEvent(wordBtn);
    }
}

function createWordButton(word) {
    //let img = document.createElement("img");
    const template = `
        <div class="col-12 col-md-2 mb-2">
            <div class="word-btn card text-bg-primary" data-word="${word}">
            <div class="img-mini me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                </svg>
            </div>
            <h5>${word}</h5>
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

function removeAllChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function getLetterButton(letter) {
    const template = `
        <button type="button" class="btn btn-primary m-2" data-letter="${letter}">${letter}</button>`;
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

function onBigWordButtonClick(evt) {
    wordSounds[this.dataset['word']].play();
}