import React from 'react';
import { UserIs } from '../../../utils/utils';
import {Col,Row,Button,Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import { faExternalLinkSquareAlt, faUser, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

export const ActionBar = ({user}) => (
    <Card className='h-100'>
        <Card.Header className='bg-primary text-light'>Acciones</Card.Header>
        <Card.Body>
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

            </Row>


        </Card.Body>
    </Card>
)