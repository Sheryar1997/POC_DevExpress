import React from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
// import { dataSource, grossProductData } from '../../../../Components/Data/ExtremeBar';
import { Col, Row } from 'react-bootstrap';
import './DevExtreme.css';
import axios from 'axios';

function onPointClick(e) {
    e.target.select();
}

const DevExtreme = () => {
    const [dataSource, setDataSource] = React.useState([]);
    const [grossProductData, setGrossProductData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://poc-dev-server.vercel.app/lineChart');
                setDataSource(response.data.sources);
                setGrossProductData(response.data.lineChart);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <Row>
                {/* <Col md={12} className='mb-5'>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Bar Chart</h6>

                        <Chart
                            id="chart"
                            dataSource={dataSource}
                        >
                            <Series
                                valueField="oil"
                                argumentField="Oil"
                                name="My oranges"
                                type="bar"
                                color="#ffaa66"
                            />
                        </Chart>
                    </div>
                </Col> */}

                <Col md={12}>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Energy Source Per Country</h6>

                        <Chart id="chart"
                            title=""
                            dataSource={grossProductData}
                            onPointClick={onPointClick}
                        >
                            <CommonSeriesSettings
                                argumentField="country"
                                type="bar"
                                hoverMode="allArgumentPoints"
                                selectionMode="allArgumentPoints"
                            >
                                <Label visible={true}>
                                    <Format type="fixedPoint" precision={0} />
                                </Label>
                            </CommonSeriesSettings>
                            <Series
                                argumentField="country"
                                valueField="hydro"
                                name="Hydro-electric"
                            />
                            <Series
                                valueField="oil"
                                name="Oil"
                            />
                            <Series
                                valueField="gas"
                                name="Natural gas"
                            />
                            <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                            <Export enabled={true} />
                        </Chart>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DevExtreme