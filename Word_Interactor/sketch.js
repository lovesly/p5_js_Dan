
function setup() {
    noCanvas();
    textfield = select("#input");
    output = select("#output");
    submit = select("#submit");
    submit.mousePressed(newText);
}

function newText() {
    let s = textfield.value();
    // what's the difference between with () and without ()
    let words = s.split(/(\W+)/);
    for (let i = 0; i < words.length; i++) {
        let span = createSpan(words[i]);
        span.parent(output);
        
        if (!/\W+/.test(words[i])) {
            // span.style('background-color', color(random(255), random(255), random(255)));
            span.mouseOver(highlight);
        }
    }
}

function highlight() {
    this.html('rainbow');
    let c = color(random(255), random(255), random(255));
    this.style('background-color', c);
}