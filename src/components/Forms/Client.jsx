import React, { useEffect, useState } from 'react'
import { Form, Row, Col, FormGroup, FormControl, InputGroup, Button, Modal } from 'react-bootstrap'
import { Input, AgentSelector, CollectorSelector, CompanySelect, PlanSelect, Select } from '../custom/Controls'
import { getAgents } from '../../ducks/agents'
import { createClient, UpdateClientPolicy } from '../../ducks/clients'
import { connect } from 'react-redux'

const ClientForm = ({ createClient, modal, client, updateClient }) => {
    const year = new Date().getFullYear()
    const [agent_id, setAgentId] = useState('');
    const [first_name, setFirstName] = useState("");
    const [policy_number, setPolicyNumber] = useState("");
    const [company_id, setCompanyId] = useState("")
    const [collector_id, setCollectorId] = useState("")
    const [plan, setPlan] = useState("")
    const [option, setOption] = useState("")
    const [effective_date, setEffectiveDate] = useState('')
    const [renovation_date, setRenovationDate] = useState("");
    const [frequency, setFrequency] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState("")
    const [show, setShow] = useState(false)
    const [prima, setPrima] = useState('');
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = { agent_id, first_name, policy_number, company_id, collector_id, plan, option, effective_date, renovation_date, frequency, email, phone, prima, comment }

        if (client) {
            updateClient(client.id, payload)
            setShow(false)
        }
        else {
            createClient(payload)
            setShow(false)
        }


    }

    const refreshClient = () => {
        if (client) {
            setPhone(client.phone)
            setCollectorId(client.collector_id)
            setAgentId(client.agent_id)
            setFirstName(client.first_name)
            setPolicyNumber(client.policy_number)
            setCompanyId(client.company_id)
            setPlan(client.plan)
            setOption(client.option)
            setEffectiveDate(client.effective_date)
            setRenovationDate(client.renovation_date)
            setFrequency(client.frequency)
            setEmail(client.email)
            setComment(client.comment)
            setPrima(client.prima)
        }
    }


    useEffect(() => {
        refreshClient()
        getAgents()
    }, [client])

    const form = (
        <Form onSubmit={handleSubmit} id='client_form'>
            <Row>
                <Col sm={6}>
                    <Input value={first_name} onChange={({ target }) => setFirstName(target.value)} label='Nombre completo' />
                    <AgentSelector value={agent_id} onChange={(id) => setAgentId(id)} label='Agente' />
                 
                    <CollectorSelector value={collector_id} onChange={(id) => setCollectorId(id)} label='Cobrador' />


                    <Input value={policy_number} onChange={({ target }) => setPolicyNumber(target.value)} label='# Poliza' />
                    <Input value={email} onChange={({ target }) => setEmail(target.value)} label='Email' />
                    <Input value={phone} onChange={({ target }) => setPhone(target.value)} label='Telefono' />
                </Col>
                <Col sm={6}>
                    <CompanySelect label='Compañia' value={company_id} onChange={({ target }) => setCompanyId(target.value)} />
                    <PlanSelect value={plan} label='Plan' company={company_id} onChange={({ target }) => setPlan(target.value)} />
                    <Input type='number' min='0' value={option} onChange={({ target }) => setOption(target.value)} label='Opcion' />
                    <Row>
                        <Col sm={6}>
                            <CustomDatePicker value={effective_date} onChange={(val) => setEffectiveDate(val)} label='Fecha Efectiva' />
                        </Col>
                        <Col sm={6}>
                            <CustomDatePicker value={renovation_date} onChange={(val) => setRenovationDate(val)} label='Fecha de Renovacion' />
                        </Col>
                    </Row>
                    <Select options={['Semestral', 'Anual', 'Mensual', 'Trimestral'].map((f, k) => <option key={k} value={f}>{f}</option>)} value={frequency} onChange={({ target }) => setFrequency(target.value)} label='Frecuencia de pago' />
                    <Input value={prima} onChange={({ target }) => setPrima(target.value)} label='Prima Total Anualizada' />
                </Col>
                <Col sm={6}>
                    <FormGroup>
                        <label>Comentarios:</label>
                        <FormControl as='textarea' value={comment} onChange={({ target }) => setComment(target.value)} />
                    </FormGroup>

                </Col>
                <Col sm={6}>

                    {!client && <Button type='submit' style={{ fontSize: '1.5em' }} className='h-100' block>Crear Cliente</Button>}
                </Col>
            </Row>


        </Form>
    )

    if (!modal) {
        return form
    }
    else {
        return (
            <>

                <Button size='sm' onClick={() => setShow(true)} block>Actualizar Poliza</Button>
                <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {form}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                        <Button form='client_form' type='submit' variant="primary">Actualizar</Button>
                    </Modal.Footer>
                </Modal>
            </>


        )
    }

}

const NCF = ({ createClient, modal, client, updateClient }) => {
    const year = new Date().getFullYear()
    const [agent_id, setAgentId] = useState('');
    const [first_name, setFirstName] = useState("");
    const [policy_number, setPolicyNumber] = useState("");
    const [company_id, setCompanyId] = useState("")
    const [collector_id, setCollectorId] = useState("")
    const [plan, setPlan] = useState("")
    const [option, setOption] = useState("")
    const [effective_date, setEffectiveDate] = useState('')
    const [renovation_date, setRenovationDate] = useState("");
    const [frequency, setFrequency] = useState("")
    const [email, setEmail] = useState("")
    const [comment, setComment] = useState("")
    const [show, setShow] = useState(false)
    const [prima, setPrima] = useState('');
    const [phone, setPhone] = useState("");
    const [h_id, setHubspotId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = { agent_id, first_name, policy_number, company_id, collector_id, plan, option, effective_date, renovation_date, frequency, email, phone, prima, comment, h_id }
        createClient(payload)
        setShow(false)

    }



    useEffect(() => {

        getAgents()
    }, [client])

    const form = (
        <Form onSubmit={handleSubmit} id='new_client_form'>
            <Row>
                <Col sm={6}>
                    <Input value={first_name} onChange={({ target }) => setFirstName(target.value)} label='Nombre completo' />
                    {}
                    <AgentSelector value={agent_id} onChange={(id) => setAgentId(id)} label='Agente' />
                    <CollectorSelector value={collector_id} onChange={(id) => setCollectorId(id)} label='Cobrador' />
                    <Input value={policy_number} onChange={({ target }) => setPolicyNumber(target.value)} label='# Poliza' />
                    <Input value={email} onChange={({ target }) => setEmail(target.value)} label='Email' />
                    <Input value={phone} onChange={({ target }) => setPhone(target.value)} label='Telefono' />
                    <Input value={h_id} onChange={({ target }) => setHubspotId(target.value)} label='ID Hubspot' />
                </Col>
                <Col sm={6}>
                    <CompanySelect label='Compañia' value={company_id} onChange={({ target }) => setCompanyId(target.value)} />
                    <PlanSelect value={plan} label='Plan' company={company_id} onChange={({ target }) => setPlan(target.value)} />
                    <Input type='number' min='0' value={option} onChange={({ target }) => setOption(target.value)} label='Opcion' />
                    <Row>
                        <Col sm={6}>
                            <CustomDatePicker value={effective_date} onChange={(val) => setEffectiveDate(val)} label='Fecha Efectiva' />
                        </Col>
                        <Col sm={6}>
                            <CustomDatePicker value={renovation_date} onChange={(val) => setRenovationDate(val)} label='Fecha de Renovacion' />
                        </Col>
                    </Row>
                    <Select options={['Semestral', 'Anual', 'Mensual', 'Trimestral'].map((f, k) => <option key={k} value={f}>{f}</option>)} value={frequency} onChange={({ target }) => setFrequency(target.value)} label='Frecuencia de pago' />
                    <Input value={prima} onChange={({ target }) => setPrima(target.value)} label='Prima Total Anualizada' />
                    <FormGroup>
                        <label>Comentarios:</label>
                        <FormControl as='textarea' value={comment} onChange={({ target }) => setComment(target.value)} />
                    </FormGroup>
                </Col>
                <Col sm={6}>


                </Col>

            </Row>


        </Form>
    )

    if (!modal) {
        return form
    }
    else {
        return (
            <>

                <Button size='sm' onClick={() => setShow(true)} block>Crear Cliente</Button>
                <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {form}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShow(false)}>Cancelar</Button>
                        <Button variant='success' form='new_client_form' type='submit' variant="primary">Crear</Button>
                    </Modal.Footer>
                </Modal>
            </>


        )
    }

}

const CustomDatePicker = ({ label, onChange, value }) => {
    let v = value.split('-')
    const [day, setDay] = useState(v[0] ? v[0] : '');
    const [month, setMonth] = useState(v[1] ? v[1] : '');
    const [year, setYear] = useState(v[2] ? v[2] : '');
    useEffect(() => {
        onChange(day + '-' + month + '-' + year)
    }, [day, month, year])

    return (
        <FormGroup size='sm'>
            <label>{label}:</label>
            <InputGroup size='sm'>
                <FormControl type='number' min={1} max={31} required size='sm' value={day} onChange={({ target }) => setDay(target.value)} placeholder='Dia' />
                <FormControl type='number' min={1} max={12} required size='sm' value={month} onChange={({ target }) => setMonth(target.value)} placeholder='Mes' />
                <FormControl type='number' required size='sm' placeholder='Año' value={year} onChange={({ target }) => setYear(target.value)} />
            </InputGroup>
        </FormGroup>
    )
}

const mapStateToProps = state => {
    return {
        client: state.clients.editing
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getAgents: dispatch(getAgents()),
        createClient: (client) => dispatch(createClient(client)),
        updateClient: (id, data) => dispatch(UpdateClientPolicy(id, data))
    }
}

export const NewClientForm = connect(mapStateToProps, mapDispatchToProps)(NCF);
export default connect(mapStateToProps, mapDispatchToProps)(ClientForm)