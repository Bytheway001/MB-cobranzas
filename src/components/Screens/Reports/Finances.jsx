import React, { useState, Fragment, useContext } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { ExpensesList } from './Lists';
import { UserIs } from '../../../utils/utils';
import { connect } from 'react-redux';

const Finances = ({ user }) => {
    const [accounts, setAccounts] = useState([]);
    const [report, setReport] = useState(null);
    useEffect(() => {
        Axios.get(API + '/accounts').then(res => {
            setAccounts(res.data.data)
        })
        Axios.get(API + '/reports').then(res => {
            setReport(res.data)
        })
    }, [])

    return (
        <Fragment>
            <Row className='mb-2'>
                {UserIs(user, 255) &&

                    <Col sm={6} className='mb-3'>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Cuentas Bancarias</Card.Header>
                            <Card.Body>
                                <Table variant='striped' size='sm'>
                                    <thead>
                                        <tr className='bg-info text-white'>
                                            <th>Cuenta</th>
                                            <th>USD</th>
                                            <th>BOB</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            accounts.length > 0 && accounts.filter(x => x.type === 'Bank').map(account => (
                                                <tr>
                                                    <td>{account.name}</td>
                                                    <td>{account.usd}</td>
                                                    <td>{account.bob}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table></Card.Body>
                        </Card>
                    </Col>
                }
                <Col sm={6} className='mb-3'>
                    <Card className='h-100'>
                        <Card.Header className='bg-primary text-white'>Efectivo</Card.Header>
                        <Card.Body>
                            <Table variant='striped' size='sm'>
                                <thead>
                                    <tr className='bg-info text-white'>
                                        <th>Cuenta</th>
                                        <th>USD</th>
                                        <th>BOB</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        accounts.length > 0 && accounts.filter(x => x.type === 'Cash').map(account => (
                                            <tr>
                                                <td>{account.name}</td>
                                                <td>{account.usd}</td>
                                                <td>{account.bob}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card>
                        <Card.Header className='bg-primary text-white'>Cobro de Cheques</Card.Header>
                        <Card.Body>
                            {report && <ExpensesList expenses={report.expenses} />}
                        </Card.Body>
                    </Card>

                </Col>
                <Col sm={6}>
                    <Card>
                        <Card.Header className='bg-primary text-white'>Cheques</Card.Header>
                        <Card.Body>
                            {report ?
                                <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
                                    <thead>
                                        <tr className='bg-info text-white'>
                                            <th>Cliente</th>
                                            <th>Cantidad</th>
                                            <th>Status</th>
                                            <th>Cobrado en:</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                    {
                                        report.checks.map(check => (
                                            <tr>
                                                <td>{check.client}</td>
                                                <td>{check.currency} {check.amount}</td>
                                                <td>{check.status}</td>
                                                <td>{check.collected}</td>
                                            </tr>
                                        ))
                                    }
                                </Table>
                                : null
                            }
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
    
        </Fragment>

    )
}

const mapStateToProps = state => (
    { user: state.session.user }
)
export default connect(mapStateToProps, null)(Finances);