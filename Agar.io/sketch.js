let blob;
let blobs = [];
let zoom = 1;

function setup() {
    createCanvas(600, 600);
    blob = new Blob(0, 0);
    for (let i = 0; i < 100; i++) {
        let x = random(-width, width);
        let y = random(-height, height); 
        blobs[i] = new Blob(x, y, 16);
    }
}

function draw() {
    background(0);

    //translate magic.....
    translate(width/2, height/2);
    //option2 or step2, scale the world
    //smooth
    let newZoom = 64/blob.r;
    zoom = lerp(zoom, newZoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);
    blob.show();
    blob.update();
    for (let i = blobs.length-1; i >= 0; i--) {
        blobs[i].show();
        if (blob.eats(blobs[i])) {
            //option1 or step1, self grow. 
            blob.grow(blobs[i].r);
            blobs.splice(i, 1);
        }
    }
}


