var n = 0;
var c = 4;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    colorMode(HSB);
    background(0);
}

function draw() {
    var a = n * 137.3;
    var r = c * sqrt(n);
    var x = r * cos(a) + width/2;
    var y = r * sin(a) + height/2;
    fill((a)%255, 255, 255);
    ellipse(x, y, 4, 4);

    if (n < 1000) n++;
}


