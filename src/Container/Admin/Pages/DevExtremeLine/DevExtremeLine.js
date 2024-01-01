import React, { useEffect } from 'react';
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
import { architectureSources, sharingStatisticsInfo } from '../../../../Components/Data/LineData2';
import axios from 'axios';

import './DevExtremeLine.css';
import { Col, Row } from 'react-bootstrap';

const types2 = ['spline', 'stackedspline', 'fullstackedspline'];
const types = ['line', 'stackedline', 'fullstackedline'];
// const seriesTypeLabel = { 'aria-label': 'Series Type' };


const DevExtremeLine = ({ seriesVisibility, toggleSeriesVisibility, startDate, endDate }) => {
    const [type, setType] = React.useState(types[0]);
    const [type2, setType2] = React.useState(types2[0]);

    const [countriesInfo, setCountriesInfo] = React.useState([]);
    const [energySources, setEnergySources] = React.useState([]);

    function legendClickHandler(e) {
        // if toggleSeriesVisibility is not a function, then return
        if (typeof toggleSeriesVisibility !== "function"){
            // hide the series
            e.target.isVisible() ? e.target.hide() : e.target.show();
        } else {
            toggleSeriesVisibility(e.target.name)
        }
    }

    useEffect(() => {
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

                setCountriesInfo(data);
                setEnergySources(response.data.sources);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return (
        <div>
            <Row>
                <Col md={12} className='mb-2'>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" , position:'absolute' }}>Line Chart</h6>

                        <Chart
                            palette="Violet"
                            dataSource={countriesInfo}
                            onLegendClick={legendClickHandler}
                            >
                            <CommonSeriesSettings argumentField="country" type={type} />
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
                            {/* {energySources.map((item) => (
                                <Series key={item.value} valueField={item.value} name={item.name} />
                            ))} */}
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

                {/* <Col md={12} className='mb-5'>
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
                </Col> */}
            </Row>
        </div>
    )
}

export default DevExtremeLine