import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Table, Button, FormGroup } from 'react-bootstrap';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { formatMoney } from '../../../utils/utils';
import ReactDatePicker from 'react-datepicker';

const Reports = props => {

    const defaultFrom = new Date();
    const defaultTo =new Date(defaultFrom.getTime() + 30 * 86400000);
    const [report, setReport] = useState(null);
    const [from,setFrom]=useState(defaultFrom)
    const [to,setTo]=useState(defaultTo)
    useEffect(() => {
      
        Axios.get(API + '/reports').then(res => {
            setReport(res.data)
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
            <Col sm={3}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Rango de Fecha</Card.Header>
                    <Card.Body>
                        <FormGroup as={Row}>
                            <Col sm={3}>
                                <label>Desde:</label>
                            </Col>
                            <Col sm={9}>
                              
                                <ReactDatePicker className='form-control' selected={from} dateFormat='dd/MM/yyyy' onChange={setFrom}/>
                            </Col>

                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col sm={3}>
                                <label>Hasta:</label>
                            </Col>
                            <Col sm={9}>
                            <ReactDatePicker className='form-control' selected={to} dateFormat='dd/MM/yyyy' onChange={setTo}/>
                            </Col>
                            
                        </FormGroup>
                        <Button onClick={LookReports} block>Buscar</Button>
                    </Card.Body>

                </Card>
            </Col>
            {
                report &&
                <Fragment>

                    <Col sm={3}>
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
                                            <td>{formatMoney(report.caja.lp.USD, 0, '.', ',', '')}</td>
                                            <td>{formatMoney(report.caja.lp.BOB, 0, '.', ',', '')}</td>
                                        </tr>
                                        <tr>
                                            <th>Santa Cruz</th>
                                            <td>{formatMoney(report.caja.sc.USD, 0, '.', ',', '')}</td>
                                            <td>{formatMoney(report.caja.sc.BOB, 0, '.', ',', '')}</td>
                                        </tr>
                                        <tr>
                                            <th>Cochabamba</th>
                                            <td>{formatMoney(report.caja.cb.USD, 0, '.', ',', '')}</td>
                                            <td>{formatMoney(report.caja.cb.BOB, 0, '.', ',', '')}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
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
                                        <tr>
                                            <th>Cuenta 1</th>
                                            <td>{formatMoney(report.bancos[1], 0, '.', ',', '')}</td>


                                        </tr>
                                        <tr>
                                            <th>Cuenta 2</th>
                                            <td>{formatMoney(report.bancos[2], 0, '.', ',', '')}</td>

                                        </tr>
                                        <tr>
                                            <th>Cuenta 3</th>
                                            <td>{formatMoney(report.bancos[3], 0, '.', ',', '')}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={3}>
                        <Card>
                            <Card.Header className='bg-primary text-white'>Gastos del Mes</Card.Header>
                            <Card.Body>
                                A desarrollar en Fase 3
                </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} className='mt-5'>
                        <Card>
                            <Card.Header>Detalle de Cobranzas</Card.Header>
                            <Card.Body>
                                <Table size='sm' className='table-striped' variant='hover'>
                                    <thead>
                                        <tr className='bg-info text-white'>
                                            <th>Fecha</th>
                                            <th>Cliente</th>
                                            <th>Cobrador</th>
                                            <th>Metodo de Pago</th>
                                            <th>Cuenta</th>
                                            <th>Monto</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            report.payments.map(r => (
                                                <tr>
                                                    <td>{r.date}</td>
                                                    <td>{r.client}</td>
                                                    <td>{r.collector}</td>
                                                    <td>{r.payment_method}</td>
                                                    <td>{r.account}</td>
                                                    <td> <td>{formatMoney(r.amount, 0, '.', ',', '')}</td></td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Fragment>

            }
        </Row>
    )
}


export default Reports;