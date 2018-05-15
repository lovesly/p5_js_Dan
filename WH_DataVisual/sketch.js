let potus;
const myMap = new Map();
let keyArray = [];
let valArray = [];

function preload() {
    potus = loadJSON('potus.json');
}

function setup() {
    createCanvas(600, 600);
    const tweets = potus.tweets;
    for (let i = tweets.length-1; i >= 0; i--) {
        let date = new Date(tweets[i].timestamp);
        let month = date.getMonth();
        let year = date.getFullYear();
        let key = month + '/' + year;

        // we want to use a map
        // but nested map is not easy to use
        let val = myMap.has(key) ? myMap.get(key) : 0;
        myMap.set(key, {
            total: val + 1,
            words: {}
        });
        let txt = tweets[i].text;
        let words = txt.split(/\W+/);
        for (let j = 0; j < words.length; j++) {
            let word = words[j];
            if (myMap.get(key).words.hasOwnProperty(word)) {
                // set value inside map object??
                // use libs like lodash
                // use object.
            }
        }
    }

    myMap.forEach((value, key) => {
        console.log(`${key} = ${value}`);
    });
    // console.log(Array.from(myMap.keys()));
    background(0);
    
    keyArray = Array.from(myMap.keys());
    valArray = Array.from(myMap.values());
    const tmpArr = [];
    for (let i = 0; i < valArray.length; i++) {
        tmpArr.push(valArray[i].total);
    }

    const max = Math.max.apply(null, tmpArr);
    const w = width / keyArray.length;
    for (let i = 0; i < keyArray.length; i++) {
        let month = keyArray[i];
        let num = myMap.get(month);
        let h = map(num, 0, max, 0, 300);
        fill(200);
        rect(i * w, height - h, w - 1, h);
    }

}
