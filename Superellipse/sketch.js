// eslint-disable-next-line
function setup() {
    createCanvas(400, 400);
    sliderN = createSlider(0, 10, 1);
    fill(255);
    const s = 'The quick brown fox jumped over the lazy dog.';
}

function sgn(val) {
    if (val > 0) {
        return 1;
    } else if (val < 0) {
        return -1;
    }
    return 0;

}

function draw() {
    textSize(32);
    text('word', 20, 20);

    background(51);
    translate(width / 2, height / 2);
    stroke(255);
    noFill();
    const a = 150;
    const b = 100;
    const n = sliderN.value();
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
        const na = 2 / n;
        const x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
        const y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));


        vertex(x, y);
    }
    endShape(CLOSE);
    textSize(20);
    text(n, 150, 190);
}


