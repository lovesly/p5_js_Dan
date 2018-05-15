function Cell(pos, r, c) {
    this.pos = pos ? pos.copy() : createVector(random(width), random(height));
    this.r = r || 80;
    this.c = c || color(random(100, 255), 0, random(100, 255), 100);

    this.move = function() {
        var vel = p5.Vector.random2D();
        this.pos.add(vel);
    }

    this.show = function() {
        noStroke();
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    this.clicked = function(x, y) {
        var d = dist(this.pos.x, this.pos.y, x, y);
        return d < this.r;
    }

    this.mitosis = function() {
        this.pos.x += random(-this.r/2, this.r/2)
        var cell = new Cell(this.pos, 0.7 * this.r, this.c);
        return cell;
    }
}