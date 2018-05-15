var fireworks = [];
var gravity;


function setup() {
    createCanvas(800, 400);
    gravity = createVector(0, 0.15);
    stroke(255);
    strokeWeight(4);
    background(0);
}

function draw() {
    
    //the background is not reset to black
    colorMode(RGB);
    background(0, 25);
    
    if (random(1) < 0.15) {
        fireworks.push(new Firework());
    }

    var _firework;
    for (var i = fireworks.length - 1; i >= 0 ; i--) {
        _firework = fireworks[i];
        if (_firework.done()) {
            fireworks.splice(i, 1);
        } else {
            _firework.update();
            _firework.show();
        }  
    }
    //console.log(fireworks.length);
}


