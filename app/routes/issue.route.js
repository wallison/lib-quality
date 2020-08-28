const controller = require('../controllers/issue.controller');

module.exports = function (app) {

    const DEFAULT_ROUTE = `/issues/:owner/:repo`;

    app.route(DEFAULT_ROUTE)
        .get(controller.startCollection);
};
