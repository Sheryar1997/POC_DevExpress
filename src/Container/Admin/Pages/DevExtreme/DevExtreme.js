import React from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
import { dataSource, grossProductData } from '../../../../Components/Data/ExtremeBar';
import { Col, Row } from 'react-bootstrap';
import './DevExtreme.css';

function onPointClick(e) {
    e.target.select();
}

const DevExtreme = () => {
    return (
        <div>
            <Row>
                <Col md={12} className='mb-5'>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Bar Chart</h6>

                        <Chart
                            id="chart"
                            dataSource={dataSource}
                        >
                            <Series
                                valueField="oranges"
                                argumentField="day"
                                name="My oranges"
                                type="bar"
                                color="#ffaa66"
                            />
                        </Chart>
                    </div>
                </Col>

                <Col md={12}>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Gross State Product within the Great Lakes Region</h6>

                        <Chart id="chart"
                            title=""
                            dataSource={grossProductData}
                            onPointClick={onPointClick}
                        >
                            <CommonSeriesSettings
                                argumentField="state"
                                type="bar"
                                hoverMode="allArgumentPoints"
                                selectionMode="allArgumentPoints"
                            >
                                <Label visible={true}>
                                    <Format type="fixedPoint" precision={0} />
                                </Label>
                            </CommonSeriesSettings>
                            <Series
                                argumentField="state"
                                valueField="year2018"
                                name="2018"
                            />
                            <Series
                                valueField="year2017"
                                name="2017"
                            />
                            <Series
                                valueField="year2016"
                                name="2016"
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