import React from 'react';
import { Row, Col, Button, FormGroup } from 'react-bootstrap';
import { SmartCard } from '../../library/SmartCard';
import ClientSelect from '../../custom/ClientSelect';
import { useState } from 'react';
import { Input } from '../../custom/Controls';

const buttonStyle = {

    height: 120,
    fontSize: '0.9em'
}


const Thumbnail = ({ title }) => (
    <Button className='my-1' block style={buttonStyle}>
        {title}
    </Button>
)

export const Collector = () => {

    return (
        <Row>
            <Col sm={6}>
                <SmartCard title="Cobranzas">
                    <Row className='mb-2'>
                        <Col sm={1}>
                            <label>Cliente</label>
                        </Col>
                        <Col sm={4}>
                            <ClientSelect title='Cliente' />
                        </Col>
                    </Row>
                </SmartCard>
            </Col>
            <Col sm={6}>
                <SmartCard title='Operaciones'>
                    <Row>
                        <Col sm={3}>
                            <Thumbnail title='Pago de Polizas' />
                        </Col>
                        <Col sm={3}>
                            <Thumbnail title='Transferencias Internas' />
                        </Col>
                        <Col sm={3}>
                            <Thumbnail title='Registrar Gasto' />
                        </Col>
                        <Col sm={3}>
                            <Thumbnail title='Registrar Ingreso' />
                        </Col>
                        <Col sm={3}>
                            <Thumbnail title='Cobro de Cheques' />
                        </Col>
                    </Row>

                </SmartCard>
            </Col>
        </Row>
    )
}