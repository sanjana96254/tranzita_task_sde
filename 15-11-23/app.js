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
            const displayQuery = 'SELECT * FROM dbo.employee';
            const insertQuery = "IF NOT EXISTS (SELECT * FROM dbo.employee WHERE e_id= 1003) INSERT INTO dbo.employee (e_id,e_name,salary) VALUES (1003,'def',10000)";
            const updateQuery = "UPDATE dbo.employee SET e_name = 'prateek' WHERE e_id=1003";

            pool.request().query(insertQuery);
            pool.request().query(updateQuery);

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
            const deleteQuery = 'DELETE FROM dbo.employee WHERE e_id=1002';
            pool.request().query(deleteQuery);
            return pool.request().query('SELECT * FROM dbo.employee');
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
})