
import React, { Fragment } from 'react'
import { Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { IncomeReceipt } from '../../../Receipts/Income';
import { PaymentReceipt } from '../../../Receipts/Payment';

export const ExpensesList = ({ expenses }) => {
    const columns = [
        { dataField: 'date', text: "Fecha", sort: true },
        { dataField: 'account', text: 'Cuenta' },
        { dataField: 'description', text: 'Descripcion' },
        { dataField: 'category', text: 'Categoria' },
        { dataField: 'bill_number', text: '# Factura' },
        { dataField: 'amount', text: 'Cantidad' },
        { dataField: 'currency', text: 'Moneda' },
        { dataField: 'office', text: 'Oficina' },
        { dataField: 'id', text: 'Descargar', formatter: (cell, row) => <PaymentReceipt data={row} user={row.user} modal={true} /> }
    ]

    return (
        <Fragment>
            <BootstrapTable striped hover bootstrap4={true} rowStyle={{ fontSize: '0.9em' }} condensed keyField='id' data={expenses} columns={columns} filter={filterFactory()} />
        </Fragment>

    )
}

export const PolicyPaymentsList = ({ payments }) => {
    return (
        <Fragment>
            <ReactHTMLTableToExcel sheet="AA" className='btn btn-primary btn-sm mb-2' table="policy_payments_list" filename="tablexls" buttonText='Descargar (xls)' />
            <Table id='policy_payments_list' style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
                <thead>

                    <tr className='bg-info text-white'>
                        <th>Ref.</th>
                        <th >Pagado En:</th>
                        <th >Registrado En:</th>
                        <th>Cliente</th>
                        <th>Aseguradora</th>
                        <th>Cta Pagadora</th>
                        <th>Moneda</th>
                        <th>Cantidad</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((e, k) => (
                        <tr key={k}>
                            <td>{e.id}</td>
                            <td>{e.payment_date}</td>
                            <td>{e.date}</td>
                            <td>{e.client}</td>
                            <td>{e.company}</td>
                            <td>{e.account}</td>
                            <td>{e.currency}</td>
                            <td>{e.amount}</td>
                            <td>{e.policy_status === 'Pagada' ? 'Pago Total' : 'Pago Parcial'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    )
}

export const PaymentsList = ({ payments }) => {
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
        <BootstrapTable striped hover rowStyle={{ fontSize: '0.8em' }} bootstrap4={true} condensed={true} classes='table-sm' keyField='id' data={payments} columns={columns} filter={filterFactory()} />
        /*
        <Fragment>
            <ReactHTMLTableToExcel className='btn btn-primary btn-sm mb-2' table="payments_list" filename="tablexls" buttonText='Descargar (xls)' />
            <Table id='payments_list' style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
                <thead>
                    <tr className='bg-info text-white'>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Aseguradora</th>
                        <th>Plan</th>
                        <th>Cobrador</th>
                        <th>Metodo de Pago</th>
                        <th>Cuenta</th>
                        <th>Moneda</th>
                        <th>Monto</th>

                    </tr>

                </thead>
                <tbody>
                    {payments.map((r, k) => (
                        <tr key={k}>
                            <th>{r.id}</th>
                            <td>{r.payment_date}</td>
                            <td>{r.client}</td>
                            <td>{r.company}</td>
                            <td>{r.plan}</td>
                            <td>{r.collector}</td>
                            <td>{r.payment_method}</td>
                            <td>{r.account_name}</td>
                            <td>{r.currency}</td>
                            <td>{r.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Fragment>
                        */


    )
}

export const IncomeList = ({ incomes }) => {
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
        <Fragment>
            <BootstrapTable striped hover bootstrap4={true} rowStyle={{ fontSize: '0.9em' }} condensed keyField='id' data={incomes} columns={columns} filter={filterFactory()} />
        </Fragment>
    )
}

