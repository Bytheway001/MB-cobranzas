import React, { useState } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import Axios from 'axios';
import { API } from '../../../ducks/root';

export const Finances = props => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        Axios.get(API + '/accounts').then(res => {
            setAccounts(res.data.data)
        })
    }, [])

    return (
        <Row>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Cuentas Bancarias</Card.Header>
                    <Card.Body>
                        <Table variant='striped' size='sm'>
                            <thead>
                                <tr className='bg-info text-white'>
                                    <th>Cuenta</th>
                                    <th>USD</th>
                                    <th>BOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accounts.length > 0 && accounts.filter(x => x.type === 'Bank').map(account => (
                                        <tr>
                                            <td>{account.name}</td>
                                            <td>{account.usd}</td>
                                            <td>{account.bob}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table></Card.Body>
                </Card>




            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Efectivo</Card.Header>
                    <Card.Body>
                        <Table variant='striped' size='sm'>
                            <thead>
                                <tr className='bg-info text-white'>
                                    <th>Cuenta</th>
                                    <th>USD</th>
                                    <th>BOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accounts.length > 0 && accounts.filter(x => x.type === 'Cash').map(account => (
                                        <tr>
                                            <td>{account.name}</td>
                                            <td>{account.usd}</td>
                                            <td>{account.bob}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={4}>
                <h3>Cheques en transito</h3>
            </Col>
        </Row>
    )
}