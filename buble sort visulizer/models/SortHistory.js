const mongoose = require('mongoose');

const sortHistorySchema = new mongoose.Schema({
    array: [Number],
    sortedArray: [Number],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SortHistory', sortHistorySchema);
