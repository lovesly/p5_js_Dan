var a = 0;

function setup() {
    createCanvas(400, 400);
    slider = createSlider(0, TWO_PI, PI/4, 0.01);
}

function draw() {
    background(51);
    a = slider.value();
    var len = 100;
    stroke(255);
    translate(200, height);
    branch(100);
}

function branch(len) {
    if (len < 2) return;
    line(0, 0, 0, -len);
    translate(0, -len);
    
   
    push();
    rotate(a);
    branch(floor(len * 0.62));
    pop();
    push();
    rotate(-1.5*a);
    branch(floor(len * 0.57));
    pop();
    //branch(len * 0.67);
    rotate(-a/3);
    branch(floor(len * 0.53));
}


