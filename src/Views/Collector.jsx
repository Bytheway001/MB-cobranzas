import { faDollarSign, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CashBox } from '../components/Cashbox';
import { SmartCard } from '../components/library/SmartCard';
import { Thumbnail } from '../components/Thumbnail';
import { PolicySelector } from '../Controls';
import { ClientSelector } from '../Controls/ClientSelector';
import { getClientList, selectClient, selectClientPolicy } from '../ducks/clients';
import { CheckForm, ClientForm, PolicyForm, TransferForm } from '../Forms';
import { ClientProfile } from '../Tables/ClientProfile';
import { UserIs } from '../utils/utils';

const Collector = ({ clients, selectClient, user, accounts, getClientList, selectClientPolicy }) => {


    const editing = clients.editing
    return (
        <Row>
            <Col sm={6}>
                <SmartCard title="Clientes">
                    <Row className='mb-2'>
                        <Col sm={2}>
                            <label>Cliente</label>
                        </Col>
                        <Col sm={6}>
                            <ClientSelector
                                onSearch={getClientList}
                                title='Cliente'
                                options={clients.list}
                                isLoading={clients.loading}
                                onChange={selectClient}
                                clearButton={true}
                                selected={editing}
                            />
                        </Col>
                        <Col sm={4}>
                            <ClientForm modal={true} editing={editing} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            editing &&
                            <>

                                <Col sm={2} className='mb-1'>
                                    <label>Poliza</label>
                                </Col>
                                <Col sm={6}>
                                    <PolicySelector options={editing.policies} selected={[]} onChange={(val) => selectClientPolicy(val)} title='Poliza'></PolicySelector>
                                </Col>
                                <Col sm={4} className='mb-1'>
                                    <PolicyForm modal={true} client={editing.id} policy={editing.policies.find(x => x.selected)} />
                                </Col>
                                <Col sm={12}>
                                    <ClientProfile client={editing} />
                                </Col>
                            </>
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
                                <CheckForm />
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
    selectClientPolicy: (policyArr) => dispatch(selectClientPolicy(policyArr)),
    getClientList: (query) => dispatch(getClientList(query)),
    selectClient: (clientArr) => dispatch(selectClient(clientArr))
})
export default connect(mapStateToProps, mapDispatchToProps)(Collector);
