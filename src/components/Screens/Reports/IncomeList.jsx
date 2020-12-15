
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { listOf } from '../../../utils/utils';
import {IncomeReceipt} from '../../../Receipts/Income'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
export const IncomeList = ({ incomes, setCorrection }) => {
    const currencies = listOf(incomes, 'currency');
    const categories = listOf(incomes, 'category.name')
    const { ExportCSVButton } = CSVExport;

    const columns = [
        { dataField: 'id', text: 'Ref', sort: true,headerStyle: { width: 50 } },
        { dataField: 'date', headerStyle: { width: 100 },text: 'Fecha', sort: true },
        { dataField: 'account.name',headerStyle: { width: 150 }, text: 'Cuenta.', sort: true, filter: selectFilter({ options: listOf(incomes, 'account.name'), className: 'form-control form-control-sm', placeholder: 'Todas' }) },
        { dataField: 'description', text: "Desc." },
        { dataField: 'category.name', text: "Categoria", filter: selectFilter({ options: categories, className: 'form-control form-control-sm', placeholder: 'Todas' }) },
        { dataField: 'amount', text: 'Cant.', csvType: Number,csvFormatter:(cell)=>parseFloat(cell).toFixed(2) },
        { dataField: 'currency', text: 'Moneda', filter: selectFilter({ options: currencies, className: 'form-control form-control-sm', placeholder: 'Todas' }) },
        {
            dataField: 'download', text: '>', formatter: (cell, row) => (
                <>
                    {!row.corrected_with &&
                        <ButtonGroup size='sm'>
                            <IncomeReceipt data={row} user={row.user} modal={true} />
                            <Button size='sm' onClick={() => setCorrection({ type: 'incomes', row: row, user_id: row.user_id, user: row.user })} >
                                <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faBan} color='red'  />
                            </Button>
                        </ButtonGroup>
                    }
                </>
            ), csvExport: false, headerStyle: { width: 80 }
        }

    ]

    return (
        <ToolkitProvider keyField='id' data={incomes} columns={columns} exportCSV={{
            fileName: 'Reporte de Ingresos.csv',
            noAutoBOM: false,
            exportAll: false,
            onlyExportFiltered: true,
            separator: ';'
        }} >
            {
                props => {
                    return (
                        <>
                            <ExportCSVButton className='btn btn-primary btn-sm my-2' {...props.csvProps}>Descargar CSV!!</ExportCSVButton>
                            <BootstrapTable {...props.baseProps} striped hover bootstrap4={true} rowStyle={{ fontSize: '0.9em' }} condensed filter={filterFactory()} />
                        </>
                    )

                }
            }

        </ToolkitProvider>
    )
}
