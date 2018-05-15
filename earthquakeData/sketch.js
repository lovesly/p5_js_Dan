let maping;

let clat = 0;
let clon = 0;

// shanghai
// let lat = 31.2304;
// let lon = 121.4737;
// vancuver
// let lat = 49.2827;
// let lon = -123.1207;

let zoom = 1;
let earthquakes;
let mag;

function preload() {
    maping = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoibG92ZXNseSIsImEiOiJjamd6eDFsMDAzZ3F1MndtbHY4ZTZseWsxIn0.PcBi9MYDGBjhe2B_dIFsiA");
    earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
    // interesting thing is earthquakes is an array for sure,
    // but in devTools, I can't access this array
    // ok, turns out to be some p5 staff, can't access the result inside preload function. 
}

function setup() {
    createCanvas(1024, 512);
    translate(width/2, height/2);
    imageMode(CENTER);
    image(maping, 0, 0);

    let cx = mercX(clon);
    let cy = mercY(clat);

    for (let i = 0; i < earthquakes.length; i++) {
        let data = earthquakes[i].split(/,/);
        let lat = data[1];
        let lon = data[2];
        mag = data[4];
        // some mag is less then 0, wierd.
        if (mag < 0) continue;
        // mesure the scale
        // mag 5 is 10 times stronger than mag 4
        // when drawing the circle, area is the power of radius
        // mag = pow(10, mag);
        // mag = sqrt(mag);
        // which is the same as follows
        mag = pow(10, mag/2);
        let magmax = pow(10, 5);

        let x = mercX(lon) - cx;
        let y = mercY(lat) - cy;

        let d = map(mag, 0, magmax, 1, 200);
        stroke(255, 0, 255);
        fill(255, 0, 255, 200);
        ellipse(x, y, d, d);
    }
}

// Web Mercator Formular
// map lon,lat to x,y
function mercX(lon) {
    lon = radians(lon);
    const a = (256/PI) * pow(2, zoom);
    const b = lon + PI;
    return a * b;
}

function mercY(lat) {
    lat = radians(lat);
    const a = (256/PI) * pow(2, zoom);
    const b = tan(PI/4 + lat/2);  
    const c = PI - log(b);
    return a * c;
}

function draw() {

}

