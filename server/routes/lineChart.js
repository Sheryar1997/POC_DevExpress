const express = require('express');
const LineChart = require('../models/LineChart');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const lineChart = await LineChart.find();

        const sources = [
            { value: 'hydro', name: 'Hydro-electric' },
            { value: 'oil', name: 'Oil' },
            { value: 'gas', name: 'Natural gas' },
            { value: 'coal', name: 'Coal' },
            { value: 'nuclear', name: 'Nuclear' },
        ];
        
        // remove the first element from pieChart array
        lineChart.shift();

        const data = {
            sources,
            lineChart,
        };

        console.log(data)
        res.json(data);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;