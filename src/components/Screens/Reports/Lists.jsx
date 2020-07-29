import React, { Fragment } from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CustomTable } from '../../custom/CustomTable';
export const ExpensesList = ({ expenses }) => {

    const rows = ['date','account','description','category','bill_number','amount','currency','office'];
    const headers=['Fecha','Cuenta','Desc',"Categoria",'# Factura',"Cantidad","Moneda",'Oficina']
    return (
        <Fragment>
            <ReactHTMLTableToExcel className='btn btn-primary btn-sm mb-2' table="expenses_list" filename="tablexls" buttonText='Descargar (xls)' />
            <CustomTable paginated={true} id='expenses_list' list={expenses} headers={headers} rows={rows}/>
        </Fragment>

    )
}

export const PolicyPaymentsList = ({ payments }) => {
    return (
        <Fragment>
            <ReactHTMLTableToExcel className='btn btn-primary btn-sm mb-2' table="policy_payments_list" filename="tablexls" buttonText='Descargar (xls)' />

            <Table id='policy_payments_list' style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
                <thead>

                    <tr className='bg-info text-white'>

                        <th>Fecha</th>
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
                            <td>{e.date}</td>
                            <td>{e.client}</td>
                            <td>{e.company}</td>
                            <td>{e.account}</td>
                            <td>{e.currency}</td>
                            <td>{e.amount}</td>
                            <td>{e.policy_status==='Pagada'?'Pago Total':'Pago Parcial'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    )
}

export const PaymentsList = ({ payments }) => {
    return (
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



    )
}
