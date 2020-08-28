const IssueCollector = require('../api/issue.collector.js');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Report = mongoose.model('Report');

class IssueController {

    startCollection(req, res) {
        let params = req.params;

        IssueCollector.execute(params.owner, params.repo)
            .then((result) => {
            })
            .catch(err => {
                console.log(chalk.red.bold(err));
            });


        res.status(200).send();
    }
}

module.exports = new IssueController();
