import React from 'react';
import { Table } from 'react-bootstrap';
import { formatMoney } from '../../utils/utils';
export const ClientProfileTable = ({ editing }) => {
    return (
        <Table size='sm' variant='bordered'>
            <thead>
                <tr>
                    <th className='bg-primary text-white' colSpan={4}>Datos del Cliente</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className='bg-info text-white'>Poliza</th>
                    <td>{editing.policy_number}</td>
                    <th className='bg-info text-white'>F. Renovacion</th>
                    <td>{editing.renovation_date}</td>
                </tr>
                <tr>
                    <th className='bg-info text-white'>Nombre</th>
                    <td>{editing.first_name}</td>
                    <th className='bg-info text-white'>F. Efectiva</th>
                    <td>{editing.effective_date}</td>
                </tr>
                <tr>
                    <th className='bg-info text-white'>Telefono</th>
                    <td>{editing.phone}</td>
                    <th className='bg-info text-white'>Frecuencia</th>
                    <td>{editing.frequency}</td>
                </tr>


                <tr>
                    <th className='bg-info text-white'>Aseguradora</th>
                    <td>{editing.company}</td>
                    <th className='bg-info text-white'>Agente</th>
                    <td>{editing.agent}</td>


                </tr>
                <tr>

                    <th className='bg-info text-white'>Plan/Opcion</th>
                    <td>{editing.plan} - {formatMoney(editing.option, 2, '.', ',', '$')}</td>
                    <th className='bg-info text-white'>Cobrador</th>
                    <td>{editing.collector}</td>

                </tr>

                <tr>
                    <th className='bg-info text-white'>Prima</th>
                    <td>{formatMoney(editing.prima, 2, '.', ',', '$')}</td>
                    <th className='bg-info text-white'>Estado de Poliza</th>
                    <td>{editing.policy_status}</td>
                </tr>
                <tr>
                    <th className='bg-info text-white'>Email</th>
                    <td >{editing.email}</td>
                    <th className='bg-info text-white'>ID Hubspot</th>
                    <th><a href={'https://app.hubspot.com/contacts/4019934/contact/'+editing.h_id} target='blank'>{editing.h_id}</a></th>
                </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </Table>

    )
}