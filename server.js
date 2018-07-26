const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const database = require('./app/db')

app.use(express.static('public'));

database.init();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
// #### insertion pseudo ####



// ##### connexion + recuperation message #####
io.on('connection', function (socket) {
    const rows = database.select(socket)
    console.log('message récupéré')
    // ##### deconnexion #####
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
// #### insertion des nouveaux messages ####
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        database.insert(msg)
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});





// close the database connection
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });



http.listen(3000, function () {
    console.log('listening on *:3000');
});