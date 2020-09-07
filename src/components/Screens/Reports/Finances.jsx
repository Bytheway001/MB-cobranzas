import React, { useState, Fragment, useContext } from 'react';
import { Row, Col, Table, Card, Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { useEffect } from 'react';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { ExpensesList, IncomeList, PaymentsList, PolicyPaymentsList } from './Lists';
import { UserIs, formatMoney } from '../../../utils/utils';
import { connect } from 'react-redux';
import { Extracto } from './components/Extracto';


const Finances = ({ user }) => {
    const [accounts, setAccounts] = useState([]);
    const [report, setReport] = useState(null);
    const [modalshow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    useEffect(() => {
        Axios.get(API + '/accounts').then(res => {
            setAccounts(res.data.data)
        })
        Axios.get(API + '/reports').then(res => {
            setReport(res.data)
        })
    }, [])

    const fillModal = (e, id) => {
        Axios.get(API + '/movements/' + id).then(res => {
            setModalData(res.data.data)
            setModalShow(true)
        })
    }

    return (
        <Fragment>
            <Row className='mb-2'>

                <Col sm={12}>
                    {
                        report && (
                            <Tabs defaultActiveKey="expenses" id="uncontrolled-tab-example">
                                <Tab eventKey="expenses" title="Gastos" className='p-3'>
                                    <ExpensesList expenses={report.expenses} />
                                </Tab>
                                <Tab eventKey="incomes" title="Ingresos" className='p-3'>
                                    <IncomeList incomes={report.incomes} />
                                </Tab>
                                <Tab eventKey="policy_payments" title="Pago de Polizas" className='p-3'>
                                    <PolicyPaymentsList payments={report.policy_payments} />
                                </Tab>
                                <Tab eventKey="payments" title="Cobranzas" className='p-3'>
                                    <PaymentsList payments={report.payments} />
                                </Tab>
                                <Tab eventKey="cash" title="Saldos" className='p-3'>
                                    <Row>
                                        <Col sm={6}>
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
                                        <Col sm={6}>
                                            <Card className='h-100'>
                                                <Card.Header className='bg-primary text-white'>Efectivo</Card.Header>
                                                <Card.Body>
                                                    <Extracto show={modalshow} setShow={setModalShow} data={modalData} />
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
                                                                        <td><a href='#' onClick={(e,) => fillModal(e, account.id)}>{account.name}</a></td>
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
                                    </Row>
                                </Tab>
                                <Tab eventKey="checks" title="Cheques" className='p-3'>
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
                                </Tab>
                            </Tabs>
                        )
                    }
                </Col>
            </Row>
        </Fragment>
    )
}




const mapStateToProps = state => (
    { user: state.session.user }
)
export default connect(mapStateToProps, null)(Finances);