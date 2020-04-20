import React, { useState } from 'react'
import { Row, Col, Card, FormCheck, Form, FormControl, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Dashboard = props => {
    const [criteria, setCriteria] = useState('')
    const [term, setTerm] = useState('')

    const changeCriteria = (value) => {
        setTerm('')
        setCriteria(value)
    }
    return (
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-light text-center'>
                        Buscar Poliza
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <FormCheck value='client' name='criteria' type='radio' label='Cliente' onChange={({ target }) => changeCriteria(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <FormControl
                                        value={criteria === 'client' ? term : ''}
                                        disabled={criteria !== 'client'}
                                        size='sm'
                                        onChange={({ target }) => setTerm(target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <FormCheck name='criteria' value='policy' type='radio' label='Numero de Poliza' onChange={({ target }) => changeCriteria(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <FormControl
                                        value={criteria === 'policy' ? term : ''}
                                        disabled={criteria !== 'policy'}
                                        size='sm'
                                        onChange={({ target }) => setTerm(target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} className='text-center'>
                                    <Button

                                        className='w-50'
                                        style={{ borderRadius: 0 }}>Buscar</Button>
                                </Col>
                            </Row>

                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={8} >
                <Card className='h-100'>
                    <Card.Header className='bg-primary text-light'>Acciones</Card.Header>
                    <Card.Body>
                        <Row className='h-100'>
                            <Col sm={3}>
                                <Button as={Link} to='/payments/new' size='lg' className='d-flex align-items-center justify-content-center h-100' variant='warning' block>Registrar Cobranza</Button>
                            </Col>
                            <Col sm={3}>
                                <Button as={Link} to='/clients/new' size='lg' className='d-flex align-items-center justify-content-center h-100' variant='info' block>Crear Cliente</Button>
                            </Col>
                        </Row>


                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} className='mt-5'>
                <Card>
                    <Card.Header className='bg-primary text-light'>Listado de Clientes</Card.Header>
                    <Card.Body>
                        <Table size='sm' style={{ fontSize: '0.8em' }}>
                            <thead>
                                <tr>
                                    <th>Numero</th>
                                    <th>Cliente</th>
                                    <th>Agente</th>
                                    <th>Cobrador</th>
                                    <th>Aseguradora</th>
                                    <th>Plan</th>
                                    <th>Opcion</th>

                                    <th>Fecha Efectiva</th>
                                    <th>Fecha Renovacion</th>
                                    <th>Frecuencia de Pago</th>
                                    <th>Ver</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>12345</td>
                                    <td>Pedro Perez</td>
                                    <td>Maria Martinez</td>
                                    <td>Jesus Jimenez</td>
                                    <td>Best Doctors</td>
                                    <td>Premir Plus</td>
                                    <td>5000</td>
                                    <td>01/01/1990</td>
                                    <td>01/01/1991</td>
                                    <td>Anual</td>
                                    <td><Button as={Link} to='/clients/profile' block size='sm'>Ver</Button></td>
                                </tr>

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
export default Dashboard