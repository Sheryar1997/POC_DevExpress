import React from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
// import { dataSource, grossProductData } from '../../../../Components/Data/ExtremeBar';
import { Col, Row } from 'react-bootstrap';
import './DevExtreme.css';
import axios from 'axios';
import { SeriesVisibilityContext } from '../Dashboard/Dashboard';

function onPointClick(e) {
    e.target.select();
}

//
//
// -----------BAR CHART CODE--------------------
//
//
const DevExtreme = ({ seriesVisibility, toggleSeriesVisibility, startDate, endDate }) => {
    const [dataSource, setDataSource] = React.useState([]);
    const [grossProductData, setGrossProductData] = React.useState([]);

    function legendClickHandler(e) {
        // if toggleSeriesVisibility is not a function, then return
        if (typeof toggleSeriesVisibility !== "function"){
            // hide the series
            e.target.isVisible() ? e.target.hide() : e.target.show();
        } else {
            toggleSeriesVisibility(e.target.name)
        }
    }


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://poc-dev-server.vercel.app/lineChart');
                let data = response.data.lineChart;

                // Filter data if both startDate and endDate are set
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    data = data.filter(item =>
                        new Date(item.startDate) >= start && new Date(item.endDate) <= end
                    );
                }
                setGrossProductData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

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
                        <h6 style={{ width: "fit-content", margin: "10px 0", position:'absolute' }}>Bar Chart</h6>

                        <Chart id="chart"
                            title=""
                            dataSource={grossProductData}
                            onPointClick={onPointClick}
                            onLegendClick={legendClickHandler}

                        >
                            <CommonSeriesSettings
                                argumentField="country"
                                type="bar"
                                hoverMode="allArgumentPoints"
                                selectionMode="allArgumentPoints"
                            >
                                <Label visible={false}>
                                    <Format type="fixedPoint" precision={0} />
                                </Label>
                            </CommonSeriesSettings>
                            <Series
                                argumentField="country"
                                valueField="hydro"
                                name="Hydro-electric"
                                visible={seriesVisibility?.["Hydro-electric"]}
                                />
                            <Series
                                valueField="oil"
                                name="Oil"
                                visible={seriesVisibility?.["Oil"]}
                            />
                            <Series
                                valueField="gas"
                                name="Natural gas"
                                visible={seriesVisibility?.["Natural gas"]}
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