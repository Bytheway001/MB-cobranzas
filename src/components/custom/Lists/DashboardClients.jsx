import React from 'react';
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
export const DashboardList = ({list}) => {
    return (
        <Table variant='striped' size='sm' style={{ fontSize: '0.8em' }}>
            <thead>
                <tr className='bg-info text-white'>
                    <th>Numero</th>
                    <th>Cliente</th>
                    <th>Agente</th>
                    <th>Cobrador</th>
                    <th>Aseguradora</th>
                    <th>Plan</th>
                    <th>Opcion</th>
                    <th>Fecha Renovacion</th>
                    <th>Fecha Efectiva</th>
                    <th>Frecuencia de Pago</th>
                    <th>Estado</th>
                    <th>Ver</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((client, key) => (
                        <tr>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.agent}</td>
                            <td>{client.collector}</td>
                            <td>{client.company}</td>
                            <td>{client.plan}</td>
                            <td>{client.option}</td>
                            <td>{client.effective_date}</td>
                            <td>{client.renovation_date}</td>
                            <td>{client.frequency}</td>
                            <td>{client.status}</td>
                            <td><Button as={Link} to={'/clients/profile/' + client.id} block size='sm' style={{ padding: 2 }}>Ver Poliza</Button></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}