var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3000;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

io.on('connection', function(socket) {
    console.log('you are connected');

    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'} );
 
    //listen for incoming message
    
    socket.on(' chat text', function(msg) {
        console.log('message: ', msg, 'socket:', socket.id);
   
        // send message to all coonnected client
       
        io.emit('chat message', { id: `${socket.id}`, message: msg });
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
});