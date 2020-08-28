const controller = require('../controllers/report.controller');

module.exports = function (app) {

    const DEFAULT_ROUTE = `/report/:owner/:repo`;

    app.route(DEFAULT_ROUTE)
        .get(controller.list);

    app.route(DEFAULT_ROUTE)
        .delete(controller.delete);
};
