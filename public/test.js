const canvasWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const canvasHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// Keep track of our socket connection
let socket;
let song;
let timer;

let scoreA = 0;
let scoreB = 0;

function preload() {
  song = loadSound('buzzer.mp3');
}
function setup() {
    
    getAudioContext().suspend();
    song = createAudio('buzzer.mp3');

    createCanvas(canvasWidth, canvasHeight);
    
    frameRate(10)
    background(0);
    
    timer = new Timer(0);
    socket = io();


    socket.on('message', function(inp) {
      // textSize(32);
      // fill(255);
      // text(socket.id , 10, 30);
    });

    socket.on('start', function(inp) {
        if(inp == -100){
          timer.setCounter(0)
        }else if(inp >= 0){
          timer.setCounter(inp) 
        }
    });

    socket.on('score', function(pos, val) {
      if(pos == 'HOME'){
        scoreA += val
      }else{
        scoreB += val 
      }
    });


}

function draw() {
  let x = 100 * (canvasWidth/400)
  let y = canvasHeight/3
  let pl = x / 3

  
  new Timebox(timer, canvasWidth, canvasHeight/3)

  new Scoreboard(canvasWidth, canvasHeight/2, [scoreA, scoreB])
    validatePressedMouse()

    timer.state(function(){
      song.loop()
      socket.emit('timer-end', true);
      timer.setCounter(-1)
    },function(){
      setTimeout(function(){
        song.noLoop();
      }, 750)
    })
}

function validatePressedMouse(){
  if (mouseIsPressed) {
    userStartAudio();
    song.stop(0);
  }
}