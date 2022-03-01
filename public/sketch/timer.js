let canvasWidth = screen.width
let canvasHeight = screen.height
let timer = 0
let state = 'stop'

let panel;
let digitalFont;
function preload(){
    digitalFont = loadFont('/src/font/sevenSegment.ttf')
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    textFont(digitalFont)
    frameRate(10)
    noStroke();
    background(0);
}

function draw() {
    
    if(state == 'play'){
        timer += 100
    }

    new Stopwatch(new Timer(timer), canvasWidth, canvasHeight).draw()
    panel = new PanelStopwatch(canvasWidth, canvasHeight)
    panel.setState(state).draw()

    if(panel.hoverButton(0) || panel.hoverButton(1)){
        cursor('pointer');
    }else{
        cursor('default')
    }

    
}


function mouseClicked() {
    if (state == 'play') {
        if(panel.hoverButton(1)){
            state = 'pause'
        }
    } else if(state == 'stop'){
        if(panel.hoverButton(1)){
            state = 'play'
        }    
    }else if(state == 'pause'){
        if(panel.hoverButton(0)){
            state = 'play'
        }else if(panel.hoverButton(1)){
            state = 'stop'
            timer = 0
        }        
    }
    console.log(state)
  }