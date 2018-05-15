function Ship() {
    this.pos = createVector(width/2, height/2);
    this.r = 20;
    this.heading = PI/2;
    this.rotation = 0;
    this.isBoosting = false;
    this.vel = createVector(0, 0);

    this.update = () => {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.95);
        this.edges();
    }
    
    this.boosting = (val) => {
        this.isBoosting = val;
    }

    this.boost = () => {
        const force = p5.Vector.fromAngle(this.heading);
        this.vel.add(force);
    }

    this.hits = (asteroid) => {
        const d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        return d < this.r + asteroid.r;
    }

    this.edges = () => {
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

    this.render = () => {
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI/2);                
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }

    this.setRotation = (val) => {
        this.rotation = val;
    }

    this.turn = () => {
        this.heading += this.rotation;
    }
}