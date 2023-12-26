import React from 'react';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin,
    Label,
    Format,
    CommonAxisSettings,
    Tooltip,
    Grid,
} from 'devextreme-react/chart';
import service from '../../../../Components/Data/LineData';
import { architectureSources, sharingStatisticsInfo } from '../../../../Components/Data/LineData2';

import './DevExtremeLine.css';
import { Col, Row } from 'react-bootstrap';

const countriesInfo = service.getCountriesInfo();
const energySources = service.getEnergySources();

const types2 = ['spline', 'stackedspline', 'fullstackedspline'];
const types = ['line', 'stackedline', 'fullstackedline'];
// const seriesTypeLabel = { 'aria-label': 'Series Type' };

const DevExtremeLine = () => {
    const [type, setType] = React.useState(types[0]);
    const [type2, setType2] = React.useState(types2[0]);

    return (
        <div>
            <Row>
                <Col md={12} className='mb-5'>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Line Chart - 1</h6>

                        <Chart palette="Violet" dataSource={countriesInfo}>
                            <CommonSeriesSettings argumentField="country" type={type} />
                            {energySources.map((item) => (
                                <Series key={item.value} valueField={item.value} name={item.name} />
                            ))}
                            <Margin bottom={20} />
                            <ArgumentAxis valueMarginsEnabled={false} discreteAxisDivisionMode="crossLabels">
                                <Grid visible={true} />
                            </ArgumentAxis>
                            <Legend
                                verticalAlignment="bottom"
                                horizontalAlignment="center"
                                itemTextPosition="bottom"
                            />
                            <Export enabled={true} />

                            <Tooltip enabled={true} />
                        </Chart>
                    </div>
                </Col>

                <Col md={12} className='mb-5'>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Line Chart - 2</h6>

                        <Chart
                            palette="Violet"
                            dataSource={sharingStatisticsInfo}
                            title="Architecture Share Over Time (Count)"
                        >
                            <CommonSeriesSettings
                                argumentField="year"
                                type={type2}
                            />
                            <CommonAxisSettings>
                                <Grid visible={true} />
                            </CommonAxisSettings>
                            {
                                architectureSources.map((item) => <Series
                                    key={item.value}
                                    valueField={item.value}
                                    name={item.name} />)
                            }
                            <Margin bottom={20} />
                            <ArgumentAxis
                                allowDecimals={false}
                                axisDivisionFactor={60}
                            >
                                <Label>
                                    <Format type="decimal" />
                                </Label>
                            </ArgumentAxis>
                            <Legend
                                verticalAlignment="top"
                                horizontalAlignment="right"
                            />
                            <Export enabled={true} />
                            <Tooltip enabled={true} />
                        </Chart>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DevExtremeLine