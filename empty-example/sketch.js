var drops = [];
function setup() {
    createCanvas(800, 400);
    var num = 500;
    for(var i = 0; i < num; i++) {
        drops[i] = new Drop();        
    }
}

function draw() {
    background(230, 230, 250);
    for(var i = 0; i < 500; i++) {
        drops[i].fall();
        drops[i].show();
    }
}