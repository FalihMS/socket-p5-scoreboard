const http = require('http')
const express = require('express')
const { Server } = require("socket.io");

const app = express()
app.use(express.static('public'))
app.set('port', process.env.PORT || 3000)

const server = http.createServer(app)
const io = new Server(server);

const refId = [];

function genUID(socketId){
    const random = Math.floor(Math.random()*8999 + 1000)
    let isInserted = refId.find(function(uid){
        return uid.key == random
    })

    if(isInserted){
        genUID(socketId)
    }else{
        refId.push({
            uid: random,
            value: socketId,
        })
    }
}


io.on('connection', (socket) => {
    genUID(socket.id)

    // console.log('user connected: ' + socket.id);
    // console.log(`list Connection`)
    console.log('===========================================')
    refId.forEach(element => {
        console.log(`socket: ${element.uid} - ${element.value}`)       
    });
    console.log('===========================================')

    io.emit('message', socket.id)

    socket.on('disconnect', () => {
        console.log('===========================================')
        console.log('user disconnected, user id: ' + socket.id);
        pos = refId.map(function(e) { return e.value; }).indexOf(socket.id);
        console.log(`deleting socket: ${refId[pos].uid} - ${refId[pos].value}`)
        refId.splice(pos, 1);
        console.log('===========================================')
        refId.forEach(element => {
            console.log(`socket: ${element.uid} - ${element.value}`)       
        });
        console.log('===========================================')
    
    });

    socket.on('editScore', (pos, type, id) => {
        socket.broadcast.to(id).emit('score', pos, type);
    });

    socket.on('remote-start', (msg, uid) => {
        counter = 0
        counter = msg + 900

        pos = refId.map(function(e) { return e.uid; }).indexOf(parseInt(uid))
        id = refId[pos].value

        const loopSend = setInterval(function(){
            if(counter <= 0){
                clearInterval(loopSend)
            }
            socket.broadcast.to(id).emit('display', msg);
            counter -= 100
        }, 100)
    });

    socket.on('timer-end', (isEnd) => {
        io.emit('remote-end', isEnd)
    });

});

server.on('listening', () => {
 console.log('Listening on port 3000')
})

server.listen( process.env.PORT || 3000)