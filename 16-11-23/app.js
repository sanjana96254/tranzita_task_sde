const express = require('express');
const sql = require('mssql');

const app = express();
const port = 4000;

const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'tempdb',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// API GET
app.get('/sa/data', (req, res) => {
    sql.connect(config)
        .then(pool => {
            const displayQuery = 'SELECT * FROM dbo.[user]';
        

            return pool.request().query(displayQuery);
        })
        .then(result => {
            res.json(result.recordset);
        })
        .catch(err => {
            // Handle errors
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            sql.close();
        });
});



app.post('/sa/data', (req, res) => {
    sql.connect(config)
        .then(pool => {
       
            return pool.request().query('SELECT * FROM dbo.[user]');
        })
        .then(result => {
            res.json(result.recordset);
        })
        .catch(err => {
            // Handle errors
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            sql.close();
        });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});