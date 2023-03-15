const divUsrLetterBtns = document.getElementById('usr-letter-btns');

document.addEventListener("DOMContentLoaded", runProgram);

function runProgram() {
    preloadAlphabetSounds();
    loadAlphabetbuttons();
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
}