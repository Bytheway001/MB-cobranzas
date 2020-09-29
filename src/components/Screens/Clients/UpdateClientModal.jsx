import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col, FormGroup } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { UpdateClientPolicy } from '../../../ducks/clients';
import { getCollectors, getAgents } from '../../../ducks/agents'
import { Input, Select } from '../../custom/Controls';
import Axios from 'axios';
import { API } from '../../../utils/utils';

export const UpdateClientModal = ({ client, collectors, getCollectors, updateClientPolicy }) => {
    const [companies, setCompanies] = useState([]);
    const [plans, setPlans] = useState([]);
    const [show, setShow] = useState();
    const [selectedClient, setSelectedClient] = useState(client);
    useEffect(() => {
        Axios.get(API + '/companies').then(res => {
            setCompanies(res.data.data)
        })
        getCollectors()
    }, [getCollectors])


    function setValue(prop, value) {
        selectedClient[prop] = value;
        setSelectedClient({ ...selectedClient });
    }

    function listPlansByCompany(company_id) {
        Axios.get(API + '/plans/' + company_id).then(res => {
            setPlans(res.data.data)
        })
    }

    const handleCompanyChange = (value) => {
        setValue('company', value)
        listPlansByCompany(companies.find(x => x.name === value).id)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let sc = {
            email: selectedClient.email,
            phone: selectedClient.phone,
            company_id: selectedClient.company_id,
            plan: selectedClient.plan,
            option: selectedClient.option,
            collector_id: selectedClient.collector_id,
            frequency: selectedClient.frequency,
            prima: selectedClient.prima,
            policy_number: selectedClient.policy_number,
        }

        updateClientPolicy(selectedClient.id, sc)
        setShow(false)
    }

    const optionize = (arr) => {
        return arr.map((r, k) => <option key={k} value={r.id}>{r.name}</option>)
    }


    return (
        <>
            <Button size='sm' onClick={() => setShow(true)} block>Actualizar Poliza</Button>

            <Modal size='lg' show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedClient.first_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form id='clientModal' onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={6}>
                                <Input value={selectedClient.email} onChange={({ target }) => setValue('email', target.value)} label='E-mail' />
                                <Input value={selectedClient.phone} onChange={({ target }) => setValue('phone', target.value)} label='Telefono' />

                                <Select
                                    value={selectedClient.company}
                                    onChange={({ target }) => handleCompanyChange(target.value)}
                                    options={optionize(companies.map(x => ({ id: x.name, name: x.name })))}
                                    label="Aseguradora"
                                />
                                <Select
                                    value={selectedClient.plan}
                                    onChange={({ target }) => setValue('plan', target.value)}
                                    options={optionize(plans.map(x => ({ id: x.name, name: x.name })))}
                                    label="Plan"
                                />
                                <Input value={selectedClient.option} onChange={({ target }) => setValue('option', target.value)} label='Opcion' />



                            </Col>
                            <Col sm={6}>
                                <Input value={selectedClient.policy_number} onChange={({ target }) => setValue('policy_number', target.value)} label='Numero de Poliza' />
                                <FormGroup>
                                    <label>Cobrador:</label>
                                    <Typeahead bsSize='sm' options={collectors} selected={collectors.filter(x => x.id === selectedClient.collector_id)} labelKey='name' id='cobrador' clearButton={true} onChange={(o) => setValue('collector_id', o[0] ? o[0].id : null)} />
                                </FormGroup>
                                <Select value={selectedClient.frequency} onChange={({ target }) => setValue('frequency', target.value)} options={optionize([
                                    { id: 'Annual', name: 'Anual' },
                                    { id: 'Semiannual', name: 'Semestral' },
                                    { id: 'Montly', name: 'Mensual' },
                                    { id: 'Quarterly', name: 'Trimestral' }
                                ])} label='Frecuencia de pago' />
                                <Input value={selectedClient.prima} onChange={({ target }) => setValue('prima', target.value)} label='Prima' />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
            </Button>
                    <Button form='clientModal' type='submit' variant="primary">
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => (
    {
        client: state.clients.editing,
        collectors: state.agents.collectors
    }
)

const mapDispatchToProps = dispatch => (
    {
        updateClientPolicy: (id, data) => dispatch(UpdateClientPolicy(id, data)),

        getAgents: () => dispatch(getAgents()),
        getCollectors: () => dispatch(getCollectors())
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(UpdateClientModal)
