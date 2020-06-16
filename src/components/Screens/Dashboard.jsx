import React, { useState } from 'react'
import { Row, Col, Card, FormCheck, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getClientList } from '../../ducks/clients'
import { connect } from 'react-redux';
import { DashboardList } from '../custom/Lists/DashboardClients';
import { LoaderButton } from '../custom/LoaderButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBillWaveAlt, faExternalLinkSquareAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { LoadingCard } from '../custom/LoadingCard';
import { UserIs } from '../../utils/utils';
const Dashboard = ({ getClientList, clients, user }) => {
    const [criteria, setCriteria] = useState('')
    const [term, setTerm] = useState('')

    useState(() => {
        getClientList()
    }, [])
    const changeCriteria = (value) => {
        setTerm('')
        setCriteria(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        getClientList({ criteria, term })
    }
    return (
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-light text-center'>Buscar Poliza</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <FormCheck value='client' name='criteria' type='radio' label='Cliente' onChange={({ target }) => changeCriteria(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <FormControl value={criteria === 'client' ? term : ''} disabled={criteria !== 'client'} size='sm' onChange={({ target }) => setTerm(target.value)} />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col sm={6}>
                                    <FormCheck name='criteria' value='policy' type='radio' label='Numero de Poliza' onChange={({ target }) => changeCriteria(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <FormControl value={criteria === 'policy' ? term : ''} disabled={criteria !== 'policy'} size='sm' onChange={({ target }) => setTerm(target.value)} />
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
                            {UserIs(user, 224) &&
                                <Col sm={3}>
                                    <Button as={Link} to='/payments/new' size='lg' className='d-flex align-items-center justify-content-center h-100' block>
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <FontAwesomeIcon icon={faMoneyBillWaveAlt} className='mr-2 d-block' size='2x' />

                                            <span>Registrar Cobranza</span>

                                        </div>
                                    </Button>
                                </Col>
                            }

                            <Col sm={3}>
                                <Button as={Link} to='/clients/new' size='lg' className='d-flex align-items-center justify-content-center h-100' block>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <FontAwesomeIcon icon={faUser} className='mr-2 d-block' size='2x' />
                                        <span>Crear Cliente</span>
                                    </div></Button>
                            </Col>
                            {
                                UserIs(user, 248) &&
                                <Col sm={3}>
                                    <Button as={Link} to='/expenses/new' size='lg' className='d-flex align-items-center justify-content-center h-100' variant='primary' block>
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <FontAwesomeIcon icon={faExternalLinkSquareAlt} className='mr-2 d-block' size='2x' />
                                            <span>Registrar Egreso</span>
                                        </div>
                                    </Button>
                                </Col>

                            }

                        </Row>


                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} className='mt-5'>
                <Card>
                    <Card.Header className='bg-primary text-light'>Listado de Clientes</Card.Header>
                    <Card.Body style={{ minHeight: '50vh' }}>
                        {
                            clients.loading ?

                                <LoadingCard />
                                :
                                <DashboardList list={clients.list} />

                        }

                    </Card.Body>
                </Card>
            </Col>
        </Row >
    )
}

const mapStateToProps = state => ({
    clients: state.clients,
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    getClientList: (search) => dispatch(getClientList(search))
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)