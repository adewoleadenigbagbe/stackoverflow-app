'use strict';

const config = require('config');
const app = require('./app');
const dbConn = require('./helpers/dbconnection');

//get the server specific config information
const { localPort } = config.get('server_config');


//start the server
(function () {
    let conn = dbConn();
    conn.then(() => {
        console.log("Sucessfully connected to the database.");
        let port = process.env.Port || localPort;
        app.listen(port, () => {
            console.log(`Server is running on port : ${port}`);
        });
    })
        .catch(err => {
            console.log("Failed connecting to the database", err);
            process.exit(1);
        });
})();

