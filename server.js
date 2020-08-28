const http = require('http');
const chalk = require('chalk');
const cons = require('./config/constants');
const Database = require('./config/database.js');
const app = require('./config/express')();

// init database
Database.connect()
    .then(() => {

        // init server only after database has connected
        http.createServer(app).listen(app.get('port'), function(){

            console.log(chalk.green('Title:\t\t\t' + cons.server.title));
            console.log(chalk.green('Port:\t\t\t' + cons.server.port));
            console.log(chalk.green.bold('-- MongoDB --'));
            console.log(chalk.green('Database:\t\t' + cons.db.uri));
        });
    })
    .catch(err => {
        console.log(chalk.red.bold(err));
    });
