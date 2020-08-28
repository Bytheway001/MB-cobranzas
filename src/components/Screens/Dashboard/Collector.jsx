import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { SmartCard } from '../../library/SmartCard';
import { getClientById, selectClient } from '../../../ducks/clients';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { formatMoney, UserIs } from '../../../utils/utils';
import { Extracto } from '../Reports/components/Extracto';
import { CurrencyChange } from '../../Forms/CurrencyChange';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faExpandAlt, faShareSquare, faDollarSign, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { UserPayments } from '../Clients/Profile';
import { CashBox } from './components/Cashbox';
import { UserPaymentsModal } from './components/UserPaymentsModal';
import ClientForm, { NewClientForm } from '../../Forms/Client';
import { ClientProfileTable } from '../../Tables/ClientProfileTable';
import { ClientSelect, ClientSelector } from '../../custom/Controls';
import TransferForm from '../../Forms/Transfer';

const buttonStyle = {
    height: 120,
    fontSize: '0.9em'
}


export const Thumbnail = ({ title, as, to, icon, onClick }) => {
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
            <Button onClick={onClick} to={to} className='my-1 d-flex flex-column justify-content-center align-items-center' block style={buttonStyle}>
                <p><FontAwesomeIcon size='3x' icon={icon} /></p>
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
                <SmartCard title="Clientes">
                    <Row className='mb-2'>
                        <Col sm={1}>
                            <label>Cliente</label>
                        </Col>
                        <Col sm={6}>
                            <ClientSelector title='Cliente' selected={editing ? [editing] : []} onChange={(val) => testValue(val)} />
                        </Col>
                        <Col sm={5}>
                            <NewClientForm modal={true} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            editing &&
                            <Col xs={12}>
                                <ClientProfileTable editing={editing} />
                                <Table className='mt-1' variant='bordered' size='sm'>
                                    <tbody>
                                        <tr>
                                            <th colSpan={4} className='bg-primary text-white'>Acciones:</th>
                                        </tr>
                                        <tr>
                                            <th><ClientForm modal={true} /></th>
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
                                <TransferForm modal={true} />
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
