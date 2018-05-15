var cells = [];

function setup() {
    createCanvas(700, 700);
    cell = new Cell();
    cells.push(cell);
    cells.push(new Cell());
    //cells.push(new Cell())
}

function draw() {
    background(51);
    for (var i = 0; i < cells.length; i++) {
        cells[i].show();
        cells[i].move();
    }
}

function mousePressed() {
    for (var i = cells.length - 1; i > -1; i--) {
        if (cells[i].clicked(mouseX, mouseY)) {
            cells.push(cells[i].mitosis());
            cells.push(cells[i].mitosis());
            cells.splice(i, 1);
        }
    }
}

