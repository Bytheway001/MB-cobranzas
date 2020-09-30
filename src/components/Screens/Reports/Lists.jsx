
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { IncomeReceipt } from '../../../Receipts/Income';
import { PaymentReceipt } from '../../../Receipts/Payment';

export const ExpensesList = ({ expenses }) => {
    const listOf = (property) => {
        return [...new Set(expenses.map(e => (e[property])))].map(x => ({ value: x, label: x }))
    }
    const accounts = listOf('account');
    const categories = listOf('category');
    const currencies = listOf('currency');
    const { ExportCSVButton } = CSVExport;

    const columns = [
        { dataField: 'id', text: 'Ref', sort: true },
        { dataField: 'date', text: "Fecha", sort: true },
        { dataField: 'account', text: 'Cuenta', sort: true, filter: selectFilter({ options: accounts, className: 'form-control-sm', placeholder: 'Todas' }) },
        { dataField: 'description', text: 'Descripcion' },
        { dataField: 'category', text: 'Categoria', filter: selectFilter({ options: categories, className: 'form-control form-control-sm', placeholder: 'Todas' }) },
        { dataField: 'bill_number', text: '# Factura' },
        { dataField: 'amount', text: 'Cantidad' },
        { dataField: 'currency', text: 'Moneda', sort: true, filter: selectFilter({ options: currencies, className: 'form-control form-control-sm', placeholder: 'Todas' }) },
        { dataField: 'office', text: 'Oficina' },
        { dataField: 'download', text: 'Descargar', formatter: (cell, row) => <PaymentReceipt data={row} user={row.user} modal={true} /> }
    ]

    return (
        <ToolkitProvider keyField='id' data={expenses} columns={columns} exportCSV >
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

export const PolicyPaymentsList = ({ payments }) => {
    const { ExportCSVButton } = CSVExport;
    const columns=[
        {dataField:'id',text:'Ref'},
        {dataField:'payment_date',text:"Fecha de pago"},
        {dataField:'client',text:"Cliente"},
        {dataField:'company',text:'Aseguradora'},
        {dataField:'amount',text:'Cantidad'},
        {dataField:'currency',text:'Moneda'},
        {dataField:'status',text:'Status'}
       
    ]
    return (
        <ToolkitProvider keyField='id' data={payments} columns={columns} exportCSV >
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

export const PaymentsList = ({ payments }) => {
    const { ExportCSVButton } = CSVExport;
    const columns = [
        { dataField: 'id', text: 'Ref', sort: true },
        { dataField: 'payment_date', text: 'Fecha' },
        { dataField: 'client', text: 'Cliente' },
        { dataField: 'account_name', text: "Cuenta" },
        { dataField: 'company', text: 'Aseguradora' },
        { dataField: 'plan', text: 'Plan' },
        { dataField: 'collector', text: 'Cobrador' },
        { dataField: 'payment_method', text: 'Metodo de Pago' },
        { dataField: 'amount', text: 'Cantidad' },
        { dataField: 'currency', text: 'Moneda' }
    ]
    return (
        <ToolkitProvider keyField='id' data={payments} columns={columns} exportCSV >
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

export const IncomeList = ({ incomes }) => {
    const { ExportCSVButton } = CSVExport;
    const columns = [
        { dataField: 'id', text: 'Ref', sort: true },
        { dataField: 'date', text: 'Fecha', sort: true },
        {
            dataField: 'account',
            text: 'Cuenta.',
            sort: true,
        },
        { dataField: 'description', text: "Desc." },
        { dataField: 'amount', text: 'Cant.' },
        { dataField: 'currency', text: 'Moneda' },

        { dataField: 'any', text: 'Descargar', formatter: (cell, row) => <IncomeReceipt data={row} user={row.user} modal={true} /> }
    ]

    return (
        <ToolkitProvider keyField='id' data={incomes} columns={columns} exportCSV >
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

