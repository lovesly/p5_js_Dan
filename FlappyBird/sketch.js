let bird;
let pipes = [];
let mic;
let sliderTop;
let sliderBot;
let clapping = false;

function setup() {
    createCanvas(800, 400);
    mic = new p5.AudioIn();
    mic.start();
    bird = new Bird();
    pipes.push(new Pipe());
    sliderTop = createSlider(0, 1, 0.2, 0.01);
    sliderBot = createSlider(0, 1, 0.2, 0.01);
}

function draw() {
    background(0);

    let vol = mic.getLevel();


    bird.update();
    bird.show();

    if (frameCount % 80 == 0) {
        pipes.push(new Pipe());
    }

    for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].hits(bird)) {
            // alert("hit");
            pipes[i].highlight();
        } else {
            pipes[i].rmHighlight();
        }
        if (pipes[i].x < -20) {
            pipes.slice(i, 1);
        }
    }


    // sound control
    // two thresholds
    let thresholdTop = sliderTop.value();
    let thresholdBot = sliderBot.value();

    if (vol > thresholdTop && !clapping) {
        bird.up();
        clapping = true;
    }

    if (vol < thresholdBot) {
        clapping = false;
    }

    fill(0, 255, 0);
    let y = map(vol, 0, 1, height, 0);
    console.log(y);
    rect(width - 50, y, 50, height - y);

    
    push();
    let ty = map(thresholdTop, 0, 1, height, 0);    
    stroke(255, 0, 0)
    strokeWeight(4);
    line(width - 50, ty, width, ty);

    let by = map(thresholdBot, 0, 1, height, 0);    
    stroke(0, 0, 255)
    strokeWeight(4);
    line(width - 50, by, width, by);
    pop();
}

function keyPressed() {
    if (key = ' ') {
        bird.up();
        bird.update();
    }
}

