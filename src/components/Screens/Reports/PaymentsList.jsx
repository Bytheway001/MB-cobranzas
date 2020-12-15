import React from 'react';
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup } from "react-bootstrap";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import BootstrapTable from 'react-bootstrap-table-next';
import {  methods } from '../../../utils/utils';
import filterFactory from 'react-bootstrap-table2-filter';

const columnStyles = {
    id: { width: 30 },
    payment_date: { width: 80 },
    account: { width: 150 },
    amount: { width: 100 },
    currency: { width: '5%' }

}


export const PaymentsList = ({ payments, setCorrection }) => {
    const { ExportCSVButton } = CSVExport;
    const columns = [
        { dataField: 'id', text: 'Ref', sort: true, headerStyle: columnStyles.id },
        { dataField: 'payment_date', text: 'Fecha', headerStyle: columnStyles.payment_date },
        { dataField: 'policy.client.first_name', text: 'Cliente' },
        { dataField: 'account.name', text: "Cuenta", csvFormatter: (cell) => cell || '--', headerStyle: columnStyles.account },
        { dataField: 'policy.plan.company.name', text: 'Aseguradora' },
        { dataField: 'policy.plan.name', text: 'Plan' },
        { dataField: 'payment_method', text: 'Metodo de Pago', formatter: (cell) => methods[cell], csvFormatter: (cell) => methods[cell] },
        { dataField: 'currency', text: 'Moneda', headerStyle: columnStyles.currency },
        { dataField: 'amount', text: 'Cantidad', csvType: Number, headerStyle: columnStyles.amount, csvFormatter: (cell) => parseFloat(cell).toFixed(2) },
        {
            dataField: 'download', text: 'Acc.', formatter: (cell, row) => (
                <>
                    {!row.corrected_with &&
                        <ButtonGroup size='sm'>
                            <Button size='sm' onClick={() => setCorrection({ type: 'payments', row: row, user_id: row.user_id, user: row.user })} >
                                <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faBan} color='red' size='md' />
                            </Button>
                        </ButtonGroup>
                    }
                </>
            ), csvExport: false, headerStyle: { width: 60 }
        },
    ]
    return (
        <ToolkitProvider keyField='id'
            data={payments}
            columns={columns}
            exportCSV={{
                fileName: 'Reporte de Cobranzas.csv',
                noAutoBOM: false,
                exportAll: false,
                onlyExportFiltered: true,
                separator: ";"
            }}
        >
            {
                props => {
                    return (
                        <>
                            <ExportCSVButton className='btn btn-primary btn-sm my-2' {...props.csvProps}>Descargar CSV!!</ExportCSVButton>
                            <BootstrapTable  {...props.baseProps} rowClasses={(row)=>rowClassName(row)} striped hover bootstrap4={true} rowStyle={{ fontSize: '1em' }} condensed filter={filterFactory()} />
                        </>
                    )

                }
            }

        </ToolkitProvider>

    )
}

const rowClassName=(row)=>{
    let className="";
    if(row.corrected_with){
        className+='bg-danger text-white'
    }
    
    return className;
}