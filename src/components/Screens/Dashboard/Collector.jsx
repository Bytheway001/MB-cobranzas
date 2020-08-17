import React, { Fragment } from 'react';
import { Row, Col, Button, FormGroup, Table, Modal } from 'react-bootstrap';
import { SmartCard } from '../../library/SmartCard';
import ClientSelect from '../../custom/ClientSelect';
import { useState } from 'react';
import { Input } from '../../custom/Controls';
import { getClientById, selectClient } from '../../../ducks/clients';
import { connect } from 'react-redux';
import UpdateClientModal from '../Clients/UpdateClientModal';
import { useEffect } from 'react';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { Link } from 'react-router-dom';
import { formatMoney, UserIs } from '../../../utils/utils';
import { Extracto } from '../Reports/components/Extracto';
import { CurrencyChange } from '../../Forms/CurrencyChange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faExpandAlt, faShareSquare, faDollarSign, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { UserPayments } from '../Clients/Profile';
import { CashBox } from './components/Cashbox';
import { UserPaymentsModal } from './components/UserPaymentsModal';

const buttonStyle = {
    height: 120,
    fontSize: '0.9em'
}


const Thumbnail = ({ title, as, to, icon }) => {
    if (as) {
        return (
            <Button as={as} to={to} className='my-1 d-flex flex-column justify-content-center' block style={buttonStyle}>
                <p><FontAwesomeIcon size='3x' icon={icon} /></p>
                {title}
            </Button>
        )
    }
    else {
        return (
            <Button className='my-1' block style={buttonStyle}>
                {title}
            </Button>
        )
    }

}


export const Collector = ({ clients, getClientById, selectClient, user, accounts }) => {
    const testValue = (val) => {
        if (val[0]) {
            selectClient(val[0])
        }
        else {
            selectClient(null)
        }
    }
    const editing = clients.editing

    return (
        <Row>
            <Col sm={6}>
                <SmartCard title="Cobranzas">
                    <Row className='mb-2'>
                        <Col sm={1}>
                            <label>Cliente</label>
                        </Col>
                        <Col sm={4}>
                            <ClientSelect title='Cliente' selected={editing ? [editing] : []} onChange={(val) => testValue(val)} />
                        </Col>
                        <Col sm={7}>
                            <Button size='sm' block as={Link} to='/clients/new'>Crear Cliente</Button>
                        </Col>
                    </Row>
                    <Row>
                        {
                            editing &&
                            <Col xs={12}>
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
                                            <td>{editing.plan} - {editing.option}</td>
                                            <th className='bg-info text-white'>Cobrador</th>
                                            <td>{editing.collector}</td>

                                        </tr>

                                        <tr>
                                            <th className='bg-info text-white'>Prima</th>
                                            <td>{formatMoney(editing.prima, 2, '.', ',', '$')}</td>
                                            <th className='bg-info text-white'>Estado de Poliza</th>
                                            <td>{editing.policy_status}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                    </tfoot>
                                </Table>
                                <Table className='mt-1' variant='bordered' size='sm'>
                                    <tbody>
                                        <tr>
                                            <th colSpan={4} className='bg-primary text-white'>Acciones:</th>
                                        </tr>
                                        <tr>
                                            <th><UpdateClientModal /></th>
                                            <th><Button variant='success' as={Link} to='/payments/new' block size='sm'>Registrar Cobranza</Button></th>
                                            <th><UserPaymentsModal client={editing} /></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        }
                    </Row>
                </SmartCard>
            </Col>
            {
                UserIs(user, 248) &&
                <Col sm={6}>
                    <SmartCard title='Operaciones'>
                        <Row>
                            {accounts.length > 0 && user.account &&
                                <Col sm={12}>
                                    <CashBox id={accounts.find(x => x.id === user.account.id).id} usd={accounts.find(x => x.id === user.account.id).usd} bob={accounts.find(x => x.id === user.account.id).bob} />
                                </Col>
                            }
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/transfers/new' title='Transferencias Internas' icon={faExpandAlt} />
                            </Col>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/expenses/new' title='Registrar Gasto' icon={faShareSquare} />
                            </Col>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/other_incomes' title='Registrar Ingreso' icon={faDollarSign} />
                            </Col>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/checks/collect' title='Cobro de Cheques' icon={faMoneyBillWave} />
                            </Col>

                        </Row>
                    </SmartCard>
                </Col>
            }


        </Row>
    )
}




const mapStateToProps = state => ({
    clients: state.clients,
    selectedClient: state.clients.editing,
    user: state.session.user,
    accounts: state.accounts.list
})

const mapDispatchToProps = dispatch => ({
    getClientById: (id) => dispatch(getClientById(id)),
    selectClient: (id) => dispatch(selectClient(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Collector);
