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