import React, { useState } from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { PaymentPolicyForm } from './components/PolicyForm';
import ClientSelect from '../../custom/ClientSelect';

export const PolicyPaymentsPage = () => {
    const [client, setClient] = useState([]);
    return (
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Seleccion de Cliente</Card.Header>
                    <Card.Body>
                        <ClientSelect onChange={setClient} selected={client} />
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
        </Row>
    )
}