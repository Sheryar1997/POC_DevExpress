const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PieChartSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true,
    default: 0
  },
  details: {
    type: Array,
    required: true,
    default: []
  }
});

module.exports = mongoose.model('pies', PieChartSchema);