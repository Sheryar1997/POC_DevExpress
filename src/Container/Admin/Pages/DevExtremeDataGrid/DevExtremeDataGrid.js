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
  Radio,
  RadioGroup
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
const defaultExpandedGroups = ['Todd Hoffman', 'Todd Hoffman|Denver', 'Todd Hoffman|Casper'];

const DevExtremeDataGrid = () => {
  const [orders, setOrders] = useState([]);
  const [grouping, setGrouping] = useState([
    { columnName: 'Employee' }, { columnName: 'CustomerStoreCity' },
  ]);
  const [selection, setSelection] = useState([]);
  const exporterRef = useRef(null);
  const [groupingCriteria, setGroupingCriteria] = useState('Employee');

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

  return (
    <Paper>
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
        </RadioGroup>
      </FormControl>

      <Grid
        rows={orders}
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
