// import EX to create a connection to the Express.js server to host the application
const express = require('express');

// add the PORT designation and the app expression 
const PORT = process.env.PORT || 3001;
const app = express();

// add the Express.js middleware
app.use(express. urlencoded({ extended: false}));
app.use(express.json());

// import mysql2 to connect to the MySQL database
const mysql = require('mysql2');


// connect the applicaiton to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'atakaan1',
    database:'mySQL_team'
},
console.log ('Connected to the mySQL_team database.')
);


//query the database to test the connection

db.query(`SELECT * FROM employees`, (err, rows) => {
    console.log(err);
    console.log(rows);
});



//test the route

app.get('/', (req,res) => {
    res.json({
        message: 'I am working!!'
    });
});

// add a route that handles requests that are not supported by the app

app.use((req,res) => {
    res.status(404).end();
});

// add the function that will start the Express.js server on port 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});


