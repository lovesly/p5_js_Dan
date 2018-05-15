let tree;

function setup() {
    noCanvas();
    tree = new Tree();
    tree.addArray([5, 3, 12, 2, 10, 9, 7]);
//    tree.addNode(5);
    tree.traverse();
}

// todo
// 1. invalid value
// 2. same value issue
