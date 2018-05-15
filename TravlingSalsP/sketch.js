let cities = [];
const totalCities = 10;
let recordDistance;
let best;

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < totalCities; i++) {
        let v = createVector(random(width), random(height));
        cities[i] = v;
    }
    let d = calcDistance(cities);
    recordDistance = d;
    best = cities.slice();
}

function draw() {
    background(0);
    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    swap(cities, i, j);

    let d = calcDistance(cities);
    if (d < recordDistance) {
        recordDistance = d;
        best = cities.slice();
        console.log(recordDistance);
        console.log(best);
    }

    // ?? what is begin/end shape
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();
    //swap

    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (let i = 0; i < best.length; i++) {
        vertex(best[i].x, best[i].y);
    }
    endShape();

}

function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}

function calcDistance(points) {
    let sum = 0;
    let d;
    for (let i = 0; i < points.length-1; i++) {
        d = dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y );
        sum += d;
    }
    return sum;
}