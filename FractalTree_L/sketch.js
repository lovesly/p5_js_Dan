var axiom = "F";
var sentence = axiom;
var len = 100;

var rules = [];
rules[0] = {
    a: "F",
    //interesting
    b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
    len *= 0.5;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
        var cur = sentence.charAt(i);
        var flag = false;
        for (j = 0; j < rules.length; j++) {
            if (cur === rules[j].a) {
                nextSentence += rules[j].b;
                flag = true;
                break;
            }
        }
        if (!flag) {
            nextSentence += cur;
        }       
    } 
    sentence = nextSentence;
    createP(sentence);
    turtle();
}

function turtle() {
    background(51);
    translate(width/2, height);
    stroke(255, 100);
    for (var i = 0; i < sentence.length; i++) {
        var current = sentence.charAt(i);
        //same algorithm for ()[]{} problem in leetcode
        if (current === "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current === "+") {
            rotate(PI/6);
        } else if (current === "-") {
            rotate(-PI/6);
        } else if (current === "[") {
            push();
        } else if (current === "]") {
            pop();
        }
    }
}


function setup() {
    createCanvas(400, 400);
    background(51);
    createP(axiom);
    var button = createButton("generate");
    button.mousePressed(generate);
}

function draw() {
    background(51);
    turtle();
}

