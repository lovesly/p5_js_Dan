const rules = {
    "S": [["The", "N", "V"]],
    "N": ["cat", "dog"],
    "V": ["meows", "barks"]
}

function setup() {
    noCanvas();

    let start = "S";
    let expansion = [];

    let result = expand(start, expansion);
    console.log(expansion);
    createP(result);
}

function expand(start, expansion) {
    if (rules[start]) {
        let pick = random(rules[start]);
        if (Array.isArray(pick)) {
            for (let i = 0; i < pick.length; i++) {
                expand(pick[i], expansion);
            }
        } else {
            expand(pick, expansion);            
        }
    } else {
        expansion.push(start);
    }
    return expansion.join(" ");
}