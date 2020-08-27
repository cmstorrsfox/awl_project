const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS awl`);
    db.run(`CREATE TABLE awl (
        id INTEGER PRIMARY KEY,
        noun_person TEXT,
        noun_thing TEXT,
        verb TEXT,
        adverb TEXT,
        adjective TEXT,
        other TEXT
    )`);
});