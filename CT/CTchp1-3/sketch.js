function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(51, 150, 255);
	ellipseMode(CENTER);
	rectMode(CENTER);

	fill(255, 0, 0);
	rect(240, 145, 20, 100);

	fill(0, 0, 255);
	ellipse(240, 115, 60, 60);
}