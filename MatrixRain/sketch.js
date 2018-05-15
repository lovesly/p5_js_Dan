var symbol;
var symbolSize;
var cols;
var stream;
var streams = [];

function setup() {
    createCanvas(800, 600); 
    background(0);
    symbolSize = 20;
    cols = floor(width/symbolSize);
    textSize(symbolSize);
    for (var i = 0; i < cols; i++) {
        stream = new Stream(i * symbolSize + 10, floor(random(-400, 0)), floor(random(2, 5)));
        stream.generateSymbols();
        streams.push(stream);
    }
}

function draw() {
    background(0, 150);
    for (let stream of streams) {
        stream.render();
    }   
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;
    this.first = first;
    this.switchInterval = floor(map(speed, 2, 5, 10, 5));
    
    this.setToRandomSymbol = function() {
        this.value = String.fromCharCode(
            0x30A0 + round(random(0, 96))
        );
    }

    this.render = function() {
        if (first) {
            fill(180, 255, 200);
        } else {
            fill(0, 255, 90);
        }
        
        text(this.value, this.x, this.y);
        if (frameCount % this.switchInterval === 0) {
            this.setToRandomSymbol();
        }
    }

    this.rain = function() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = -10;
        }
    }
}

function Stream(x, y, speed) {
    this.symbols = [];
    this.x = x;
    this.y = y; 
    this.totalSymbols = random(10, 20);
    this.speed = speed;

    this.generateSymbols = function() {
        var y = this.y; 
        var x = this.x;

        for (var i = 0; i < this.totalSymbols; i++) {
            var symbol = new Symbol(x, y, this.speed, i === 0);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            //
            y -= symbolSize;
        }
    }

    this.render = function() {
        for (let test of this.symbols) {
            test.render();
            test.rain();
        }
     }
}
