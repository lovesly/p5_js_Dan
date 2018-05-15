
function Tree() {
    this.leaves = [];
    this.branches = [];

    for (var i = 0; i < 2000; i++) {
        this.leaves.push(new Leaf());
    }

    //root of the tree
    var pos = createVector(width/2, height);
    var dir = createVector(0, -1);
    var root = new Branch(null, pos, dir);
    this.branches.push(root);

    var cur = root;
    var found = false;
    while (!found) {
        for (var i = 0; i < this.leaves.length; i++) {
            var d = p5.Vector.dist(cur.pos, this.leaves[i].pos);
            if (d < max_dist) {
                found = true;
                //break;
            }
        }
        if (!found) {
            var branch = cur.next();
            cur = branch;
            this.branches.push(cur);
        }        

    }

    this.grow = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            var leaf = this.leaves[i];
            var closestBranch = null;
            var record = 10000;

            for (var j = 0; j < this.branches.length; j++) {
                var branch = this.branches[j];
                var d = p5.Vector.dist(leaf.pos, branch.pos);
                if (d < min_dist) {
                    leaf.reached = true;
                    break;
                } else if (d > max_dist) {
                    
                } else if (closestBranch === null || d < record) {
                    closestBranch = branch;
                    record = d;
                } 
            }
            
            if (closestBranch !== null) {
                //link leaf with barnch
                //instead of link directlly, nomralize the vector, approch it slowly.
                //interesting
                var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.add(newDir);
                closestBranch.count++;
            }
        }

        for (var i = this.leaves.length-1; i >= 0; i--) {
            if (this.leaves[i].reached) {
                this.leaves.splice(i, 1);
            }
        }   
        
        for (var i = this.branches.length-1; i >= 0; i--) {
            var branch = this.branches[i];
            if (branch.count > 0) {
                //branch.dir.div(branch.count+1);
                branch.dir.normalize();
                this.branches.push(branch.next());
            }
            branch.reset();
        }
    }

    this.show = function() {
        for (var i = 0; i < this.leaves.length; i++) {
            this.leaves[i].show();
        }

        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }
    }
}