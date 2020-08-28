const mongoose = require('mongoose');

let ReportSchema = mongoose.Schema({
    owner: {type: String, required: true},
    repository: {type: String, required: true},
    total_issues: {type: Number, default: 0},
    avg_age: {type: Number, default: 0},
    std_age: {type: Number, default: 0},

    status: {type: String, enum: ['FINISHED', 'COLLECTING'], default: 'COLLECTING'},
    next_collection_page: Number,

    data_point: {type: Map, of: {total: Number, age: Number, date: Date}}
});

ReportSchema.index({owner: 1, repository: 1}, {unique: true});

module.exports = mongoose.model('Report', ReportSchema);
