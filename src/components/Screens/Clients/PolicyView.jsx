import React from 'react'
import { Table, Row, Col } from 'react-bootstrap';
import { formatMoney } from '../../../utils/utils';

export const PolicyView = ({ client }) => {
    return (
        <div className='mt-2'>
            {
                client ?
                    <Row>
                       
                        <Col sm={12}>
                            <Table size='sm' variant='bordered'>
                                <thead>
                                    <tr>
                                        <th className='text-center bg-info text-white' colSpan={2}>Datos del cliente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th># Poliza</th>
                                        <td>{client.policy_number}</td>
                                    </tr>
                                    <tr>
                                        <th>Nombre:</th>
                                        <td>{client.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Telefono:</th>
                                        <td>{client.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Aseguradora</th>
                                        <td>{client.company}</td>
                                    </tr>
                                    <tr>
                                        <th>Plan/Opcion:</th>
                                        <td>{client.plan} / {client.option}</td>
                                    </tr>
                                    <tr>
                                        <th>Frecuencia de Pago</th>
                                        <td>{client.frequency}</td>
                                    </tr>
                                    <tr>
                                        <th>Fecha Efectiva</th>
                                        <td>{client.effective_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Fecha de Renovacion</th>
                                        <td>{client.renovation_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Prima</th>
                                        <td>{formatMoney(client.prima,'2','.',',','$')}</td>
                                    </tr>
                                    <tr>
                                        <th>Agente</th>
                                        <td>{client.agent}</td>
                                    </tr>
                                    <tr>
                                        <th>Cobrador</th>
                                        <td>{client.collector}</td>
                                    </tr>
                                </tbody>


                            </Table>
                        </Col>

                    </Row>
                    :
                    null
            }
        </div>
    )



}