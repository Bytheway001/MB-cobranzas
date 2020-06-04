import React, { useEffect } from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap';
export const ExpensesList = ({ expenses }) => {
    return (
        <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
            <thead>
                <tr className='bg-info text-white'>

                    <th>Fecha</th>
                    <th>Oficina</th>
                    <th>Cta Pagadora</th>
                    <th>Cantidad</th>
                    <th>Descripcion</th>
                    <th>Categoria</th>
                    <th># Factura</th>

                </tr>

            </thead>
            <tbody>
                {expenses.map((e, k) => (
                    <tr key={k}>
                        <td>{e.date}</td>
                        <td>{e.office}</td>
                        <td>{e.account}</td>
                        <td>{e.amount}</td>
                        <td>{e.description}</td>
                        <td>{e.category}</td>
                        <td>{e.bill_number}</td>
                    </tr>
                ))}


            </tbody>
        </Table>
    )
}

export const PolicyPaymentsList = ({ payments }) => {
    return (
        <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
            <thead>

                <tr className='bg-info text-white'>

                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Aseguradora</th>
                    <th>Cta Pagadora</th>
                    <th>Moneda</th>
                    <th>Cantidad</th>
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
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export const PaymentsList = ({ payments }) => {
    return (
        <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
            <thead>
                <tr className='bg-info text-white'>
                    <th>Fecha</th>
                    <th>Cliente</th>
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
                        <td>{r.payment_date}</td>
                        <td>{r.client}</td>
                        <td>{r.collector}</td>
                        <td>{r.payment_method}</td>
                        <td>{r.account}</td>
                        <td>{r.currency}</td>
                        <td>{r.amount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
