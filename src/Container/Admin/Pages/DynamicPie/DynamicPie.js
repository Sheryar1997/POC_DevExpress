import React, { useState, useEffect } from 'react';
import PieChart, {
	Series, Label, Connector, Size, Export, Legend
} from 'devextreme-react/pie-chart';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';



function legendClickHandler(e) {
	const arg = e.target;
	const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
	toggleVisibility(item);
}
function toggleVisibility(item) {
	item.isVisible() ? item.hide() : item.show();
}



const DynamicPie = () => {
	const [innerdata, setInnerdata] = useState(false);
	const [chartData, setChartData] = useState([]);

	function pointClickHandler(e) {
		const country = e.target.argument;
		fetchCountryDetails(country);
	}
	
	const fetchCountryDetails = async (country) => {
		try {
			const response = await axios.get(`https://poc-dev-server.vercel.app/pieChart/${country}`);
			
			// Extract the first element from the response array
			const countryData = response.data[0];
			
			// Map the city details to the new chart data format
			const newChartData = countryData.details.map(detail => ({
				country: detail.name,
				area: detail.count
			}));
			setInnerdata(true);
			setChartData(newChartData);
		} catch (error) {
			console.error("Error fetching country details: ", error);
			// Handle error
		}
	};

	const fetchData = async () => {
		try {
			// Replace with `fetch` if not using axios
			console.log('innerdata')
			setInnerdata(false)
			const response = await axios.get('https://poc-dev-server.vercel.app/pieChart');
			setChartData(response.data);
		} catch (error) {
			console.error("Error fetching data: ", error);
			// Handle error
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Row>
				<Col md={12} className='mb-5'>
					<div className='graph_box'>
						<h6 style={{ width: "fit-content", margin: "10px 0" }}>Pie Chart</h6>

						<PieChart
							id="pie"
							dataSource={chartData}
							palette="Bright"
							title="Area of Countries"
							onPointClick={pointClickHandler}
							onLegendClick={legendClickHandler}
						>
							<Series
								argumentField="country"
								valueField="area"
							>
								<Label visible={true}
								>
									<Connector
										visible={true}
										width={1}
									/>
								</Label>
							</Series>

							{/* <Size width={1200} height={700} /> */}
							<Export enabled={true} />
						</PieChart>
						{innerdata ? <div>
							<button onClick={() => fetchData()}>Back</button>
							</div> : null}
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default DynamicPie;