'use strict';

//Define App Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const config = require('config');



//Define API Routes
const userRoute = require("./routes/user-route");
const questionRoute = require("./routes/question-route");
const subscriptionRoute = require("./routes/subscription-route");


//Initialize App Dependencies
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get the application specific config information
const { appversion } = config.get('app_config');

//Initialize API Routes
app.use(`/api/${appversion}/user`, userRoute);
app.use(`/api/${appversion}/question`, questionRoute);
app.use(`/api/${appversion}/subscription`, subscriptionRoute);


//Set Header Response 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

process.on('unhandledRejection', (reason, p) => {
    console.log("unhandledRejection", reason);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("uncaughtException", error);
    throw error;
});

module.exports = app;
