import React from 'react'
import './Dashboard.css';
import Select from 'react-select';
import { dashboardColorStyles } from '../../../../Util/Helper.js';
import { Col, Row } from 'react-bootstrap';
import {
  Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
  const tableHead = ["S.No", "Pallet Number", "Current Location", "Warehouse", "Action", "Status"]

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const pieData = {
    labels: ['Idle 56%', 'Utilized 44%'],
    datasets: [
      {
        label: '',
        data: [56, 44],
        backgroundColor: [
          '#57B894',
          '#F2F2F2',
        ],
      },
    ],
  };

  const capacityData = {
    labels: ['55% Used Capacity', '45% Total Capacity'],
    datasets: [
      {
        label: '',
        data: [55, 45],
        backgroundColor: [
          '#E64646',
          '#00A3FF',
        ],
        borderWidth: 1,
      },
    ],
  };

  const overviewOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  const labels = ['Sep1', 'Sep2', 'Sep3', 'Sep4', 'Sep5', 'Sep6', 'Sep7', 'Sep8'];

  const overviewData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Overview',
        data: [4, 6, 9, 5, 3, 5, 1, 8],
        borderColor: '#A9C23F',
        backgroundColor: '#a9c23f4a',
      },
    ],
  };

  const warehouseOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  const warehouseLabels = ['Sadiqabad', 'Agility', 'Port Qasim', 'Rawalpindi', 'Qasimabad', 'Murree'];

  const warehouseData = {
    labels: warehouseLabels,
    datasets: [
      {
        label: '',
        data: [50, 75, 30, 60, 75, 60],
        backgroundColor: [
          '#57B894',
          '#F97850',
          '#7B8DBF',
          '#DF72B6',
          '#97D343',
          '#DCAC36',
        ],
      },
    ],
  };

  // ---

  const locOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
      scales: {
        y: {
          ticks: {
            values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            // Add your custom Y-axis scale values here
            stepSize: 10, // You can specify the interval between custom values
            callback: function (value) {
              return value; // Customize the label format here if needed
            },
          },
        },
      },
    },
  };

  const locLabels = ['Total Capacity', 'Utilized', 'Idle'];

  const locData = {
    labels: locLabels,
    datasets: [
      {
        label: '',
        data: [75, 50, 25],
        backgroundColor: [
          '#E64646',
          '#77CEFF',
          '#329932',
        ],
      },
    ],
  };

  return (
    <div>

      <div className='dashboard_head'>
        <h5>Dashboard</h5>
      </div>

      <div className='graph_view'>
        <Row style={{ height: "100%", gap: "20px 0", marginBottom: "20px" }}>
          <Col md={6}>
            <div className='graph_box'>
              <div style={{justifyContent: "space-between"}}>
                <h6>Line Chart</h6>
                <Select options={options} placeholder="Filter Line Chart" styles={dashboardColorStyles} />
              </div>

              <div className='line_chart'>
                <Line options={overviewOptions} data={overviewData} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className='graph_box'>
              <div style={{justifyContent: "space-between"}}>
                <h6>Bar Chart</h6>
                <Select options={options} placeholder="Filter Bar Chart" styles={dashboardColorStyles} />
              </div>

              <div className='bar_chart'>
                <Bar options={locOptions} data={locData} />
              </div>
            </div>
          </Col>
          <Col md={6} sm={6}>
            <div className='graph_box'>
              <div style={{justifyContent: "space-between"}}>
                <h6>Pie Chart</h6>
                <Select options={options} placeholder="Filter Pie Chart" styles={dashboardColorStyles} />
              </div>

              <div className='pie_chart'>
                <Pie data={pieData} />
              </div>
            </div>
          </Col>
          <Col md={6} sm={6}>
            <div className='graph_box'>
              <div style={{justifyContent: "space-between"}}>
                <h6>Doughnut Chart</h6>
                <Select options={options} placeholder="Filter Doughnut Chart" styles={dashboardColorStyles} />
              </div>

              <div className='donut_chart'>
                <Doughnut data={capacityData} />
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className='graph_box'>
              <h6 style={{ width: "fit-content", margin: "10px 0" }}>Bar Chart</h6>

              <Bar options={warehouseOptions} data={warehouseData} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Dashboard