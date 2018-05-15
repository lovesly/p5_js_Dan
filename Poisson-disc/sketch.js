let r = 5;
let k = 30;
let grid = [];
let active = [];
let w = r/Math.sqrt(2);
let cols, rows;

function setup() {
    createCanvas(400, 400);
    strokeWeight(4);
    colorMode(HSB);
    cols = floor(width/w);
    rows = floor(height/w);
    for (let i = 0; i < cols*rows; i++) {
        grid[i] = undefined;
    }
    console.log("grid.length: " + grid.length);
    let x = random(width);
    let y = random(height);
    //(j, i), weird
    let i = floor(x/w);
    let j = floor(y/w);
    let pos = createVector(x, y);
    grid[i + j * cols] = pos;
    active.push(pos);
}

function draw() {
    background(0);   
    // console.log("active: " + active.length + "--- grid: " + grid.length);
    for (let total = 0; total < 10; total++) {
        if (active.length > 0) {
            let randIndex = floor(random(active.length));
            let pos = active[randIndex];
            let found = false;
            for (let n = 0; n < k; n++) {
                let sample = p5.Vector.random2D();
                let m = random(r, 2 * r);
                sample.setMag(m);
                sample.add(pos);
                //constrain sample inside the canvas
                if (sample.x < 0 || sample.x > width || sample.y < 0 || sample.y > height) continue;
                let col = floor(sample.x/w);
                let row = floor(sample.y/w);
                if (!grid[col + row * cols]) {
                    let flag = true;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            let neighbor = grid[col + i + (row + j) * cols];
                            if (neighbor) {
                                let d = p5.Vector.dist(sample, neighbor);
                                if (d < r) {
                                    flag = false;
                                }
                            }
                        }
                    }
                    if (flag) {
                        grid[col + row * cols] = sample;
                        active.push(sample);
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                active.splice(randIndex, 1);
            }
        }
    }
    for (let i = 0; i < grid.length; i++) {
        //interesting, sometimes i is undefined
        if (grid[i]) {
            stroke(i/10 % 255, 100, 100);
            strokeWeight(4);
            point(grid[i].x, grid[i].y);
        }
    }
    

    // active points
    // for (let i = 0; i < active.length; i++) {
    //     stroke(255, 0, 255);
    //     strokeWeight(4);
    //     point(active[i].x, active[i].y);
    // }
}