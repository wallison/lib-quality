const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const glob = require('glob');
const join = require('path').join;
const cons = require('./constants');

module.exports = function () {
    const app = express();

    app.set('port', process.env.PORT || 3000);

    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(helmet());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE,PATCH");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Expose-Headers", "Content-Type, Authorization");
        next();
    });

    app.use((req, res, next) => {
        let oldSend = res.send;
        res.send = function(data) {
            if(res.statusCode === cons.http.INTERNAL_SERVER_ERROR && data && (!data.code || !data.message)) {
                let error = cons.error.INTERNAL_ERROR;
                error.info = { error: data };
                data = error;
            }
            res.send = oldSend;
            return res.send(data);
        };
        next();
    });

    let models = glob.sync(join(__dirname, '../app/models/*.js'));
    models.forEach(model => require(model));

    let routes = glob.sync(join(__dirname, '../app/routes/*.js'));
    routes.forEach(route => require(route)(app));

    return app;
};
