import React from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { PaymentPolicyForm } from './components/PolicyForm';

export const PolicyPaymentsPage = ()=>{
    return(
        <Row>
            <Col sm={{span:4,offset:4}}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Pago de Poliza</Card.Header>
                    <Card.Body>
                        <PaymentPolicyForm/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}