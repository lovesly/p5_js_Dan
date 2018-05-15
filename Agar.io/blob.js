
function Blob(x, y, rad = 64) {
    this.pos = createVector(x, y);
    this.r = rad;
    this.vel = createVector(0, 0);
    this.show = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }

    this.update = function() {
        let mouse = createVector(mouseX-width/2, mouseY-height/2);
        let d = dist(mouse.x, mouse.y, this.pos.x, this.pos.y);
        if (d > 10) {
            // mouse.sub(this.pos);
            mouse.setMag(3);
            this.vel.lerp(mouse, 0.2);
            this.pos.add(this.vel);
        }     
    }
    this.eats = function(food) {
        let d = p5.Vector.dist(this.pos, food.pos);
        return d < this.r + food.r - 5;
    }
    this.grow = function(rad) {
        let sum = sq(this.r) + sq(rad);
        this.r = sqrt(sum);
        // this.r += rad;
    }
}