import React from 'react'
import { Table, Row, Col } from 'react-bootstrap';


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
                                        <th>Nombre:</th>
                                        <td>{client.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Telefono:</th>
                                        <td>{client.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Agente</th>
                                        <td>{client.agent.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Cobrador</th>
                                        <td>{client.collector.name}</td>
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