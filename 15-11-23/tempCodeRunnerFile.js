const express = require('express');
const sql = require('mssql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Enable JSON request body parsing

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
app.get('/getSanjana', (req, res) => {
    res.send("Hello from Get Method");
});

// API POST - Insert Data
app.post('/insertData', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        const request = new sql.Request();
        const query = "INSERT INTO tempdb (column1, column2) VALUES (@value1, @value2)";

        // Replace req.body.value1, req.body.value2 with the actual values you want to insert
        request.input('value1', sql.Int, 1010);
        request.input('value2', sql.VarChar, 'Ashutosh');

        request.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error inserting data');
            }

            res.send('Data inserted successfully');
        });
    });
});

// API PUT - Update Data
app.put('/updateData/:id', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        const request = new sql.Request();
        const query = "UPDATE tempdb SET column1 = @value1, column2 = @value2 WHERE id = @id";

        request.input('value1', sql.VarChar, 1100);
        request.input('value2', sql.VarChar, 'Abhi');
        request.input('id', sql.Int, 1001);

        request.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error updating data');
            }

            res.send('Data updated successfully');
        });
    });
});

// API DELETE - Delete Data
app.delete('/deleteData/:id', (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }

        const request = new sql.Request();
        const query = "DELETE FROM tempdb WHERE id = @id";

        request.input('id', sql.Int, 1002);

        request.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error deleting data');
            }

            res.send('Data deleted successfully');
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

