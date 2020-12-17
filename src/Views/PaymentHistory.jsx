import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { API, formatMoney } from '../utils/utils';
const PaymentHistory = ({ policy }) => {
    const [show, setShow] = useState(false)
    const [payments, setPayments] = useState([])
    useEffect(() => {
        if (show) {
            Axios.get(`${API}/policies/${policy}/payments`).then(res => {
                setPayments(res.data.data)
            })
        }

    }, [show])

    return (
        <>
            <Button block size='sm' onClick={() => setShow(true)}>Historial de Pagos</Button>
            <Modal show={show} onHide={() => setShow(false)} size='xl'>
                <Modal.Header closeButton>Historial de Pagos</Modal.Header>
                <Modal.Body>
                    <Table size='sm'>
                        <thead>
                            <th>#Ref</th>
                            <th>Fecha</th>
                            <th>Metodo</th>
                            <th>Cantidad</th>
                            <th>Comentario</th>
                        </thead>
                        <tbody>
                            {payments.map((payment, key) => (
                                <tr key={key}>
                                    <td>{payment.id}</td>
                                    <td>{payment.payment_date}</td>
                                    <td>{payment.payment_method}</td>
                                    <td>{formatMoney(payment.amount,'2','.',',',payment.currency==='USD'?'$':"Bs.")} </td>
                                    <td>{payment.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default PaymentHistory;