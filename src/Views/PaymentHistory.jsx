import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
const PaymentHistory = () => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Button block size='sm' onClick={() => setShow(true)}>Historial de Pagos</Button>
            <Modal show={show} onHide={() => setShow(false)} size='lg'>
                <Modal.Header closeButton>Historial de Pagos</Modal.Header>
                <Modal.Body>
                    <Table size='sm'>
                        <thead>
                            <th>Fecha</th>
                            <th>Metodo</th>
                            <th>Cantidad</th>
                            <th>Comentario</th>
                        </thead>
                    </Table>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default PaymentHistory;