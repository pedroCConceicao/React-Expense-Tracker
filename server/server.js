const express = require('express');
const app = express();
const cors = require('cors');

// Port reading
require('dotenv').config({path:"./config.env"});
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require('./db/connection');

// using routes
app.use(require('./routes/route'));

con.then(db => {
    if(!db) return process.exit(1);

    // listen to http server, only when we have a valide connection with db
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });

    app.on('error', err => console.log(`Failed to Connect with Server: ${err}`))
    // error in mondb connection
}) .catch (error => {
    console.log(`Connection Failed! ${error}`)
})