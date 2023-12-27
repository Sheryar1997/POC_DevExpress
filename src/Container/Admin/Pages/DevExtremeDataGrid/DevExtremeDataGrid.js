import React, { useCallback, useState } from 'react';
import ODataStore from 'devextreme/data/odata/store';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css'; // Or any other theme
import RadioGroup, { RadioGroupTypes } from 'devextreme-react/radio-group';
import service from '../../../../Components/Data/TableRename.js';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';



import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    Export
} from 'devextreme-react/data-grid';
import DiscountCell from './DiscountCell.js';

const pageSizes = [10, 25, 50, 100];
const dataSourceOptions = {
    store: new ODataStore({
        version: 2,
        url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
        key: 'Id',
        beforeSend(request) {
            const year = new Date().getFullYear() - 1;
            request.params.startDate = `${year}-05-10`;
            request.params.endDate = `${year}-5-15`;
        },
    }),
};
const DevExtremeDataGrid = () => {
    const [collapsed, setCollapsed] = useState(true);
    const onContentReady = useCallback(
        (e) => {
            if (collapsed) {
                e.component.expandRow(['EnviroCare']);
                setCollapsed(false);
            }
        },
        [collapsed],
    );

    const onExporting = useCallback((e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            customizeCell: function (options) {
                options.excelCell.font = { name: 'Arial', size: 12 };
                options.excelCell.alignment = { horizontal: 'left' };
            }
        }).then(function () {
            workbook.xlsx.writeBuffer()
                .then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
                });
        });
    }, []);

    return (
        <DataGrid
            dataSource={dataSourceOptions}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            width="100%"
            onContentReady={onContentReady}
            onExporting={onExporting}
        >
            <Export
                enabled={true}
                fileName="DataGridExport"
                allowExportSelectedData={true}
            />
            <GroupPanel visible={true} />
            <SearchPanel
                visible={true}
                highlightCaseSensitive={true}
            />
            <Grouping autoExpandAll={false} />

            <Column
                dataField="Product"
                groupIndex={0}
            />
            <Column
                dataField="Amount"
                caption="Sale Amount"
                dataType="number"
                format="currency"
                alignment="right"
            />
            <Column
                dataField="Discount"
                caption="Discount %"
                dataType="number"
                format="percent"
                alignment="right"
                allowGrouping={false}
                cellRender={DiscountCell}
                cssClass="bullet"
            />
            <Column
                dataField="SaleDate"
                dataType="date"
            />
            <Column
                dataField="Region"
                dataType="string"
            />
            <Column
                dataField="Sector"
                dataType="string"
            />
            <Column
                dataField="Channel"
                dataType="string"
            />
            <Column
                dataField="Customer"
                dataType="string"
                width={150}
            />

            <Pager
                allowedPageSizes={pageSizes}
                showPageSizeSelector={true}
            />
            <Paging defaultPageSize={10} />
        </DataGrid>




    );

};
export default DevExtremeDataGrid;
