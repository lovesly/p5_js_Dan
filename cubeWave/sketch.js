let angle = 0;
let w = 24;
let ma;
let maxD;

function setup() {
    createCanvas(400, 400, WEBGL);
    ma = atan(1/sqrt(2));
    maxD = dist(0,0, 200, 200);
}

function draw() {
    background(175);
    //ortho not working, different effect with the tutorial
    //ortho(-200, 200, -200, 200, -500, 500);
    //directionalLight(100, 100, 255, 0, -1, 0);
    translate(10, -10, -350);
    rotateX(-ma);
    rotateY(QUARTER_PI);
    rectMode(CENTER);
    

    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) { 
            push(); 
            let d = dist(x,z,width/2, height/2); 
            let offset = map(d, 0, maxD, PI, -PI);
            let a = angle + offset;
            let h = floor(map(sin(a), -1, 1, 100, 300));
            //ambientMaterial(255);
            normalMaterial();
            translate(x - width/2, 0, z - height/2);
            //box without border???
            box(w, h, w);
            //rect(x - width/2 + 8, 0, w-2, h);
            pop();
        }
    }
    angle += 0.1;
}