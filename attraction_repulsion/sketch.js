const attractors = [];
const particles = [];

function setup() {
    createCanvas(400, 400);
    // for (let i = 0; i < 5; i++) {
    //     attractors.push(createVector(random(width), random(height)));
    // }
    // for (let i = 0; i < 50; i++) { 
    //     particles.push(new Particle(random(width), random(height)));        
    // }    
}

function draw() {
    background(51);    
    stroke(255);
    strokeWeight(5);
    particles.push(new Particle(random(width), random(height)));            
    if (particles.length > 100) {
        particles.splice(0, 1);
    }
    for (let i = 0; i < attractors.length; i++) {
        stroke(0, 255, 0);
        point(attractors[i].x, attractors[i].y);
    }

    for (let i = 0; i < particles.length; i++) { 
        let particle = particles[i];
        for (let j = 0; j < attractors.length; j++) {    
            particle.attracted(attractors[j]);
        }
        particle.update();    
        particle.show();
    }

}

function mousePressed() {
    attractors.push(createVector(mouseX, mouseY));
}
