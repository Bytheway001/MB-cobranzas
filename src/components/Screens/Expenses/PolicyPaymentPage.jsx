import React, { useState } from 'react';
import { Row, Card, Col, Table } from 'react-bootstrap';
import { PaymentPolicyForm } from './components/PolicyForm';

import { PolicyView } from '../Clients/PolicyView';
import { API } from '../../../ducks/root';
import Axios from 'axios';
import { SmartCard } from '../../library/SmartCard';
import { ClientSelector } from '../../custom/Controls';

export const PolicyPaymentsPage = () => {
    const [client, setClient] = useState([]);
    const [payments, setPayments] = useState([]);
    
    const getClient = (client) => {
        if (client.length>0) {
            Axios.get(API + '/payments/' + client[0].id).then(res => {
                console.log(res.data.data)
                setPayments(res.data.data)
                setClient(client)
            })
        }


    }
    return (
        <Row>
            <Col sm={4}>
                <Card className='h-100'>
                    <Card.Header className='bg-primary text-white'>Seleccion de Cliente</Card.Header>
                    <Card.Body>
                        <ClientSelector onChange={getClient} selected={client} />
                        {client[0] && <PolicyView client={client[0]} />}

                    </Card.Body>
                </Card>
            </Col>
            <Col sm={{ span: 4 }}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Pago de Poliza</Card.Header>
                    <Card.Body>
                        <PaymentPolicyForm selectedClient={client} />
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}>
                <SmartCard title='Cobranzas realizadas'>
                    {client[0] && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Moneda</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr>
                                        <td>{p.payment_date}</td>
                                        <td>{p.amount}</td>
                                        <td>{p.currency}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    )}
                </SmartCard>
            </Col>
        </Row>
    )
}