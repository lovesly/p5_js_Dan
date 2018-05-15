
function Asteroid(pos, r) {
    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(random(width), random(height));        
    }
    this.vel = p5.Vector.random2D();
    this.r = r ? r*0.5 : floor(random(20, 50));
    this.total = floor(random(5, 15));
    this.offset = [];    
    
    for (let i = 0; i < this.total; i++) {
        this.offset[i] = random(-this.r * 0.5, this.r * 0.5);        
    }
    this.offset[this.total] = this.offset[0];

    this.render = () => {
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        // ellipse(0, 0, this.r * 2);
        beginShape();
        for (let i = 0; i <= this.total; i++) {
            let angle = map(i, 0, this.total, 0, TWO_PI);
            let r = this.r + this.offset[i];
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape();
        pop();
    }

    this.update = () => {
        this.pos.add(this.vel);
        this.edges();
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.breakup = () => {
        let newA = [];
        newA[0] = new Asteroid(this.pos, this.r);
        newA[1] = new Asteroid(this.pos, this.r);
        return newA;
    }
}