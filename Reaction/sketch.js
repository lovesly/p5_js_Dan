var grid;
var next;

var dA = 1,
    dB = 0.5,
    feed = 0.055,
    k = 0.062;

function setup() {
    createCanvas(200, 200);
    pixelDensity(1);
    grid = [];
    next = [];
    for (var x = 0; x < width; x++) {
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y < height; y++) {
            grid[x][y] = { a: 1, b: 0 };
            //?
            next[x][y] = { a: 1, b: 0 };
        }
    }

    for (var i = 80; i < 120; i++) {
        for (var j = 100; j < 110; j++) {
            grid[i][j].b = 1;
        }
    }
}

function draw() {
    background(51);

    for (var x = 1; x < width-1; x++) {
        for (var y = 1; y < height-1; y++) {
            //formula
            var _a = grid[x][y].a;
            var _b = grid[x][y].b;
            next[x][y].a = _a +  
                           dA * laplaceA(x, y) - 
                           _a * _b * _b + 
                           feed * (1 - _a);
            next[x][y].b = _b +  
                           dB * laplaceB(x, y) + 
                           _a * _b * _b - 
                           (k + feed) * _b;
            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);
        }
    }



    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pix = (x + y * width)*4;
            var a = next[x][y].a;
            var b = next[x][y].b;
            var c = floor((a-b)*255);
            c = constrain(c, 0, 255);
            pixels[pix + 0] = c;
            pixels[pix + 1] = c;
            pixels[pix + 2] = c;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    swap();
}

function swap() {
    var temp = grid;
    grid = next;
    //next = temp;
}

//how to make those 2 functions into 1
function laplaceA(x, y) {
    var sum = 0;
    sum += grid[x][y].a * -1;
    sum += grid[x-1][y].a * 0.2;
    sum += grid[x+1][y].a * 0.2;
    sum += grid[x][y-1].a * 0.2;
    sum += grid[x][y+1].a * 0.2;
    sum += grid[x-1][y-1].a * 0.05;
    sum += grid[x+1][y+1].a * 0.05;
    sum += grid[x-1][y+1].a * 0.05;
    sum += grid[x+1][y-1].a * 0.05;
    return sum;
}

function laplaceB(x, y) {
    var sum = 0;
    sum += grid[x][y].b * -1;
    sum += grid[x-1][y].b * 0.2;
    sum += grid[x+1][y].b * 0.2;
    sum += grid[x][y-1].b * 0.2;
    sum += grid[x][y+1].b * 0.2;
    sum += grid[x-1][y-1].b * 0.05;
    sum += grid[x+1][y+1].b * 0.05;
    sum += grid[x-1][y+1].b * 0.05;
    sum += grid[x+1][y-1].b * 0.05;
    return sum;
}