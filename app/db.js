const sqlite3 = require('sqlite3').verbose();
const test = require('../server')

// #### ouverture base de donnée####
const db = new sqlite3.Database('./bdd.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connecté a la base bdd.db :)');
});

// ##### création des tables #######
let init = function () {
    db.run("CREATE TABLE if not exists user (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " pseudo TEXT" +
        ")");
    db.run("CREATE TABLE if not exists message (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " label TEXT," +
        " date DATE" +
        ")");
    console.log("table créé")
}

// ##### Insertion des données ####
const insert = (msg) => {
    db.run(`INSERT INTO message(label,date) VALUES(?,?)`, [msg.label, Date.now()], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`la ligne est inséré ${this.lastID}`);
    })
};

const insert2 = () => {
    db.run(`INSERT INTO user(pseudo) VALUES(?)`, [], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`pseudo ok !`);
    })
}

// ##### Selection des données ( dans notre base ) ######
const select = (socket) => {
    const sql = `SELECT  label,
            date
            FROM message
            ORDER BY date`;

    db.each(sql, [], (err, row) => {
        if (err) {
            throw err;
        }
        console.log(row);
        socket.emit('chat message', row)

    })
};



module.exports = {
    init: init,
    db: db,
    insert: insert,
    select: select
};