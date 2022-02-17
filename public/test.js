let canvasWidth = screen.width
let canvasHeight = screen.height

// Keep track of our socket connection
let socket;
let song;
let timer;

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
    
    timer = new Timer();
    socket = io();


    socket.on('message', function(inp) {
      textSize(32);
      fill(255);
      text(socket.id , 10, 30);
    });

    socket.on('start', function(inp) {
        if(inp == -1){
          timer.setCounter(0)
        }else if(inp >= 0){
          timer.setCounter(inp) 
        }
    });


}

function draw() {

    new Timebox(timer)
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