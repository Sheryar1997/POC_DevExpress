const express = require('express');
const PieChart = require('../models/PieChart');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pieChart = await PieChart.find();
        console.log(pieChart)
        res.json(pieChart);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:country', async (req, res) => {
    try {
        const pieChart = await PieChart.find({ country: req.params.country });
        res.json(pieChart);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;