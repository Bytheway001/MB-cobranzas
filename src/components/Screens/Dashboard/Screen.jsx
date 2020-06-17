import React, { useState } from 'react'
import { Row, Col, Card, FormCheck, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMoneyBillWaveAlt, faExternalLinkSquareAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { LoadingCard, LoaderButton, DashboardList } from '../../custom';
import { getClientList } from '../../../ducks/clients';
import { UserIs } from '../../../utils/utils';
import { Criteria } from './Criteria';

const Dashboard = ({ getClientList, clients, user }) => {
    const [criteria, setCriteria] = useState('')
    const [term, setTerm] = useState('')
    useState(() => {
        getClientList()
    }, [])

    const changeCriteria = (value) => {
        setTerm('');
        setCriteria(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        getClientList({ criteria, term })
    }

    
    return (
        <Row>
            <Col sm={4}>
                <Criteria 
                    onSubmit={handleSubmit} 
                    changeCriteria={changeCriteria}
                    term={term}
                    criteria={criteria}
                    setTerm={setTerm}
                    loading={clients.loading}
                />
                
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