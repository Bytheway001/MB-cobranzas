import React from 'react';
import { Card, Row, Col, Form, FormControl, FormCheck } from 'react-bootstrap';
import { LoaderButton } from '../../custom';

export const Criteria = ({ setTerm, term, criteria, changeCriteria, onSubmit,loading }) => {
    const clientSearch = criteria === 'client' ? term : ''
    const policySearch = criteria === 'policy' ? term : ''

    const isClientDisabled = criteria !== 'client';
    const isPolicyDisabled = criteria !== 'policy';

    return (
        <Card>
            <Card.Header className='bg-primary text-light text-center'>Buscar Poliza</Card.Header>
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Row className='mb-3'>
                        <Col sm={6}>
                            <FormCheck value='client' name='criteria' type='radio' label='Cliente' onChange={({ target }) => changeCriteria(target.value)} />
                        </Col>
                        <Col sm={6}>
                            <FormControl value={clientSearch} disabled={isClientDisabled} size='sm' onChange={({ target }) => setTerm(target.value)} />
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col sm={6}>
                            <FormCheck name='criteria' value='policy' type='radio' label='Numero de Poliza' onChange={({ target }) => changeCriteria(target.value)} />
                        </Col>
                        <Col sm={6}>
                            <FormControl value={policySearch} disabled={isPolicyDisabled} size='sm' onChange={({ target }) => setTerm(target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className='text-center'>
                            <LoaderButton size='sm' type='submit' loading={loading} className='w-50' style={{ borderRadius: 0 }}>Buscar</LoaderButton>
                        </Col>
                    </Row>

                </Form>
            </Card.Body>
        </Card>
    )
}