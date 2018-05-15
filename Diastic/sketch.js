let srctxt;
let words;

function dialect(seed, words) {
    let phrase = "";
    let nextWord = 0;
    for (let i = 0; i < seed.length; i++) {
        let c = seed.charAt(i);
        for (let j = nextWord; j < words.length; j++) {
            if (words[j].charAt(i) === c) {
                phrase += (words[j] + " ");
                nextWord = j+1;
                break;
            }
        }
    }
    return phrase;
}

function preload() {
    srctxt = loadStrings('rainbow.txt');
}


function setup() {
    noCanvas();
    srctxt = join(srctxt, ' ');
    words = splitTokens(srctxt, ' ,!.?;');
    let seed = select("#seed");
    let submit = select("#submit");
    submit.mousePressed(() => {
        let phrase = dialect(seed.value(), words);
        createP(phrase);
    });
    createP(srctxt);
}
