import React from 'react';
import PieChart, {
    Series, Label, Connector, Size, Export, Legend
} from 'devextreme-react/pie-chart';
import { areas } from '../../../../Components/Data/PieData';
import { countries, waterLandRatio } from '../../../../Components/Data/PieData2';
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

const pieCharts = [
    {
        title: 'Area of Countries',
        palette: 'Soft',
        dataSource: countries,
    },
    {
        title: 'Water/Land Ratio',
        palette: 'Soft Pastel',
        dataSource: waterLandRatio,
    },
];

const DevExtremePie = () => {
    const pies = pieCharts.map((options, i) => (
        <PieChart
            className="pie"
            key={i}
            title={options.title}
            palette={options.palette}
            sizeGroup="piesGroup"
            dataSource={options.dataSource}
        >
            <Series
                argumentField="name"
                valueField="area"
            >
                <Label
                    visible={true}
                    format="percent"
                />
            </Series>
            <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="right"
                rowCount={2}
            />
        </PieChart>
    ));

    return (
        <div>
            <Row>
                <Col md={12} className='mb-5'>
                    <div className='graph_box'>
                        <h6 style={{ width: "fit-content", margin: "10px 0" }}>Pie Chart - 1</h6>

                        <PieChart
                            id="pie"
                            dataSource={areas}
                            palette="Bright"
                            title="Area of Countries"
                            onPointClick={pointClickHandler}
                            onLegendClick={legendClickHandler}
                        >
                            <Series
                                argumentField="country"
                                valueField="area"
                            >
                                <Label visible={true}>
                                    <Connector
                                        visible={true}
                                        width={1}
                                    />
                                </Label>
                            </Series>

                            <Size width={500} />
                            <Export enabled={true} />
                        </PieChart>
                    </div>
                </Col>

                <Col md={12}>
                    <div className='graph_box'>
                    <h6 style={{ width: "fit-content", margin: "10px 0" }}>Pie Chart - 2</h6>
                        <div className="pies-container">{pies}</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DevExtremePie