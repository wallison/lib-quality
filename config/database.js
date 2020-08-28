const mongoose = require('mongoose');
const chalk = require('chalk');
const constants = require('./constants');

class Database {
    constructor() {
        process.on('SIGINT', function() {
            mongoose.connection.close(() => {
                console.log(chalk.red.bold('Mongoose! Disconnected by application'));
                process.exit(0);
            });
        });
    }

    establishConnection() {
        return new Promise((resolve, reject) => {
            mongoose.connect(constants.db.uri, constants.db.options)
                .then(result => {
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    connect() {
        return Promise.resolve()
            .then(() => this.establishConnection());
    }

}

module.exports = new Database();
