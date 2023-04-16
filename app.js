const express = require('express')
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const app = express()

// Creating a database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

// Setting Public Directory in Express Server
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// REQ.BODY
app.use(express.urlencoded({ extended: false }));

app.use(express.json());



app.set('view engine', 'hbs');
app.set('views', './views');

// Connecting to the database
connection.connect((err, results)=>{
    if(err) throw err;
    console.log('Connected to the database!')
})

// Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Running up a server
app.listen(3000, () => {
  console.log(`Server started!`)
})