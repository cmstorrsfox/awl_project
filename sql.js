const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS family_members`);
});