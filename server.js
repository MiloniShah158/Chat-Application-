const express = require('express')
const app = express()
const { Socket } = require('socket.io')


//it is written like this var http=require('http'),var server=http.Server(app)  
//socket.io example uses http.server()to create a server and then http.listen() listen for the connections on given port and host
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//work as a middleware, from get method it only access index file but I want all files of public folder
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//for socket connection 
const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})