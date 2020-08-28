const axios = require('axios');
const mongoose = require('mongoose');
const Report = mongoose.model('Report');
const constants = require('../../config/constants');

class IssueCollector {

    async startCollection(owner, repository) {
        let report =  await Report.findOne({owner: owner, repository: repository}).exec();
        if (!report) {
            report = {owner: owner, repository: repository, total_issues: 0, next_collection_page: 0, data_point: new Map() };
        }

        let hasItems = true;
        let page = report.next_collection_page;
        const perPage = constants.COLLECT_PER_PAGE;

        while (hasItems) {

            try {
                let path = `https://api.github.com/repos/${owner}/${repository}/issues/events?page=${page}&per_page=${perPage}&state=open`;
                let response = await axios.get(path);
                let data = response.data;
                hasItems = data.length > 0;

                if (!hasItems) {
                    report.status = constants.CollectorStatus.FINISHED;
                    console.log('FINISHED');
                } else {
                    report.total_issues += data.length;
                    for (let issue of data) {
                        if (issue.state === 'closed') {
                            hasItems = false;
                            break;
                        }

                        const date = this.transformDateToCheck(new Date(issue.created_at));
                        if (!report.data_point.has(date)) {
                            console.log();
                            report.data_point.set(date, {total: 0, age: 0, date: issue.created_at});
                        }
                        let value = report.data_point.get(date);
                        value.total += 1;
                        report.data_point.set(date, value);
                    }
                }

                console.log('PAGE', page);
                page++;
            } catch (error) {
                console.log(error);
                break;
            }

            report.next_collection_page = page;
            this.saveReport(report);
        }
    }

    saveReport(report) {
        Report(report).save()
            .then(() => {
                console.log('SAVING');
            })
            .catch(err => {
                console.log(err);
            });
    }

    transformDateToCheck(date) {
        const day = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();
        const month = date.getMonth() < 10 ? '0' + date.getMonth() : '' + date.getMonth();
        return `${month}/${day}/${date.getFullYear()}`;
    }

    execute(owner, repository) {
        return Promise.resolve()
            .then(() => this.startCollection(owner, repository));
    }
}

module.exports = new IssueCollector();
