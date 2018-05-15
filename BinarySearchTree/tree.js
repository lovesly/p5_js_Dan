function Tree() {
    this.root = null;
}

Tree.prototype.addNode = function(n) {
    let node = new Node(n);
    if (this.root == null) {
        this.root = node;
    } else {
        this.root.addNode(node);
    }
}

Tree.prototype.traverse = function() {
    this.root.visit();
}

Tree.prototype.addArray = function(arr) {
    // this issue in arrow function
    arr.forEach(element => {
        this.addNode(element);
    });
}

Tree.prototype.search = function(val) {
    const res = this.root.search(val);
    console.log(res);
}