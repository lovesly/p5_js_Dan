function Drop() {
    this.x = random(width);
    this.y = random(-200, -100);
    this.z = random(0, 20);
    this.grav = 0;
    //what is that??
    this.length = map(this.z, 0, 20, 10, 20);
    this.ySpeed = map(this.z, 0, 20, 1, 20);

    //test wind
    this.wind = random(0, 5);

    this.fall = function() {
        this.y += this.ySpeed;
        this.grav = map(this.z, 0, 20, 0.01, 0.2);
        this.ySpeed += this.grav; 
        if (this.y > height) {
            this.y = random(-200, -100);
            this.ySpeed = map(this.z, 0, 20, 4, 10);
        }
    }

    this.show = function() {
        var thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(138, 43, 226);
        line(this.x, this.y, this.x, this.y + this.length);
    }

}