let vals = [0, 1, 2];
//why would this work???
//interesting

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(0);
    console.log(vals);
    let largestI = -1;
    let largestJ = -1;
    for (let i = 0; i < vals.length-1; i++) {
        if (vals[i] < vals[i+1]) {
            largestI = i;
        }
    }
    if (largestI === -1) {
        noLoop();
        console.log('LargestI not found, Finished');
    }
    for (let i = 0; i < vals.length; i++) {
        if (vals[i] > vals[largestI]) {
            largestJ = i;
        }
    }
    swap(vals, largestI, largestJ);

    //reverse i+1 .... n
    // for (let i = largestI+1; i < (vals.length + largestI + 1)/2; i++) {
    //     swap(vals, i, vals.length - (i - largestI));
    // }
    let endArray = vals.splice(largestI+1);
    endArray.reverse();
    vals = [...vals, ...endArray];

}



function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}