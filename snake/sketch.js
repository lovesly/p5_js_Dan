var s;
var scl = 20;
var food;


function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(24);
    pickLocation();
}

function pickLocation() {
    var cols = floor(random(width/scl));
    var rows = floor(random(height/scl));
    food = createVector(floor(random(width/scl)), floor(random(height/scl)));
    food.mult(scl);
}

function mousePressed() {
    s.total++;
}

function draw() {
    background(51);
    s.death();
    s.update();
    s.show();

    if (s.eat(food)) {
        pickLocation();
    }
    //does order matter?
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    switch(keyCode) {
        case UP_ARROW: 
            s.dir(0, -1);
            break;
        case DOWN_ARROW: 
            s.dir(0, 1);
            break;
        case LEFT_ARROW: 
            s.dir(-1, 0);
            break;
        case RIGHT_ARROW: 
            s.dir(1, 0);
            break;       
        default:
            break; 
    }
}