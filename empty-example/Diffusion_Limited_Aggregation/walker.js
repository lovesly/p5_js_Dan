
function Walker({posX, posY, rad} = {}) {
    if (posX && posY) {
        this.pos = createVector(posX, posY);        
    } else {
        this.pos = randomCirclePoint();
    }
    this.r = rad;

    this.walk = () => {
        let vel = p5.Vector.random2D();
        vel.setMag(4);
        this.pos.add(vel);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height); 
    }

    this.checkStuck = (others) => {
        for (let i = 0; i < others.length; i++) {
            let d = distSq(this.pos, others[i].pos);
            if (d < (this.r * others[i].r * 4)) {
                return true;
            }
        }
        return false;
    }

    this.show = (stucked) => {
        // strokeWeight(r * 2);
        if (stucked) {
            let hu = map(this.r, 0, 5, 0, 360);
            fill(hu, 255, 255);
        } else {
            fill(255);
        }
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}

//this is so fucking smart, good job shiffman
function distSq(a, b) {
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    return dx*dx + dy*dy;
}

function randomPoint() {
    let i = floor(random(4));
    switch (i) {
        case 0:
            return createVector(random(width), 0);
            break;
        case 1:
            return createVector(random(width), height);    
            break;
        case 2:
            return createVector(0, random(height));        
            break;
        case 3:
            return createVector(width, random(height));                
            break;
        default:
            break;
    }
}

function randomCirclePoint() {
    let angle = random(0, TWO_PI);
    let r = 300;
    let x = width/2 + r * cos(angle);
    let y = height/2 + r * sin(angle);
    return createVector(x, y);        
}