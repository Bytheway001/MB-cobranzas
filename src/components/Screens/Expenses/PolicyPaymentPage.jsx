import React, { useState } from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { PaymentPolicyForm } from './components/PolicyForm';
import ClientSelect from '../../custom/ClientSelect';
import { PolicyView } from '../Clients/PolicyView';

export const PolicyPaymentsPage = () => {
    const [client, setClient] = useState([]);
    return (
        <Row>
            <Col sm={4}>
                <Card className='h-100'>
                    <Card.Header className='bg-primary text-white'>Seleccion de Cliente</Card.Header>
                    <Card.Body>
                        <ClientSelect onChange={setClient} selected={client} />
                        { client[0] && <PolicyView client={client[0]}/>}
                        
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