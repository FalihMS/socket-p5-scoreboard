const http = require('http')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/public/page/index.html')
})

app.get('/timer',(req,res)=>{
    res.sendFile(__dirname +'/public/page/timer.html')
})

app.get('/clock',(req,res)=>{
    res.sendFile(__dirname +'/public/page/clock.html')
})

app.get('/remote',(req,res)=>{
    res.sendFile(__dirname +'/public/page/remote.html')
})

const server = http.createServer(app)

server.on('listening', () => {
 console.log('Listening on port 3000')
})

server.listen( process.env.PORT || 3000)