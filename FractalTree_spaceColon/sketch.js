var tree;
var max_dist = 20;
var min_dist = 10;

function setup() {
    createCanvas(400, 400);
    tree = new Tree();
    frameRate(10);
}

function draw() {
    background(51);
    tree.show();
    tree.grow();
}

