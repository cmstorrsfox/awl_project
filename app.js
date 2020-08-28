const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database('./db.sqlite');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', express.static('public'));


//GET all names
app.get('/family', (req,res,next) => {
    db.all(`SELECT * FROM family_members`, (err, rows) => {
        if(err) {
            res.sendStatus(500);
        } else {
            res.status(200).send({ members: rows });
        }
    });
});

//GET family member by position
app.get('/family/:position', (req, res, next) => {
    const position = req.query.position;
    console.log(position);
    db.get(`SELECT * from family_members WHERE position = $position`, 
    {
        $position: position
    }, (err, row) => {
        if(err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.status(200).send({ member: row });
        }
    });

});



//POST family member (first_name, last_name, position)
app.post('/family', (req, res, next) => {
    const newRow = req.body;
    console.log(newRow);
    db.run(`INSERT INTO family_members (first_name, last_name, position)
            VALUES ($firstName, $lastName, $position)`, {
                $firstName: newRow.firstName,
                $lastName: newRow.lastName,
                $position: newRow.position
            }, (err, row) => {
                if(err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.status(201).send({ member: row })
                }
            });
});

app.listen(PORT, () => {
    console.log(`The server is listening on ${PORT}`);
});