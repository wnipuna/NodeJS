const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();

const app = express();

//conn string
const dbURI = process.env.CONN;
mongoose.connect(dbURI, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.use(express.json());

const pRouter = require('./routes/persons');
app.use('/persons',pRouter);

app.listen(9000, () => {
    console.log('Server started');
});