
function Pipe() {

    let spacing = random(40, height/2);
    let centerY = random(spacing, height - spacing);

    this.top = centerY - spacing/2;
    this.bottom = height - centerY - spacing/2;
    this.x = width;
    this.w = 20;
    this.speed = 5;
    this.color = 255;

    this.show = function() {
        fill(255, this.color, 255);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    this.hits = function(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }
    
    this.highlight = function() {
        this.color = 200;
    }

    this.rmHighlight = function() {
        this.color = 255;
    }

    this.update = function() {
        this.x -= this.speed;
    }
}