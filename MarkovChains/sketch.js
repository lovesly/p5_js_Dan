// let txt = "the theremin is theirs, ok? yes, it is. this is a theremin";
const txt = 'A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little implicit structure, allowing structure to emerge according to the needs of the users.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.s may be imposed to organize content.';
const order = 5;
const ngrams = {};
let button;

function setup() {
    noCanvas();
    
    for (let i = 0; i < txt.length-order+1; i++) {
        let gram = txt.substring(i, i+order);
        if (!ngrams[gram]) {
            ngrams[gram] = [];
        } 
        ngrams[gram].push(txt.charAt(i+order));

    }
    button = createButton("generate");
    button.mousePressed(markovIt);
    console.log(ngrams);
}

function markovIt() {
    let currentGram = txt.substring(0, order);
    let result = currentGram;
    for (let i = 0; i < 100; i++) {
        let possibilities = ngrams[currentGram];
        if (!possibilities) possibilities = ['default value'];
        let next = random(possibilities);
        result += next;
        let len = result.length;
        currentGram = result.substring(len-order, len);
    }
    createP(result);
}