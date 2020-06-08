import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Table, Button, FormGroup, Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { formatMoney } from '../../../utils/utils';
import ReactDatePicker from 'react-datepicker';
import { AccountsArray } from '../../../options/options';
import { connect } from 'react-redux';
import { getExpenses } from '../../../ducks/expenses';
import { ExpensesList, PaymentsList, PolicyPaymentsList } from './Lists';
import { DateSearch } from '../../custom/DateSearch';

const GeneralReport = props => {
    const defaultFrom = new Date();
    const defaultTo = new Date(defaultFrom.getTime() + 30 * 86400000);
    const [report, setReport] = useState(null);
    const [from, setFrom] = useState(defaultFrom)
    const [to, setTo] = useState(defaultTo)

    useEffect(() => {
        Axios.get(API + '/reports').then(res => {
            setReport(res.data)
        })

    }, [])


    const LookReports = (from, to) => {
        const f = new Date(from).toLocaleDateString()
        const t = new Date(to).toLocaleDateString()
        console.log(f)
        Axios.get(API + '/reports?f=' + f + '&t=' + t).then(res => {
            console.log(res.data)
            setReport(res.data)
        })


    }
    return (
        <Fragment>
            <Row>
                <Col md={3} xs={12}>
                    <DateSearch onSearch={LookReports} />
                </Col>
                <Col sm={9}>
                    {report &&
                        <Card>
                            <Card.Header className='bg-primary text-white'>
                                Cobranzas Realizadas
                         </Card.Header>
                            <Card.Body>
                                <PaymentsList payments={report.payments} />
                            </Card.Body>
                        </Card>
                    }

                </Col>
            </Row>
            <Row noGutters className='mt-5'>
                {
                    report &&
                    <Fragment>
                        <Col sm={6} className='px-1'>
                            <Card >
                                <Card.Header className='bg-primary text-white' >
                                    Gastos Operativos
                            </Card.Header>
                                <Card.Body>
                                    <ExpensesList expenses={report.expenses} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <Card>
                                <Card.Header className='bg-primary text-white'>
                                    Pago de Polizas
                            </Card.Header>
                                <Card.Body>
                                    <PolicyPaymentsList payments={report.policy_payments} />
                                </Card.Body>
                            </Card>


                        </Col>
                    </Fragment>

                }
            </Row>
        </Fragment>
    )
}




const mapStateToProps = state => (
    { expenses: state.expenses }
)

export default GeneralReport;