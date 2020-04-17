import React from 'react';
import { Row, Col, Card, Form, FormGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export const NewClient = props => {
    const [name, setName] = useState('');
    const [date,setDate]= useState('')
    console.log(date)
    const showDate=(date)=>{
        console.log(date)
    }
    return (
        <Form>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header className='bg-primary text-light' >Datos del Usuario</Card.Header>
                        <Card.Body>
                            <FormGroup>
                                <label>Nombre y Apellido:</label>
                                <FormControl value={name} size='sm' onChange={({ target }) => setName(target.value)} />
                                <p>{name.length > 7 ? 'El nombre no puede tener mas de 7 caracteres' : ''}</p>
                            </FormGroup>
                            <FormGroup>
                                <label>Agente:</label>
                                <FormControl size='sm' />
                            </FormGroup>
                            <FormGroup>
                                <label>Cobrador:</label>
                                <FormControl size='sm' />
                            </FormGroup>

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header className='bg-primary text-light' >Datos de la Poliza</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Numero de Poliza:</label>
                                        <FormControl size='sm' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Aseguradora:</label>
                                        <FormControl size='sm' as='select'>
                                            <option>Best Doctors</option>
                                            <option>Vumi Group</option>
                                            <option>Bupa Salud</option>
                                            <option>Allianz Care</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Plan:</label>
                                        <FormControl size='sm' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Tipo de Poliza:</label>
                                        <FormControl as='select' size='sm'>
                                            <option>Individual</option>
                                            <option>Familiar</option>
                                            <option>Corporativa</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Opcion:</label>
                                        <FormControl size='sm' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Fecha Renovacion:</label>
                                        <DatePicker className='form-control form-control-sm date-picker' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Fecha Efectiva:</label>
                                        <DatePicker value={date} className='form-control form-control-sm date-picker' onChange={(e)=>setDate(e.toLocaleDateString())} />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Frecuencia de Pago:</label>
                                        <FormControl size='sm' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Prima Total:</label>
                                        <FormControl size='sm' />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Form>
    )
}