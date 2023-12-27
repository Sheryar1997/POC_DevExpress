const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineChartSchema = new Schema({
    country: {
        type: String,
    },
    hydro: {
        type: Number,
    },
    oil: {
        type: Number,
    },
    gas: {
        type: Number,
    },
    coal: {
        type: Number,
    },
    nuclear: {
        type: Number,
    },
});

module.exports = mongoose.model('lines', LineChartSchema);


