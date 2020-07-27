import React, { useState, useEffect } from 'react';
import { API } from '../../ducks/root';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { UserIs } from '../../utils/utils';


export const AccountsView = ({user}) => {
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
                    accounts.map(account => {
                        if (account.type !='Cash') {
                            if (UserIs(user, 360)) {
                                return (
                                    <tr>
                                        <td>{account.name}</td>
                                        <td>{account.usd}</td>
                                        <td>{account.bob}</td>
                                    </tr>
                                )
                            }
                            else return null;
                        }
                        else {
                            return (
                                <tr>
                                    <td>{account.name}</td>
                                    <td>{account.usd}</td>
                                    <td>{account.bob}</td>
                                </tr>
                            )
                        }


                    })
                }
            </tbody>
        </Table>
    )
}

const mapStateToProps = state => {
    return { user: state.session.user }
}

export default connect(mapStateToProps, null)(AccountsView)