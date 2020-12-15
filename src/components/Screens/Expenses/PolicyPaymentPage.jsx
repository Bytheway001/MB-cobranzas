import React, { useEffect, useState } from 'react';
import { Row, Card, Col, FormGroup, Table, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ClientSelect } from '../../custom/ClientSelector';
import { getClientList, selectClient, selectClientPolicy } from '../../../ducks/clients';
import { PolicySelector } from '../../custom/PolicySelector';
import PaymentPolicyForm from './components/PolicyForm';
import { API } from '../../../utils/utils';
import Axios from 'axios';



const PolicyPaymentsPage = ({ clients, getClientList, selectClient, editing, selectClientPolicy }) => {
    let [history, setHistory] = useState(null);
    let policy = editing && editing.policies.find(x => x.selected);

    useEffect(() => {
        if (policy) {
            getPayments(policy)
        }
    }, [policy])
    const getPayments = (policy) => {
        Axios.get(API + '/payments/policy/' + policy.id).then(res => {
            setHistory(res.data.data)
        })
    }



    return (
        <Row>
            <Col sm={3}>
                <Card className='h-100'>
                    <Card.Header className='bg-primary text-white'>Seleccion de Cliente</Card.Header>
                    <Card.Body>
                        <FormGroup>
                            <label>Cliente</label>
                            <ClientSelect
                                selected={editing}
                                onSearch={getClientList}
                                title='Cliente'
                                options={clients.list}
                                isLoading={clients.loading}
                                onChange={selectClient}
                            />
                        </FormGroup>
                        {
                            editing &&
                            <>
                                <FormGroup>
                                    <PolicySelector options={editing.policies} selected={[]} onChange={(val) => selectClientPolicy(val)} title='Poliza'></PolicySelector>
                                </FormGroup>

                                {
                                    policy &&
                                    <Table size='sm'>
                                        <tr>
                                            <th>Aseguradora</th>
                                            <th>{policy.company.name}</th>
                                        </tr>
                                        <tr>
                                            <th>Plan</th>
                                            <th>{policy.plan.name}</th>
                                        </tr>
                                        <tr>
                                            <th># Poliza</th>
                                            <th>{policy.policy_number}</th>
                                        </tr>
                                        <tr>
                                            <th>Prima</th>
                                            <th>{policy.premium}</th>
                                        </tr>
                                        <tr>
                                            <th>Cobrado</th>
                                            <th>{policy.totals.collected}</th>
                                        </tr>
                                        <tr>
                                            <th>Financiado</th>
                                            <th>{policy.totals.financed}</th>
                                        </tr>
                                        <tr>
                                            <th>Pagado a la Aseg</th>
                                            <th>{policy.totals.payed}</th>
                                        </tr>
                                    </Table>
                                }
                            </>
                        }


                    </Card.Body>
                </Card>
            </Col>
            {policy &&
                <>
                    <Col sm={3}>
                        <Card className='h-100'>
                            <Card.Header className='bg-primary text-white'>Informacion del Pago</Card.Header>
                            <Card.Body>
                                <PaymentPolicyForm policy={policy} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className='h-100'>
                            <Card.Header className='bg-primary text-white'>Historial de Pagos</Card.Header>
                            <Card.Body>
                                {history && (
                                    <Table size='sm'>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Tipo</th>
                                            <th>Monto</th>
                                        </tr>
                                        {
                                            history.policy_payments.map((hist, k) => (
                                                <tr key={k}>
                                                    <td>{hist.payment_date}</td>
                                                    <td>{hist.payment_type}</td>
                                                    <td>{hist.amount} {hist.currency}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3}>
                        <Card className='h-100'>
                            <Card.Header className='bg-primary text-white'>Historial de Cobranzas</Card.Header>
                            <Card.Body>
                                {history && (
                                    <Table size='sm'>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Tipo</th>
                                            <th>Monto</th>
                                        </tr>
                                        {
                                            history.payments.map((hist, k) => (
                                                <tr key={k}>
                                                    <td>{hist.payment_date}</td>
                                                    <td>{hist.payment_type}</td>
                                                    <td>{hist.amount} {hist.currency}</td>
                                                </tr>
                                            ))
                                        }
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </>
            }
        </Row>
    )
}
const mapStateToProps = state => {
    return ({
        clients: state.clients,
        editing: state.clients.editing
    })
}
const mapDispatchToProps = dispatch => (
    {
        getClientList: (query) => dispatch(getClientList(query)),
        selectClient: (clientArr) => dispatch(selectClient(clientArr)),
        selectClientPolicy: (policyArr) => dispatch(selectClientPolicy(policyArr))
    }
)


export default connect(mapStateToProps, mapDispatchToProps)(PolicyPaymentsPage);