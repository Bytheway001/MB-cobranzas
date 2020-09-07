import React from 'react';
import { UserIs } from '../../../utils/utils';
import { Col, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faExternalLinkSquareAlt, faUser, faMoneyBillAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { SmartCard } from '../../library/SmartCard';
export const ActionBar = ({ user }) => (
    <SmartCard title='Acciones'>
        <Row className='h-100'>
            {UserIs(user, 224) &&
                <Col sm={3}>
                    <Button as={Link} to='/payments/new' size='lg' className='d-flex align-items-center justify-content-center h-100' block>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faMoneyBillAlt} className='mr-2 d-block' size='2x' />

                            <span>Registrar Cobranza</span>

                        </div>
                    </Button>
                </Col>
            }

            <Col sm={3}>
                <Button as={Link} to='/clients/new' size='lg' className='d-flex align-items-center justify-content-center h-100' block>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <FontAwesomeIcon icon={faUser} className='mr-2 d-block' size='2x' />
                        <span>Crear Cliente</span>
                    </div></Button>
            </Col>
            {
                UserIs(user, 248) &&
                <Col sm={3}>
                    <Button as={Link} to='/expenses/new' size='lg' className='d-flex align-items-center justify-content-center h-100' variant='primary' block>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faExternalLinkSquareAlt} className='mr-2 d-block' size='2x' />
                            <span>Registrar Egreso</span>
                        </div>
                    </Button>
                </Col>

            }
             {
                UserIs(user, 248) &&
                <Col sm={3}>
                    <Button as={Link} to='/policy/pay' size='lg' className='d-flex align-items-center justify-content-center h-100' variant='primary' block>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faMoneyBill} className='mr-2 d-block' size='2x' />
                            <span>Pago de Polizas</span>
                        </div>
                    </Button>
                </Col>

            }
        </Row>
    </SmartCard>
)