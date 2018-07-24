var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});




const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('./bdd.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connecté a la base bdd.db :)');
});
// Create table 
let init = function () {
    db.run("CREATE TABLE if not exists user (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " pseudo TEXT," +
        ")");
    db.run("CREATE TABLE if not exists message (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " pseudo TEXT," +
        " label TEXT," +
        " date DATE," +
        ")");
    console.log("table créé")
}

// close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});



http.listen(3000, function () {
    console.log('listening on *:3000');
});