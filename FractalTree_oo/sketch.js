var tree = [];
var angle;
var leafcolor = {r:255, g:255, b:255};
var maxSize = 1500;

function setup() {
    createCanvas(400, 400);
    slider = createSlider(0, TWO_PI, PI/4, 0.01);
    var a = createVector(width/2, height);
    var b = createVector(width/2, height - 100);
    var root = new Branch(a, b);
    tree[0] = root;
}

function draw() {
    background(51);
    
    //angle control??
    //angle = slider.value();
    angle = PI/4;
    if (tree.length > maxSize) {
        //change the color?
        leafcolor = {r:172, g:230, b:0}
    }
    for (var i = 0; i < tree.length; i++) {
        tree[i].show(leafcolor);
        //this case the length check not working
        tree[i].jitter();
    }
    
}

function mousePressed() {
    var nextGen = [];
    //edge case, if reached max size, just return;
    //todo
    if (tree.length > maxSize) return;
    //hack, might not working if two branches are not balanced
    //could check finished instead, if it's finished, don't craete child branches again
    for (var i = floor(tree.length/2); i < tree.length; i++) {
        var _left = tree[i].branch(false, angle);
        if (_left) nextGen.push(_left);
        var _right = tree[i].branch(true, angle);
        if (_right) nextGen.push(_right);
    }
    tree = [...tree, ...nextGen];
    //console.log(tree.length + '||| length: ' + tree[tree.length-1].length());
    
}



