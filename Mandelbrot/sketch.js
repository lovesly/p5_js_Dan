var pixels = [];
function setup() {
    createCanvas(360, 360);
    pixelDensity(1);
}

function draw() {
    //background(51);
    loadPixels();
    
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var a = map(x, 0, width, -2.5, 2.5);
                var b = map(y, 0, height, -2.5, 2.5);
    
                var n = 0;
                var ca = a;
                var cb = b;
    
    
                while(n < 100) {
                    var aa = a*a - b*b;
                    var bb = 2*a*b;
                    a = aa + ca;
                    b = bb + cb;
                    //??
                    if (abs(a + b) > 16) {
                        break;
                    }
                    n++;
                }
                var bright = map(n, 0, 100, 0, 255);
                //interesting, n++ in while loop
                if (n >= 100) {
                    bright = 0;
                }
                
    
                var pix = (x + y * width) * 4;
                pixels[pix + 0] = bright;
                pixels[pix + 1] = bright;
                pixels[pix + 2] = bright;
                pixels[pix + 3] = 255;
            }
        }
        updatePixels();
}


