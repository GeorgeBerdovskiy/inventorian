let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let conn = mysql.createConnection({
    host : '192.168.0.25',
    user: 'overlord',
    password: 'password',
    database: 'inventorian'
})

conn.connect();

app.get('/', (request, result) => {
    return result.json({ 
        message: 'Server operational.'
    });
})

app.get('/items', (request, result) => {
    conn.query("SELECT * FROM item", (error, results) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "There are currently no items in this database.";
        } else {
            message = "All items have been successfully retrieved.";
        }

        return result.json({
            message: message,
            data: results
        });
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log("Listening on port %d.", port);
})

module.exports = app;