let txt;
let counts = {};
let keys = [];

function preload() {
    txt = loadStrings('rainbow.txt');

}

function setup() {
    noCanvas();

    let allwords = txt.join("\n");
    let tokens = allwords.split(/\W+/);

    // could use map
    for (let i = 0; i < tokens.length; i++) {
        let word = tokens[i].toLowerCase();
        // empty string? regexp
        if (/\d+/.test(word)) {
            continue;
        }
        if (counts[word] === undefined) {
            counts[word] = 1;
            keys.push(word);
            // or using Object.keys method
        } else {
            counts[word]++;
        }
    }
    console.log(counts);

    keys.sort(compare);

    function compare(a, b) {
        return counts[b] - counts[a];
    }

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        createDiv(key + " " + counts[key]);
    }
}
