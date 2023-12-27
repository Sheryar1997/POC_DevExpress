import React, { useState, useEffect } from 'react';
import PieChart, {
	Series, Label, Connector, Size, Export, Legend
} from 'devextreme-react/pie-chart';
import axios from 'axios';
import { areas } from '../../../../Components/Data/PieData';
import { Col, Row } from 'react-bootstrap';


function pointClickHandler(e) {
	toggleVisibility(e.target);
}
function legendClickHandler(e) {
	const arg = e.target;
	const item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
	toggleVisibility(item);
}
function toggleVisibility(item) {
	item.isVisible() ? item.hide() : item.show();
}



const DynamicPie = () => {

	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Replace with `fetch` if not using axios
				const response = await axios.get('http://ec2-18-216-149-209.us-east-2.compute.amazonaws.com/poc_devexpress/pieChart');
				setChartData(response.data);
			} catch (error) {
				console.error("Error fetching data: ", error);
				// Handle error
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<Row>
				<Col md={12} className='mb-5'>
					<div className='graph_box'>
						<h6 style={{ width: "fit-content", margin: "10px 0" }}>Pie Chart - 1</h6>

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

							<Size width={1200} height={700} />
							<Export enabled={true} />
						</PieChart>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default DynamicPie;