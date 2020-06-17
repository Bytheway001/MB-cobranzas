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
import { ActionBar } from './ActionBar';

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
                <ActionBar user={user} />
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