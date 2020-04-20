import React from 'react'
import { Row, Col, Card, FormControl, FormGroup, Form, Button } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'

export const NewPayment = props =>{
    return(
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-light' >Registro de Cobranza</Card.Header>
                    <Card.Body>
                        <Form>
                            <FormGroup>
                                <label>Cliente:</label>
                                <FormControl as='select'>
                                    <option>Cliente1</option>
                                    <option>Cliente2</option>
                                    <option>Cliente3</option>
                                    <option>Cliente4</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Cuenta Receptora:</label>
                                <FormControl as='select'>
                                    <option>Caja</option>
                                    <option>BNB</option>
                                    <option>BNC</option>
                                    <option>Banco Union</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Numero de Transaccion</label>
                                <FormControl/>
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha de Transaccion</label>
                                <ReactDatePicker className='form-control  date-picker'/>
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha de Transaccion</label>
                                <FormControl as='textarea'/>
                            </FormGroup>
                            <Button block>Registrar Pago</Button>
                        </Form>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
            
    )
}