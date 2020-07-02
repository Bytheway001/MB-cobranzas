import React, { useState, useEffect } from 'react';
import { API } from '../../ducks/root';
import Axios from 'axios';
import { Table } from 'react-bootstrap';


export const AccountsView = () => {
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        Axios.get(API + '/accounts').then(res => {
            setAccounts(res.data.data)
        })
    }, [])

    return (
        <Table size='sm' variant='bordered'>
            <thead>
                <tr>
                    <th>Cuenta</th>
                    <th>USD</th>
                    <th>BOB</th>
                </tr>
            </thead>
            <tbody>
                {
                    accounts.map(account => (
                        <tr>
                            <td>{account.name}</td>
                            <td>{account.usd}</td>
                            <td>{account.bob}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}