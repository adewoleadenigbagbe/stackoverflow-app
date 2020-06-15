'use strict';

var mongoose = require('mongoose');
const config = require('config');


const { host, port, dbName } = config.get('db_config');


module.exports = async function connect() {
    //change this later into a config
    let connResult = await mongoose.connect(`mongodb://${host}:${port}/${dbName}`);
    return connResult;
};
