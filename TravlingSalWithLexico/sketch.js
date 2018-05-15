let cities = [];
const totalCities = 6;
let order = [];
let recordDistance;
let best;

function setup() {
    createCanvas(400, 600);
    for (let i = 0; i < totalCities; i++) {
        let v = createVector(random(width), random(height/2));
        cities[i] = v;
        order[i] = i;
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

    // swap strategy
    // let i = floor(random(cities.length));
    // let j = floor(random(cities.length));
    // swap(cities, i, j);

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

    textSize(64);
    let s = '';
    for (let i = 0; i < order.length; i++) {
        s += order[i];
    }
    fill(255);
    text(s, 20, height - 100);
    nextOrder();
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




// Lexical order algorithm

function nextOrder() {
    let largestI = -1;
    let largestJ = -1;
    for (let i = 0; i < order.length-1; i++) {
        if (order[i] < order[i+1]) {
            largestI = i;
        }
    }
    if (largestI === -1) {
        noLoop();
        console.log('LargestI not found, Finished');
    }
    for (let i = 0; i < order.length; i++) {
        if (order[i] > order[largestI]) {
            largestJ = i;
        }
    }
    swap(order, largestI, largestJ);
    swap(cities, largestI, largestJ);
    //reverse i+1 .... n
    // for (let i = largestI+1; i < (order.length + largestI + 1)/2; i++) {
    //     swap(order, i, order.length - (i - largestI));
    // }
    let endArray = order.splice(largestI+1);
    endArray.reverse();
    order = [...order, ...endArray];
}