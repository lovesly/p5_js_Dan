// let x, y, r;
let r;
let pos;
let prev;
function setup() {
    createCanvas(400, 400);
    // x = 200;
    // y = 200;
    background(51);    
    pos = createVector(200, 200);
    prev = pos.copy();
}

function draw() {
    stroke(255);
    strokeWeight(2);
    point(pos.x, pos.y);
    line(pos.x, pos.y, prev.x, prev.y);
    prev = pos.copy();    
    let step = p5.Vector.random2D();
    let r = random(100);
    if (r < 2) {
        step.mult(random(20, 40));
    } else {
        step.setMag(2);
    }
    pos.add(step);
}