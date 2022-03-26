var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
var script = require("./script");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
    for(var i in matrix) {
      socket.emit("display message", matrix[i]);
    }
    socket.on("send message", function (data) {
        matrix.push(data);
        io.sockets.emit("display message", data);
    });
 });
 