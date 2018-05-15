let ship;
let asteroids = [];
let total = 5;
let lasers = [];

function setup() {
    createCanvas(800, 800);
    ship = new Ship();
    for (let i = 0; i < total; i++) {
        asteroids.push(new Asteroid());        
    }
}

function draw() {
    background(0);
    ship.render();
    ship.turn();
    ship.update();
    for (let i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('Dead');
        }
        asteroids[i].render();
        asteroids[i].update();
    }
    for (let i = lasers.length-1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        for (let j = asteroids.length-1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
                if (asteroids[j].r > 10) {
                    let newAsteroids = asteroids[j].breakup();
                    console.log(newAsteroids);
                    asteroids = asteroids.concat(newAsteroids);
                } else {
                    // increase score
                }                
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                break;
            }
        }
        if (lasers[i] && lasers[i].offscreen()) {
            lasers.splice(i, 1);
        }
    }
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        ship.setRotation(0.1);
    } else if (keyCode === LEFT_ARROW) {
        ship.setRotation(-0.1);
    }
    if (keyCode === UP_ARROW) {
        ship.boosting(true);
    }
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}
