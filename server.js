const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
//body parser
app.use(bodyParser.urlencoded({extended: true}));
//views
app.use(express.static(__dirname + "/views"));
//css
app.use(express.static(__dirname + "/css"));
//ejs
app.set('view engine', 'ejs');
//routes
app.get("/", function(request, response) {
    response.render("index");
});
//port
const server = app.listen(1337, function() {
	console.log("listening on port 1337");
})

//socket.io
let counter = 0;
const io = require('socket.io')(server);    // socket.io connection
io.sockets.on('connection', function(socket) {  // Establishing a connection with user
    // console.log(socket);
	console.log("Connected: "+ socket.connected);
    console.log("Socket ID: "+ socket.id);
	socket.on("button_clicked", function(data) {
        counter += data.count;
        console.log('You emitted the following information to the server: ' + "+"+ data.count + " count");
		io.emit("updated_count", {count: counter});
	});
    socket.on("reset", function(data) {
		counter = 0;
		io.emit("updated_count", {count: counter});
	})
    io.emit("updated_count", {count: counter});
});