import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import { Companies } from '../../../utils/utils';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { UpdateClientPolicy, getCollectors } from '../../../ducks/agents';

export const UpdateClientModal = ({ client, updateClientPolicy, collectors, getCollectorList }) => {
    useEffect(() => {
        getCollectorList()
        // eslint-disable-next-line
    }, [])
    const initialState = {
        plan: [client.plan],
        option: client.option,
        company: Companies.find(x => x.name === client.company).slug,
        prima: client.prima,
        frequency: client.frequency,
        collector: [{ id: client.collector_id, name: client.collector }],
        policyType: client.policy_type,
        policyNumber: client.policy_number,
        phone: client.phone,
        email: client.email
    }


    const [show, setShow] = useState(false);
    const [plan, setPlan] = useState(initialState.plan);
    const [option, setOption] = useState(initialState.option);
    const [company, setCompany] = useState(initialState.company)
    const [prima, setPrima] = useState(initialState.prima)
    const [frequency, setFrequency] = useState(initialState.frequency)
    const [collector, setCollector] = useState(initialState.collector)
    const [policyNumber, setPolicyNumber] = useState(initialState.policyNumber)
    const [policyType, setPolicyType] = useState(initialState.policyType)
    const [phone, setPhone] = useState(initialState.phone)
    const [email, setEmail] = useState(initialState.email)
    const handleClose = () => {
        setShow(false)
        setPlan(initialState.plan)
        setOption(initialState.option)
        setCompany(initialState.company)
        setPrima(initialState.prima)
        setFrequency(initialState.frequency)
        setPhone(initialState.phone)
        setEmail(initialState.email)
    };
    const handleShow = () => {
        setPlan(initialState.plan)
        setOption(initialState.option)
        setCompany(initialState.company)
        setPrima(initialState.prima)
        setFrequency(initialState.frequency)
        setPhone(initialState.phone)
        setEmail(initialState.email)
        setShow(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let c = {
            id: client.id,
            plan: plan.length > 0 ? plan[0].name : '',
            option,
            company: Companies.find(x => x.slug === company).name,
            prima,
            frequency,
            collector_id: collector.length > 0 ? collector[0].id : '',
            policy_type: policyType,
            policy_number: policyNumber,
            phone: phone,
            email: email
        }

        updateClientPolicy(c.id, c)
        handleClose()
    }

    return (
        <>
            <Button size='sm' onClick={handleShow} block>Actualizar Poliza</Button>

            <Modal size='lg' show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Poliza de cliente</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form id='clientModal' onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={6}>
                            <FormGroup>
                                    <label>Email</label>
                                    <FormControl size='sm' value={email} onChange={({ target }) => setEmail(target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label>Telefono</label>
                                    <FormControl size='sm' value={phone} onChange={({ target }) => setPhone(target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label>Numero de Poliza</label>
                                    <FormControl size='sm' value={policyNumber} onChange={({ target }) => setPolicyNumber(target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label>Aseguradora</label>
                                    <FormControl size='sm' as='select' value={company} onChange={({ target }) => setCompany(target.value)}>
                                        <option value="">Seleccione...</option>
                                        {
                                            Companies.map((c, index) => (
                                                <option value={c.slug} key={index}>{c.name}</option>
                                            ))
                                        }
                                    </FormControl>

                                </FormGroup>
                                <FormGroup>
                                    <label>Plan</label>
                                    <Typeahead
                                        inputProps={{ required: true }}
                                        defaultInputValue=""
                                        id='plan'
                                        clearButton={true} size='sm'
                                        selected={plan}
                                        options={(Companies.find(x => x.slug === company.id) && Companies.find(x => x.slug === company).plans.map(plan => plan)) || []}
                                        allowNew={true}
                                        onChange={setPlan}
                                        labelKey='name'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label>Opcion</label>
                                    <FormControl size='sm' value={option} onChange={({ target }) => setOption(target.value)} />

                                </FormGroup>
                            </Col>

                            <Col sm={6}>
                                <FormGroup>
                                    <label>Prima</label>
                                    <FormControl size='sm' value={prima} onChange={({ target }) => setPrima(target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <label>Frecuencia de Pago</label>
                                    <FormControl as='select' size='sm' value={frequency} onChange={({ target }) => setFrequency(target.value)}>
                                        <option value='Anual'>Anual</option>
                                        <option value='Semestral'>Semestral</option>
                                        <option value='Quincenal'>Quincenal</option>
                                        <option value='Mensual'>Mensual</option>
                                    </FormControl>

                                </FormGroup>
                                <FormGroup>
                                    <label>Tipo de Poliza</label>
                                    <FormControl as='select' size='sm' value={policyType} onChange={({ target }) => setPolicyType(target.value)}>
                                        <option value='Personal'>Personal</option>
                                        <option value='Familiar'>Famliiar</option>
                                        <option value='Corporativa'>Corporativa</option>

                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <label>Cobrador</label>
                                    <Typeahead
                                        inputProps={{ required: true }}
                                        defaultInputValue=""
                                        id='collector'
                                        clearButton={true} size='sm'
                                        selected={collector}
                                        options={collectors || []}
                                        onChange={setCollector}
                                        labelKey='name'
                                    />

                                </FormGroup>
                            </Col>

                        </Row>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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
        getCollectorList: () => dispatch(getCollectors())
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(UpdateClientModal)
