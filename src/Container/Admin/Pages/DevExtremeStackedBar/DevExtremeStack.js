import React from 'react';
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  Title,
  Export,
  Tooltip,
} from 'devextreme-react/chart';
import service from './data.js';
import axios from 'axios';

const dataSource = service.getMaleAgeData();
function customizeTooltip(arg) {
  return {
    text: `${arg.seriesName} years: ${arg.valueText}`,
  };
}

function legendClickHandler(e) {
  e.target.isVisible() ? e.target.hide() : e.target.show();
}

function DevExtremeStack() {
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://poc-dev-server.vercel.app/lineChart');
        setDataSource(response.data.lineChart);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  } , []);

  return (
    <Chart
      id="chart"
      title="Stack Bar Chart"
      dataSource={dataSource}
      onLegendClick={legendClickHandler}

    >
      <CommonSeriesSettings
        argumentField="country"
        type="stackedbar"
      />
      <Series
        valueField="hydro"
        name="Hydro"
      />
      <Series
        valueField="oil"
        name="Oil"
      />
      <Series
        valueField="gas"
        name="Natural gas"
      />
      <ValueAxis position="right">
        <Title text="millions" />
      </ValueAxis>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="top"
      />
      <Export enabled={true} />
      <Tooltip
        enabled={true}
        location="edge"
        customizeTooltip={customizeTooltip}
      />
    </Chart>
  );
}
export default DevExtremeStack;
