const http = require('http')
const express = require('express')
const { Server } = require("socket.io");

const app = express()


app.use(express.static('public'))

app.set('port', '3000')

const server = http.createServer(app)
const io = new Server(server);
let counter = 0
io.on('connection', (socket) => {

    console.log('user connected: ' + socket.id);
    io.emit('message', socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('remote-start', (msg, id) => {
        counter = 0
        counter = msg + 900
        console.log('message: ' + msg + ' | id:' + id);
        const loopSend = setInterval(function(){
            if(counter <= 0){
                clearInterval(loopSend)
            }
            console.log(counter)
            socket.broadcast.to(id).emit('start', counter);
            
            counter -= 100
        }, 100)
    });

    socket.on('timer', (msg, id) => {
        console.log('message: ' + msg + ' | id:' + id);
        const loopSend = setInterval(function(){
            if(msg == 0){
                clearInterval(loopSend)
            }
            socket.broadcast.to(id).emit('display', msg);
            
            msg -= 1000
        }, 1000)
        
    });

    socket.on('timer-end', (isEnd) => {
        console.log('timer stop');
        io.emit('remote-end', isEnd)
    });

});

server.on('listening', () => {
 console.log('Listening on port 3000')
})

server.listen('3000')