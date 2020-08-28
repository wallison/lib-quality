# LibQuality

This project requires NodeJS version 10+ (https://nodejs.org/en/) and Database MongoDB (https://www.mongodb.com/).

## Build

To execute this project you need open a terminal in root folder and run `npm install` .

## Run

Once build project, in root folder, you need to run `npm start` to start server. Look out in terminal that you can access que server by http://localhost:3000.

## REST API

The better way to collect and summarize big data is to create a report with data_points before, extracting the mean information and saving.
This strategy makes the request of the report be very fast, the end user don`t need to wait very much,
but on the other hand the report needs to be updated constantly to have correct information.

HashMap can help to identify points and check then more fast than others structures.

ENDPOINTS:

- Start collection of issues to save report before.
GET
1 - http://localhost:3000/issues/:owner/:repo

* This route access and start collector to create report, if desire to update constantly, it is important to create a daily schedule to execute the collector.

- Return report of issues from project.
GET, DELETE
2 - http://localhost:3000/report/:owner/:repo

* End user can access created report previously that contains information by day about issues.
