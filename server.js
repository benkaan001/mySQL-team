// import EX to create a connection to the Express.js server to host the application

const express = require('express');

// add the PORT designation and the app expression 

const PORT = process.env.PORT || 3001;
const app = express();

// add the Express.js middleware

app.use(express. urlencoded({ extended: false}));
app.use(express.json());

//test the route

app.get('/', (req,res) => {
    res.json({
        message: 'I am working!!'
    });
});

// add the function that will start the Express.js server on port 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});


