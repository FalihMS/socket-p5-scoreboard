let canvasWidth = screen.width
let canvasHeight = screen.height
let counter = 9
let msg = 0
// Keep track of our socket connection
var socket;

const mappingNumber = [
    [1,1,1,0,1,1,1],
    [0,0,1,0,0,0,1],
    [0,1,1,1,1,1,0],
    [0,1,1,1,0,1,1],
    [1,0,1,1,0,0,1],
    [1,1,0,1,0,1,1],
    [1,1,0,1,1,1,1],
    [0,1,1,0,0,0,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1],
  
  ]

function sevenSegment(X, Y, length, number){

    if(number == 0){
      createPattern(X, Y, length, mappingNumber[0])
      
    }
    else if(number == 1){
      createPattern(X, Y, length, mappingNumber[1])
      
    }
    else if(number == 2){
      createPattern(X, Y, length, mappingNumber[2])
            
    }
    else if(number == 3){
      createPattern(X, Y, length, mappingNumber[3])
            
    }
    else if(number == 4){
      createPattern(X, Y, length, mappingNumber[4])
            
    }
    else if(number == 5){
      createPattern(X, Y, length, mappingNumber[5])
            
    }
    else if(number == 6){
      createPattern(X, Y, length, mappingNumber[6])
            
    }
    else if(number == 7){
      createPattern(X, Y, length, mappingNumber[7])
            
    }
    else if(number == 8){
      createPattern(X, Y, length, mappingNumber[8])
            
    }
    else if(number == 9){
      createPattern(X, Y, length, mappingNumber[9])
            
    }else{
    createPattern(X, Y, length, [0,0,0,0,0,0,0])
    }
  }
function createPattern(X, Y, length, pattern){

    let H = length / 3
    let W = H / 4

    X += W/2
    Y += W/2

    let gap = 5
    
  
    segment(W, H, X, Y, 'ver', pattern[0]);
    segment(W, H, X + gap, Y - gap, 'hor', pattern[1]);
    segment(W, H, X + (2*gap) + H, Y, 'ver', pattern[2]);
    segment(W, H, X + gap, Y + H + gap, 'hor', pattern[3]);
    segment(W, H, X, Y + H + (2*gap), 'ver', pattern[4]);  
    segment(W, H, X + gap, Y + (3*gap) + (2*H), 'hor', pattern[5]);
    segment(W, H, X + (2*gap) + H, Y + H + (2*gap), 'ver', pattern[6]);  
  }
function segment(W, H, X, Y, dir, lightOn){
    
    let colorOn = color(255, 53, 46);
    let colorOff = color(71);
    
    if(lightOn){
      fill(colorOn);
    }else{
      fill(colorOff);
    }
  
    
    if(dir == 'ver'){
      let w = W
      let h = H-W
      let x = X-(w/2)
      let y = Y + (w/2)
  
      
      noStroke();
      // Draw gray box
      triangle(X-(w/2), y, X, Y, x + w, y);
      rect(x, y, w, h);
      triangle(x, y+h, x+(w/2), y + h + (w/2), x + w, y+h);
    }else if(dir == 'hor'){
      let w = H-W
      let h = W
      let x = X + (W/2)
      let y = Y - (W/2)
  
      noStroke();
      // Draw gray box
      triangle(X, Y, x, y+W, x, y);
      rect(x, y, w, h);
      triangle(X + w + W, Y, x+w, y+W, x+w, y);
    }
    
  }
function dividerTime(X, Y, length, number){

  // fill(color(10, 10, 100));
  // rect(X, Y, length/5, length);
  let colorOn = color(255, 53, 46);
  let colorOff = color(71);
  
  if(number%2 == 0){
    fill(colorOn);
  }else{
    fill(colorOff);
  }

  rect(X +  length/20, Y + (length / 2) - 2*(length/10), length/10, length/10);
  rect(X +  length/20, Y + (length / 2) + (length/10), length/10, length/10);
  

}  
function createSevenSegment(X, Y, length, number){


    let x = X + (length / 12) 
    let y = Y + (length / 12)

    // fill(color(10, 100, `10));
    // rect(X, Y, length*2/3`, length);
    sevenSegment(x, y, length, number);


}
function createDividerTime(X, Y, length, number){

  let x = X + (length / 12) 
  let y = (length / 12)

  fill(color(10, 100, 10));
  dividerTime(X, Y, length, number)


}

function drawShape(shape, coordinate){
  if(shape = 'TRIANGLE'){
    const { x1, y1, x2, y2, x3, y3 } = coordinate
    triangle(x1, y1, x2, y2, x3, y3)
  }else if(shape = 'RECTANGLE'){
    const { x1, y1, x2, y2 } = coordinate
    rect(x1, y1, x2, y2)
  }
}


window.onblur = function () {
	loop();
}

window.onfocus = function () {
	loop();
}

let song;

function preload() {
  song = loadSound('buzzer.mp3');
}
function setup() {
    getAudioContext().suspend();
    song = createAudio('buzzer.mp3');
    createCanvas(canvasWidth, canvasHeight);
    frameRate(10)
    noStroke();
    background(0);
    console.log(canvasWidth/5)
    
    
    socket = io();


    socket.on('message', function(inp) {
      textSize(32);
      fill(255);
      text(socket.id , 10, 30);
    });

    socket.on('start', function(inp) {
        if(inp == -1){
            msg = 0;
        }else if(inp >= 0){
            msg = inp 
        }else{
            
        }

    });


}

function draw() {
    const d = new Date();
    let x = 100 * (canvasWidth/500)
    let y = canvasHeight/3
    let pl = x / 3

    // createSevenSegment(pl + 0, y, x, floor(d.getHours()/10))
    // createSevenSegment(pl + x * 2/3, y, x, d.getHours()%10)

    // createDividerTime(pl + x * 2/3 * 2, y, x, counter)

    // createSevenSegment(pl + x * 2/3 * 2 + (x/5), y, x, floor(d.getMinutes()/10))
    // createSevenSegment(pl + x * 2/3 * 3 + (x/5), y, x, d.getMinutes()%10)

    // createDividerTime(pl + x * 2/3 * 4 + (x/5), y, x, counter)

    // createSevenSegment(pl + x * 2/3 * 4 + (2*x/5), y, x, floor(d.getSeconds()/10))
    // createSevenSegment(pl + x * 2/3 * 5 + (2*x/5), y, x, d.getSeconds()%10)



    var hours = Math.floor((msg % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((msg % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((parseInt(msg) % (1000 * 60)) / 1000);
    var miliseconds = Math.floor((parseInt(msg) / 100 % 10) );


    if(hours == 0 && minutes == 0){
        s1 = Math.floor(miliseconds)
        s2 = null 
    
        m1 = Math.floor(seconds / 10)
        m2 = (seconds % 10) 
        
        h1 = null
        h2 = null
    }else if(msg == -1){
        s1 = 0
        s2 =  null
        
        m1 = 0
        m2 = 0
    
        h1 =  null
        h2 =  null
    }else{
        s1 = Math.floor(seconds / 10)
        s2 = (seconds % 10) 
        
        m1 = Math.floor(minutes / 10)
        m2 = (minutes % 10) 
    
        h1 = Math.floor(hours / 10)
        h2 = (hours % 10) 
    }

    createSevenSegment(pl + 0, y, x, h1)
    createSevenSegment(pl + x * 2/3, y, x, h2)

    createDividerTime(pl + x * 2/3 * 2, y, x, counter)

    createSevenSegment(pl + x * 2/3 * 2 + (x/5), y, x, m1)
    createSevenSegment(pl + x * 2/3 * 3 + (x/5), y, x, m2)

    createDividerTime(pl + x * 2/3 * 4 + (x/5), y, x, counter)

    createSevenSegment(pl + x * 2/3 * 4 + (2*x/5), y, x, s1)
    createSevenSegment(pl + x * 2/3 * 5 + (2*x/5), y, x, s2)

    // console.log(msg)

    if (mouseIsPressed) {
        userStartAudio();
        song.stop(0);
    }
    
    if(hours == 0 && minutes == 0 && seconds == 0 && miliseconds == 0){
        song.loop()
        socket.emit('timer-end', true);
        msg = -1
    }else if(hours >= 0 || minutes >= 0 || seconds >= 0 || miliseconds >= 0){
        // msg -= 100
    }

    else if(msg == -1){
        setTimeout(function(){
            song.noLoop();
        }, 750)
    }
}