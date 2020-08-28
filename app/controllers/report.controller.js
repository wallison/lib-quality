const mongoose = require('mongoose');
const Report = mongoose.model('Report');
const constants = require('../../config/constants');

class ReportController {

    list(req, res) {
        let params = req.params;
        Report.findOne({ owner: params.owner, repository: params.repo})
            .exec()
            .then(report => {
                if (!report) {
                    return res.status(constants.http.INTERNAL_SERVER_ERROR).send(constants.error.INTERNAL_ERROR);
                }
                const fullReport = ReportController.calculateAllAges(report);
                return res.status(constants.http.SUCCESS).send(fullReport);
            })
            .catch(err => {
                console.log(err);
                return res.status(constants.http.INTERNAL_SERVER_ERROR).send(err);
            });
    }

    delete(req, res) {
        let params = req.params;
        Report.findOneAndRemove({ owner: params.owner, repository: params.repo})
            .exec()
            .then(report => {
                if (!report) {
                    return res.status(constants.http.INTERNAL_SERVER_ERROR).send(constants.error.INTERNAL_ERROR);
                }
                return res.status(constants.http.SUCCESS).send();
            })
            .catch(err => {
                console.log(err);
                return res.status(constants.http.INTERNAL_SERVER_ERROR).send(err);
            });
    }

    static calculateAllAges(report) {
        let dataPoints = report.data_point;
        let std_age = 0;
        let sum_age = 0;

        dataPoints.forEach((v, k) => {
            const calc = ReportController.calculateAge(v.date);
            v.age = calc;
            report.data_point.set(k, v);

            if(v.total > std_age) {
                std_age = v.age
            }
            sum_age += (v.age * v.total);
        });

        report.avg_age = sum_age / report.total_issues;
        report.std_age = std_age;
        return report;
    }

    static calculateAge(date) {
        let now = new Date();
        let range = now.getTime() - date.getTime();
        let rangeInDays = range / (1000 * 3600 * 24);
        if (rangeInDays < 1) {
            return 1;
        }
        return rangeInDays;
    }
}

module.exports = new ReportController();
