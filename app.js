var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//config seerving static files
app.use(express.static('public'));

// make index.html the main page to show
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

// socket.io events
io.on('connection', function(socket){
  
  console.log('a user connected');
  
  socket.on('disconnect', function(){
  	console.log('user disconnect');
  });

  socket.on('new message', function(message){
  	io.emit('new message',message);
  });
});

// config server to run on localhost posrt 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});
