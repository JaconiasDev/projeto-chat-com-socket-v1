const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app)
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'..','PUBLIC')))

let pathName = path.join(__dirname,'..','PUBLIC');

app.get('/',(req,res)=>{
    res.send('hi')
})

app.get('/msg',(req,res)=>{
    let pat_Relative = path.join(pathName,'index.html');
    res.sendFile(pat_Relative)
})


io.on('connection', soket =>{
    soket.on('sendMessage',msg => {
       soket.broadcast.emit('render',msg)
    })
})

server.listen(5000,()=>{
    console.log('server running')
});
