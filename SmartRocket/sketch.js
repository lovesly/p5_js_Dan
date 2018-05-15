var pops;
var lifespan = 300;
var count=0;
var target;

function setup() {
    createCanvas(400, 400);
    pops = new Population();
    target = createVector(width/2, 50);

}


function draw() {
    background(0);
    pops.run();
    count++;
    if (count === lifespan) {
        // pops = new Population();
        // count = 0;
        pops.evaluate();
        pops.selection();
        count = 0;
    }
    ellipse(target.x, target.y, 16, 16);
}

function Population() {
    this.rockets = [];
    this.popsize = 50;
    this.matingpool = [];


    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.evaluate = function() {
        var maxfit = 0;
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness;
            }
        }
        
        var totalFit = 0;
        for (var i = 0; i < this.popsize; i++) {
            //0 issue
            this.rockets[i].fitness /= maxfit;
            totalFit += this.rockets[i].fitness;
        }
        var averageFit = totalFit/this.popsize;
        console.log(averageFit);

        this.matingpool = [];
        for (var i = 0; i < this.popsize; i++) {
            var n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }
    }

    this.selection = function() {
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;
            var child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(child);
        }
        this.rockets = newRockets;
    }

    this.run = function() {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }

}

function DNA(genes) {

    //better way to do this?
    if (genes) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }
    }
    
    this.crossover = function(partner) {
        var newgenes = [];
        var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {
            newgenes[i] = i > mid ? this.genes[i] : partner.genes[i];
        }
        return new DNA(newgenes);
    }

    this.setGenes = function(newdna) {
        this.genes = newdna;
    }

    this.mutation = function() {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1);
            }
        }
    }

}


function Rocket(newdna) {
    this.pos = createVector(width/2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = newdna ? newdna : new DNA();
    this.fitness;
    this.completed = false;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.calcFitness = function() {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        
        //not 100% correct
        this.fitness = map(d, 0, width, width, 0);
        if (this.completed) {
            this.fitness *= 10;
        }
    }

    this.update = function() {

        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
        }

        this.applyForce(this.dna.genes[count]);
        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            //think about it
            this.acc.mult(0);
        }
    }

    this.show = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
}

