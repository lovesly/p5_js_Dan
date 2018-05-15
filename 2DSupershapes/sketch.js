var nVal;
var n1;
var n2;
var n3;
var m = 3;
var a = 1;
var b = 1;

function setup() {
    createCanvas(400, 400);
    sliderN = createSlider(0, 10, 1);
    sliderNVal = createSlider(0, 1, 0.1, 0.1);
    fill(255);
}

function sgn(val) {
    if (val > 0) {
        return 1;
    } else if (val < 0) {
        return -1;
    } else {
        return 0;
    }
}

function supershape(theta) {    
    var part1 = (1/a) * cos(theta * m /4);
    part1 = abs(part1);
    part1 = pow(part1, n2);
    var part2 = (1/b) * sin(theta * m /4);
    part2 = abs(part2);
    part2 = pow(part2, n3);
    var part3 = pow(part1 + part2, 1/n1);
    if (part3 === 0) return 0;
    return 1/part3;
}

function draw() {
    textSize(32);
    text('word', 20, 20);

    background(51);
    translate(width/2, height/2);
    stroke(255);
    noFill();

    var radius = 100;
    var total = 500;
    var increment = TWO_PI/total;
    m = sliderN.value();
    nVal = sliderNVal.value();
    //stupid
    n1 = nVal;
    n2 = nVal;
    n3 = nVal;

    beginShape();
    for (var angle = 0; angle < TWO_PI; angle += increment) {
        var r = supershape(angle);
        var x = radius * r * cos(angle);
        var y = radius * r * sin(angle);


        vertex(x, y);
    }
    endShape(CLOSE);
    textSize(20);
    text(m, 150, 190);
}


