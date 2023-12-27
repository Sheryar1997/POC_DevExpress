// import axios from 'axios';

// const energySources = [
//     { value: 'hydro', name: 'Hydro-electric' },
//     { value: 'oil', name: 'Oil' },
//     { value: 'gas', name: 'Natural gas' },
//     { value: 'coal', name: 'Coal' },
//     { value: 'nuclear', name: 'Nuclear' },
// ];

// const countriesInfo = [{
//     country: 'USA',
//     hydro: 71.2,
//     oil: 910.4,
//     gas: 483.2,
//     coal: 564.3,
//     nuclear: 216.1,
// }, {
//     country: 'China',
//     hydro: 72.5,
//     oil: 223.6,
//     gas: 36,
//     coal: 956.9,
//     nuclear: 11.3,
// }, {
//     country: 'Russia',
//     hydro: 47.7,
//     oil: 149.4,
//     gas: 432.3,
//     coal: 105,
//     nuclear: 29.3,
// }, {
//     country: 'Japan',
//     hydro: 17.9,
//     oil: 283.6,
//     gas: 61.8,
//     coal: 120.8,
//     nuclear: 52.8,
// }, {
//     country: 'India',
//     hydro: 14.4,
//     oil: 86.4,
//     gas: 25.1,
//     coal: 204.8,
//     nuclear: 3.8,
// }, {
//     country: 'Germany',
//     hydro: 6.6,
//     oil: 101.7,
//     gas: 92.7,
//     coal: 85.7,
//     nuclear: 30.8,
// }];

const getEnergySources = async () => {
    try{
        const response = await axios.get('https://poc-dev-server.vercel.app/lineChart');
        console.log(response.data, 'response.data.sources');
        return response.data.sources;
    } catch {
        console.error("Error fetching data: ", error);
    }
}

const getCountriesInfo = async () => {
    try{
        const response = await axios.get('https://poc-dev-server.vercel.app/lineChart');
        return response.data.lineChart;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export default {
    getEnergySources,
    getCountriesInfo
};