import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { API } from '../../../../utils/utils';
import { GlobalContext } from '../../../Layouts/Basic';
export const CorrectionsModal = ({ correction, setCorrection }) => {
    const {addNotification} = useContext(GlobalContext);

    const translateTypes = {
        expenses: 'Gastos',
        policy_payments: 'Pago de polizas',
        incomes: "Ingresos",
        payments: 'Cobranzas'
    }
    const handleSubmit = (e, data) => {
        e.preventDefault();
        Axios.post(API + '/changes', data).then(() => {
            addNotification('success',"Correccion Realizada")
            setCorrection(null);
        })
    }
    if (correction) {
        return (
            <>
            
                <Modal size='lg' show={correction} onHide={() => setCorrection(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Revertir Operacion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='correction' onSubmit={(e) => handleSubmit(e, { type:correction.type,ref:correction.row.id})}>
                            <Row>
                                <Col md={6}>
                                    <p className='mb-2'><b>Datos del registro</b></p>
                                    <ListGroup>
                                        <ListGroupItem>Tipo: {translateTypes[correction.type]}</ListGroupItem>
                                        <ListGroupItem>Fecha: {correction.row.date}</ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setCorrection(null)}>Cancelar</Button>
                        <Button form='correction' type='submit' variant="primary" >Confirmar</Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }
    else return null;

}