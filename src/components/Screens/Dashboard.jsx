import React, { useState } from 'react'
import { Row, Col, Card, FormCheck, Form, FormControl, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getClientList } from '../../ducks/clients'
import { connect } from 'react-redux';
import { DashboardList } from '../custom/Lists/DashboardClients';
import { LoaderButton } from '../custom/LoaderButton';
const Dashboard = ({ getClientList, clients }) => {
    const [criteria, setCriteria] = useState('')
    const [term, setTerm] = useState('')
    useState(() => {
        getClientList()
    }, [])
    const changeCriteria = (value) => {
        setTerm('')
        setCriteria(value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        getClientList({criteria,term})
    }
    return (
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-light text-center'>
                        Buscar Poliza
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <FormCheck value='client' name='criteria' type='radio' label='Cliente' onChange={({ target }) => changeCriteria(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <FormControl value={criteria === 'client' ? term : ''} disabled={criteria !== 'client'} size='sm' onChange={({ target }) => setTerm(target.value)}/>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <FormCheck name='criteria' value='policy' type='radio' label='Numero de Poliza' onChange={({ target }) => changeCriteria(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <FormControl value={criteria === 'policy' ? term : ''} disabled={criteria !== 'policy'} size='sm' onChange={({ target }) => setTerm(target.value)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} className='text-center'>
                                    <LoaderButton type='submit' loading={false} className='w-50' style={{ borderRadius: 0 }}>Buscar</LoaderButton>
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
                       <DashboardList list={clients.list}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    clients: state.clients
})

const mapDispatchToProps = dispatch => ({
    getClientList: (search) => dispatch(getClientList(search))
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)