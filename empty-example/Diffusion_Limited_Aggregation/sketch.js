let tree = [];
let walkers = [];
let r = 5;

/**
 *  Modify the tree root position, and the walker start location(eg. from top, center, edges, circle)
 *  will get you a total different image
 * 
 */

function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    tree[0] = new Walker({posX: width/2, posY: height/2, rad: r});
    for (let i = 0; i < 100; i++) {
        walkers[i] = new Walker({rad: r});
    }
}

function draw() {
    background(0);
    for (let i = 0; i < tree.length; i++) {
        tree[i].show(true);
    }

    for (let i = 0; i < walkers.length; i++) {
        walkers[i].show();
    }
    for (let n = 0; n < 300; n++) {
        for (let i = walkers.length-1; i >= 0; i--) {
            walkers[i].walk();    
            if (walkers[i].checkStuck(tree)) {
                tree.push(walkers[i]);
                let _r = walkers[walkers.length-1].r;
                walkers.splice(i, 1);
                if (tree.length < 1000) {
                    walkers.push(new Walker({rad: _r * 0.9993}));                    
                }
            }    
        }
    }
} 