import React from 'react';
import {
  Chart,
  Series,
  Legend,
  ValueAxis,
  Point,
  Border,
  CommonPaneSettings,
  Tooltip,
  ArgumentAxis,
  Grid,
  Label,
  Export,
} from 'devextreme-react/chart';
import axios from 'axios';

export default function DevExtremeScatterChart() {
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://poc-dev-server.vercel.app/pieChart');
        setDataSource(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  } , []);

  return (
    <Chart
      id="chart"
      title="Scatter Chart"
      dataSource={dataSource}
      // customizePoint={customizePoint}
    >
      <ArgumentAxis>
        <Label
          rotationAngle={20}
          overlappingBehavior="rotate"
        />
        <Grid visible={true} />
      </ArgumentAxis>
      <CommonPaneSettings>
        <Border visible={true} />
      </CommonPaneSettings>
      <Series
        argumentField="country"
        valueField="area"
        type="scatter"
      >
        <Point size={20} />
      </Series>
      <Tooltip enabled={true} />
      <ValueAxis
        type="logarithmic"
        title="Mass realtive to UK"
      />
      <Legend visible={false} />
      <Export enabled={true} />
    </Chart>
  );
}
