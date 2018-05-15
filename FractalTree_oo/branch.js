
function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;

    this.show = function(obj) {
        //change color
        stroke(obj.r, obj.g, obj.b);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.jitter = function() {
        this.end.x += random(-1, 1);
        this.end.y += random(-1, 1);
    }

    this.branch = function(flag, angle) {
        this.finished = true;
        if (this.length() < 2) return null;
        //vector or point??
        var dir = p5.Vector.sub(this.end, this.begin);
        if (flag) {
            dir.rotate(angle);
        } else {
            dir.rotate(-angle);
        }  
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);
        return new Branch(this.end, newEnd);
    }

    this.length = function() {
        return dist(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
}