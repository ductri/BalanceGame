var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/ref'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('orientation', function(orienObject){
    // console.log('-----------------------');
    // console.log('absolute='+orienObject.absolute);
    // console.log('alpha='+orienObject.alpha);
    // console.log('beta='+orienObject.beta);
    // console.log('gamma='+orienObject.gamma);
    io.emit('orientationReceive', orienObject);
  });


  socket.on('motion', function(motionObject){
    // console.log('-----------------------');
    // console.log('x='+motionObject.x);
    // console.log('y='+motionObject.y);
    // console.log('z='+motionObject.z);
    io.emit('motionReceive', motionObject);
  });

  socket.on('m_line_up', function() {
    io.emit('s_line_up');
    console.log('Line up');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});