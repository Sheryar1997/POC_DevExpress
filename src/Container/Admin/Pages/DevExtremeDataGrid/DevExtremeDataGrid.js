import React, { useState, useRef, useCallback, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  SelectionState,
  IntegratedSelection,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  TableSummaryRow,
  TableSelection,
  DragDropProvider,
  Toolbar,
  ExportPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from '@mui/material';
import saveAs from 'file-saver';
import axios from 'axios';

const DateFormatter = ({ value }) => (
  <span>
    {new Date(value).toLocaleDateString()}
  </span>
);

const DateTypeProvider = props => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};

const columns = [
  { name: 'Employee', title: 'Employee' },
  { name: 'OrderNumber', title: 'Invoice Number' },
  { name: 'OrderDate', title: 'Order Date' },
  { name: 'CustomerStoreCity', title: 'City' },
  { name: 'CustomerStoreState', title: 'State' },
  { name: 'SaleAmount', title: 'Sale Amount' },
];

const dateColumns = ['OrderDate'];
const groupSummaryItems = [
  { columnName: 'OrderNumber', type: 'count' },
  { columnName: 'SaleAmount', type: 'max' },
];
const totalSummaryItems = [
  { columnName: 'OrderNumber', type: 'count' },
  { columnName: 'SaleAmount', type: 'sum' },
];
const defaultExpandedGroups = ['Todd Hoffman'];

const DevExtremeDataGrid = () => {
  const [orders, setOrders] = useState([]);
  const [grouping, setGrouping] = useState([
    { columnName: 'Employee' }, { columnName: 'CustomerStoreCity' },
  ]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);
  const [groupingCriteria, setGroupingCriteria] = useState();
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    axios.get('https://poc-dev-server.vercel.app/dataTable')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  const handleGroupingChange = (event) => {
    setGroupingCriteria(event.target.value);
    setGrouping([{ columnName: event.target.value }]);
  };

  useEffect(() => {
    let newFilteredOrders = orders;

    if (employeeFilter) {
      newFilteredOrders = newFilteredOrders.filter(order => order.Employee === employeeFilter);
    }

    if (cityFilter) {
      newFilteredOrders = newFilteredOrders.filter(order => order.CustomerStoreCity === cityFilter);
    }

    setFilteredOrders(newFilteredOrders);
  }, [employeeFilter, cityFilter, orders]);

  const uniqueEmployees = Array.from(new Set(orders.map(order => order.Employee)));
  const relevantCities = employeeFilter
    ? Array.from(new Set(orders.filter(order => order.Employee === employeeFilter).map(order => order.CustomerStoreCity)))
    : Array.from(new Set(orders.map(order => order.CustomerStoreCity)));

  return (
    <Paper>
      <div style={{ padding: 16 }}>
        {/* <h5>Filtering</h5> */}
        <FormLabel component="legend">Filter By</FormLabel>
        <FormControl style={{ minWidth: 120, marginRight: 16 }}>

          <InputLabel></InputLabel>
          <Select
            value={employeeFilter}
            onChange={(event) => {
              setEmployeeFilter(event.target.value);
              setCityFilter(''); // Reset city filter when employee changes
            }}
            displayEmpty
          >
            <MenuItem value="">
              <em>All Employees</em>
            </MenuItem>
            {uniqueEmployees.map(employee => (
              <MenuItem key={employee} value={employee}>
                {employee}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={{ minWidth: 120 }}>
          <InputLabel></InputLabel>
          <Select
            value={cityFilter}
            onChange={(event) => setCityFilter(event.target.value)}
            displayEmpty// Disable if no employee is selected
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {relevantCities.map(city => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ padding: 16 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Group By</FormLabel>
          <RadioGroup
            row
            name="grouping"
            value={groupingCriteria}
            onChange={handleGroupingChange}
          >
            <FormControlLabel value="Employee" control={<Radio />} label="Employee" />
            <FormControlLabel value="CustomerStoreCity" control={<Radio />} label="City" />
            {/* <FormControlLabel value="" control={<Radio />} label="None" /> */}
          </RadioGroup>
        </FormControl>
      </div>
      <Grid
        rows={filteredOrders} // Use filtered data
        columns={columns}
      >
        <DragDropProvider />
        <DateTypeProvider for={dateColumns} />
        <GroupingState
          defaultExpandedGroups={defaultExpandedGroups}
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
        <SummaryState
          totalItems={totalSummaryItems}
          groupItems={groupSummaryItems}
        />
        <SelectionState selection={selection} onSelectionChange={setSelection} />
        <IntegratedGrouping />
        <IntegratedSummary />
        <IntegratedSelection />
        <Table />
        <TableHeaderRow />
        <TableSelection />
        <TableGroupRow />
        <TableSummaryRow />
        <Toolbar />
        <GroupingPanel />
        <ExportPanel startExport={startExport} />
      </Grid>

      <GridExporter
        ref={exporterRef}
        rows={orders}
        columns={columns}
        grouping={grouping}
        totalSummaryItems={totalSummaryItems}
        groupSummaryItems={groupSummaryItems}
        selection={selection}
        onSave={onSave}
      />
    </Paper>
  );
};

export default DevExtremeDataGrid;
