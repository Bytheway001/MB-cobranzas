import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Table, Button, FormGroup, Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { formatMoney } from '../../../utils/utils';
import ReactDatePicker from 'react-datepicker';
import { AccountsArray } from '../../../options/options';
import { connect } from 'react-redux';
import { getExpenses } from '../../../ducks/expenses';

const GeneralReport = props => {
    const defaultFrom = new Date();
    const defaultTo = new Date(defaultFrom.getTime() + 30 * 86400000);
    const [report, setReport] = useState(null);
    const [from, setFrom] = useState(defaultFrom)
    const [to, setTo] = useState(defaultTo)
    const [checks, setChecks] = useState([]);
    useEffect(() => {

        Axios.get(API + '/reports').then(res => {
            setReport(res.data)
        })
        Axios.get(API + '/checks').then(res => {
            setChecks(res.data.data)
        })


    }, [])


    const LookReports = (e) => {
        const f = new Date(from).toLocaleDateString()
        const t = new Date(to).toLocaleDateString()
        console.log(f)
        Axios.get(API + '/reports?f=' + f + '&t=' + t).then(res => {
            console.log(res.data)
            setReport(res.data)
        })


    }
    return (
        <Row>
            <Col md={3} xs={12} className='mt-3'>
                <Card>
                    <Card.Header className='bg-primary text-white'>Rango de Fecha</Card.Header>
                    <Card.Body>
                        <FormGroup as={Row}>
                            <Col sm={3}>
                                <label>Desde:</label>
                            </Col>
                            <Col sm={9}>

                                <ReactDatePicker className='form-control' selected={from} dateFormat='dd/MM/yyyy' onChange={setFrom} />
                            </Col>

                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col sm={3}>
                                <label>Hasta:</label>
                            </Col>
                            <Col sm={9}>
                                <ReactDatePicker className='form-control' selected={to} dateFormat='dd/MM/yyyy' onChange={setTo} />
                            </Col>

                        </FormGroup>
                        <Button onClick={() => LookReports()} block>Buscar</Button>
                    </Card.Body>

                </Card>
            </Col>
            {
                report &&
                <Fragment>

                    <Col md={3} className='mt-3'>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Efectivo en Caja</Card.Header>
                            <Card.Body>

                                <Table size='sm'>
                                    <thead>
                                        <tr className='bg-info text-white'>
                                            <th>Oficina</th>
                                            <th>USD</th>
                                            <th>BOB</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>La Paz</th>
                                            <th> {report.accounts.find(x => x.name === 'Caja LP').usd}</th>
                                            <th> {report.accounts.find(x => x.name === 'Caja LP').bob}</th>
                                        </tr>
                                        <tr>
                                            <th>Santa Cruz</th>
                                            <th> {report.accounts.find(x => x.name === 'Caja SC').usd}</th>
                                            <th> {report.accounts.find(x => x.name === 'Caja SC').bob}</th>
                                        </tr>
                                        <tr>
                                            <th>Cochabamba</th>
                                            <th> {report.accounts.find(x => x.name === 'Caja CB').usd}</th>
                                            <th> {report.accounts.find(x => x.name === 'Caja CB').bob}</th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3} className='mt-3'>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Cuentas Bancarias</Card.Header>
                            <Card.Body>

                                <Table size='sm'>
                                    <thead>
                                        <tr className='bg-info text-white'>
                                            <th>Cuenta</th>
                                            <th>Saldo</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            report.accounts.map((r, k) => {
                                                if (r.id !== 1 && r.id !== 11 && r.id !== 10 && r.id !== 9) {
                                                    return (
                                                        <tr key={k}>
                                                            <th>{r.name}</th>
                                                            <td>{r.usd === 0 ? r.bob : r.usd}</td>
                                                        </tr>
                                                    )
                                                }
                                                else return null
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={3} className='mt-3'>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Cheques en transito</Card.Header>
                            <Card.Body>
                                <Table size='sm'>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Monto</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {checks.map((c, k) => {
                                            return (
                                                <tr>
                                                    <td>{c.client}</td>
                                                    <td>{c.amount} {c.currency}</td>
                                                    <td>{c.status}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className='mt-5'>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Detalle de Cobranzas</Card.Header>
                            <Card.Body>
                                <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped mt-5' variant='hover'>
                                    <thead>
                                        <tr className='bg-info text-white'>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Cobrador</th>
                                            <th>Metodo de Pago</th>
                                            <th>Cuenta</th>
                                            <th>Moneda</th>
                                            <th>Monto</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {report.payments.map((r, k) => (
                                            <tr key={k}>
                                                <td>{new Date(r.payment_date).toLocaleDateString()}</td>
                                                <td>{r.client}</td>
                                                <td>{r.collector}</td>
                                                <td>{r.payment_method}</td>
                                                <td>{r.account}</td>
                                                <td>{r.currency}</td>
                                                <td>{r.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className='mt-5'>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Gastos</Card.Header>
                            <Card.Body>
                                <ExpensesList />
                            </Card.Body>
                        </Card>
                    </Col>
                </Fragment>

            }
        </Row>
    )
}

export const ExpenseList = ({ expenses, getExpenses }) => {
    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <Tabs defaultActiveKey="expenses">
            <Tab eventKey="expenses" title="Operativos">
                <div className='mt-5'>
                    <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
                        <thead>
                            <tr className='bg-info text-white'>

                                <th>Fecha</th>
                                <th>Oficina</th>
                                <th>Cta Pagadora</th>
                                <th>Cantidad</th>
                                <th>Descripcion</th>
                                <th>Categoria</th>
                                <th># Factura</th>

                            </tr>

                        </thead>
                        <tbody>
                            {expenses.expenses.map((e, k) => (
                                <tr key={k}>
                                    <td>{e.date}</td>
                                    <td>{e.office}</td>
                                    <td>{e.account_name}</td>
                                    <td>{e.amount}</td>
                                    <td>{e.description}</td>
                                    <td>{e.category}</td>
                                    <td>{e.bill_number}</td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </div>

            </Tab>
            <Tab eventKey='payments' title='Polizas'>
                <div className='mt-5'>
                    <Table style={{ fontSize: '0.8em' }} size='sm' className='table-striped' variant='hover'>
                        <thead>

                            <tr className='bg-info text-white'>

                                <th>Fecha</th>
                                <th>Oficina</th>
                                <th>Aseguradora</th>
                                <th>Cta Pagadora</th>
                                <th>Cantidad</th>
                                <th>Descripcion</th>


                            </tr>

                        </thead>
                        <tbody>
                            {expenses.payments.map((e, k) => (
                                <tr key={k}>
                                    <td>{e.date}</td>
                                    <td>{e.client}</td>
                                    <td>{e.company}</td>
                                    <td>{e.account}</td>
                                    <td>{e.currency}</td>
                                    <td>{e.amount}</td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>

                </div>
            </Tab>
        </Tabs>



    )
}

const mapStateToProps = state => (
    {
        expenses: state.expenses
    }
)

const mapDispatchToProps = dispatch => (
    {
        getExpenses: () => dispatch(getExpenses())
    }
)

const ExpensesList = connect(mapStateToProps, mapDispatchToProps)(ExpenseList)

export default GeneralReport;