let canvasWidth = screen.width
let canvasHeight = screen.height

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(1)
    noStroke();
    background(0);
    console.log(canvasWidth/5)
}

function draw() {
    const date = new Date();
    new Timebox(new Timer(date.getTime() + (1000 * 60 * 60 * 7)))
}