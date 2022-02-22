let canvasWidth = screen.width
let canvasHeight = screen.height
let state
let timer
let panel

let STATE = {
    START:0,
    PLAY:1,
    PAUSE:2,
    STOP:3,
    RESUME:4
}

let myFont;

function preload() {
  myFont = loadFont('../src/font/sevenSegment.ttf');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(10)
    textFont(myFont);
    textSize(64);
    noStroke();
    background(0);
    console.log(canvasWidth/5)
    state = STATE.START
    timer = 0
}

function draw() {
    // const date = new Date();
    
    noStroke();
    switch (state) {
        case STATE.START:
            start()
            break;
        case STATE.PLAY:
            play()
            break;
        case STATE.PAUSE || STATE.STOP:
            pause()
            break;
        // case STATE.STOP:
        //     pause()
        //     break;
        default:
            break;
    }
    
}
function keyPressed() {
    if (key == 'p') {
        switch (state) {
            case STATE.START:
                state = STATE.PLAY
                break;
            case STATE.PLAY:
                state = STATE.PAUSE
                break;
            case STATE.PAUSE:
                state = STATE.PLAY
                break;
            case STATE.STOP:
                start()
                state = STATE.PLAY
                break;
            default:
                break;
        }
    }else if(key == 'r') {
        switch (state) {
            case STATE.PLAY:
                state = STATE.STOP
                break;
            case STATE.PAUSE:
                state = STATE.START
                break;
            case STATE.STOP:
                state = STATE.START
                break;
            default:
                break;
        }
    }
  }

function mousePressed(){
    console.log()
    if(panel.onFirstPanel){
        switch (state) {
            case STATE.START:
                state = STATE.PLAY
                break;
            case STATE.PLAY:
                state = STATE.PAUSE
                break;
            case STATE.PAUSE:
                state = STATE.PLAY
                break;
            case STATE.STOP:
                start()
                state = STATE.PLAY
                break;
            default:
                break;
        }
    }else if(panel.onSecondPanel){
        switch (state) {
            case STATE.PLAY:
                state = STATE.STOP
                break;
            case STATE.PAUSE:
                state = STATE.START
                break;
            case STATE.STOP:
                state = STATE.START
                break;
            default:
                break;
        }
   
    }
}

function start(){
    timer = 0
    panel = new Stopwatch(new Timer(timer), canvasWidth, canvasHeight)
    panel.onPause = false
    panel.onPlay = false

    panel.draw()
}

function play(){
    timer += 100
    panel = new Stopwatch(new Timer(timer), canvasWidth, canvasHeight)
    panel.onPause = false
    panel.onPlay = true

    panel.draw()
}

function pause(){
    panel = new Stopwatch(new Timer(timer), canvasWidth, canvasHeight)
    panel.onPause = true
    panel.draw()
}







