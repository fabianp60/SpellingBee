const wordsPath = "wwwroot/words";
const alphabetPath = "wwwroot/alphabet";
const fxsoundsPath = "wwwroot/fxsounds";
//const wordList = ['lion','tiger','elephant','shark','snake','zebra','horse','spider','about','after','again','jump','those','recalls','mitten','three','step','scram','splat','craft','clam','grunt','brass','people','favorite','glint','strap','spring','human','rude','crisp','holding','alert','before','school','eggs','litter','tent','possible','grade','character','setting','adjective','tiptoe','accept','flowerpot','announce','desert','habitat','mention'];
const wordList = ['rainbow','garden','each','fiction','summer','region','character','window','butterfly','favorite','need','pocket','ground','sky','flower','people','location','parents','library','delete','escape','story','treasure','photos','city','agree','notebook','meeting','joke','hospital','box','adventure','game','street','place','believe','ocean','look','community','picture','shadow','village','grandma','vegetable','hut','jungle','elephant','daughter','cook','hungry','house','tiger','scared','terrible','bony','wonderful','creature','voice','chew','fierce','modesty','gourd','song','strange','details','woman','stones','smell','rice','glue','dizzy','trail','push','teeth','clever','path','deserve','request','danger','life','lentils'];
const alphabetList = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const effectsList = ['backspacetap','lose','win'];
const alphabetSounds = {};
const wordSounds = {};
const effectSounds = {};

function preloadAlphabetSounds() {
    for (const letter of alphabetList) {
        let filepath = `${alphabetPath}/${letter}.mp3`;
        alphabetSounds[letter] = preloadSound(filepath);
    }
}

function preloadWordSounds() {
    for (const word of wordList) {
        let filepath = `${wordsPath}/${word}.mp3`;
        wordSounds[word] = preloadSound(filepath);
    }
}

function preloadSoundfEffects() {
    for (const effect of effectsList) {
        let filepath = `${fxsoundsPath}/${effect}.mp3`;
        effectSounds[effect] = preloadSound(filepath);
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

function removeAllChilds(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}