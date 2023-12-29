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


function DevExtremeStack({ seriesVisibility, toggleSeriesVisibility, startDate, endDate }) {
  const [dataSource, setDataSource] = React.useState([]);

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

        setDataSource(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

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
