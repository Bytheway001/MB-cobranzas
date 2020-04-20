import React from 'react';
import { Row, Col, Card, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Typeahead } from 'react-bootstrap-typeahead';
export const NewClient = props => {
    const [name, setName] = useState('');
    const [agent, setAgent] = useState([])
    const [cobrador, setCobrador] = useState([])
    const [policyNumber, setPolicyNumber] = useState('')
    const [policyType, setPolicyType] = useState('')
    const [company, setCompany] = useState('')
    const [plan, setPlan] = useState([])
    const [option, setOption] = useState('')
    const [renovationDate, setRenovationDate] = useState('')
    const [effectiveDate, setEffectiveDate] = useState('')
    const [frequency, setFrequency] = useState('')
    const [prima, setPrima] = useState('')


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
                                <Typeahead id='agent' clearButton={true} size='sm' selected={agent} onChange={setAgent} options={['Agente1', 'Agente2', 'Agente3']} />

                            </FormGroup>
                            <FormGroup>
                                <label>Cobrador:</label>
                                <Typeahead id='cobrador' clearButton={true} size='sm' selected={cobrador} onChange={setCobrador} options={['Cobrador 1', 'Cobrador 2', 'Cobrador 3']} />

                            </FormGroup>
                            <Button>Crear</Button>
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
                                        <FormControl value={policyNumber} onChange={({ target }) => setPolicyNumber(target.value)} size='sm' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Aseguradora:</label>
                                        <FormControl size='sm' as='select' value={company} onChange={({ target }) => setCompany(target.value)}>
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
                                        <Typeahead
                                            id='plan'
                                            clearButton={true} size='sm'
                                            selected={plan}
                                            options={[{id:1,label:'Agent1'},{id:2,label:'agent2'}]}
                                            onChange={setPlan}
                                        />
                                      
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Tipo de Poliza:</label>
                                        <FormControl as='select' size='sm' value={policyType} onChange={({ target }) => setPolicyType(target.value)}>
                                            <option>Individual</option>
                                            <option>Familiar</option>
                                            <option>Corporativa</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Opcion:</label>
                                        <FormControl value={option} onChange={({ target }) => setOption(target.value)} size='sm' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Fecha Renovacion:</label>
                                        <DatePicker value={renovationDate} onChange={(e) => setRenovationDate(e.toLocaleDateString())} className='form-control form-control-sm date-picker' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Fecha Efectiva:</label>
                                        <DatePicker value={effectiveDate} onChange={(e) => setEffectiveDate(e.toLocaleDateString())} className='form-control form-control-sm date-picker' />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Frecuencia de Pago:</label>
                                        <FormControl value={frequency} onChange={(val) => setFrequency(val)} as='select' size='sm'>
                                            <option>Anual</option>
                                            <option>Semestral</option>
                                            <option>Mensual</option>

                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    <FormGroup>
                                        <label>Prima Total:</label>
                                        <FormControl value={prima} onChange={({ target }) => setPrima(target.value)} size='sm' />
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