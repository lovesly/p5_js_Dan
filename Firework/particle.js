
function Particle(x, y, hu, blow) {
    this.pos = createVector(x, y);
    this.blow = blow;
    this.lifespan = 255;
    // this.speed_x = speed ? speed.x : null;
    // this.speed_y = speed ? speed.y : null;
    
    this.vel = blow ? p5.Vector.random2D().mult(random(2, 10)): 
                createVector(0, random(-11, -7));
    this.acc = createVector(0, 0);

    this.update = function() {
        if (this.blow) {
            //why it's not stop??
            this.vel.mult(0.9);
            this.lifespan -= 6;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function(force) {
        this.acc.add(force);   
    }

    this.show = function() {
        colorMode(HSB);
        if (this.blow) {
            strokeWeight(2);
            stroke(hu, 255, this.lifespan);
        } else {
            strokeWeight(4);
            stroke(255);
        }
        point(this.pos.x, this.pos.y);
    }

    this.done = function() {
        return this.lifespan <= 0;
    }
}