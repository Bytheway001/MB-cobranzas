import React, { useEffect, Fragment } from 'react';
import { Row, Col, Card, Form, FormGroup, FormControl, Button, InputGroup, Modal, Table } from 'react-bootstrap';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Typeahead } from 'react-bootstrap-typeahead';
import { getAgents, getCollectors, createClient, createBulkClients } from '../../../ducks/agents';
import { connect } from 'react-redux';
import CsvParse from '@vtex/react-csv-parse'
import { Companies } from '../../../utils/utils';
const NewClient = ({ agents, getAgents, collectors, getCollectors, createClient, createBulkClients }) => {
    const [name, setName] = useState('');
    const [agent, setAgent] = useState([])
    const [cobrador, setCobrador] = useState([])
    const [policyNumber, setPolicyNumber] = useState('')
    const [policyType, setPolicyType] = useState('')
    const [company, setCompany] = useState('')
    const [plan, setPlan] = useState([])
    const [option, setOption] = useState('')
    const [renovationYear, setRenovationYear] = useState('')
    const [renovationMonth, setRenovationMonth] = useState('')
    const [renovationDay, setRenovationDay] = useState('')
    const [effectiveYear, setEffectiveYear] = useState('')
    const [effectiveMonth, setEffectiveMonth] = useState('')
    const [effectiveDay, setEffectiveDay] = useState('')
    const [frequency, setFrequency] = useState('')
    const [prima, setPrima] = useState('')

    useEffect(() => {
        getAgents();
        getCollectors()

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        let renovationDate = `${renovationDay}-${renovationMonth}-${renovationYear}`
        let effectiveDate = `${effectiveDay}-${effectiveMonth}-${effectiveYear}`
        let client = {
            name,
            agent_id: agent[0].id,
            collector_id: cobrador[0].id,
            policy_number: policyNumber,
            policy_type: policyType,
            company,
            plan: plan[0].name,
            option,
            renovation_date: renovationDate,
            effective_date: effectiveDate,
            frequency,
            prima
        }
        console.log(client)
        createClient(client)
    }
    const year = new Date().getFullYear()
    const keys = [
        'name',
        'agent',
        'collector',
        'company',
        'plan',
        'option',
        'policy_number',
        'policy_type',
        'prima',
        'effective_date',
        'renovation_date',
        'frequency'
    ]


    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header className='bg-primary text-light' >Datos del Usuario</Card.Header>
                            <Card.Body>
                                <FormGroup>
                                    <label>Nombre y Apellido:</label>
                                    <FormControl required value={name} size='sm' onChange={({ target }) => setName(target.value)} />

                                </FormGroup>
                                <FormGroup>
                                    <label>Agente:</label>
                                    <Typeahead inputProps={{ required: true }} id='agent' clearButton={true} size='sm' selected={agent} onChange={setAgent} labelKey='name' options={agents} />

                                </FormGroup>
                                <FormGroup>
                                    <label>Cobrador:</label>
                                    <Typeahead inputProps={{ required: true }} id='cobrador' clearButton={true} size='sm' selected={cobrador} labelKey='name' onChange={setCobrador} options={collectors} />

                                </FormGroup>
                                <Button type='submit'>Crear</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header className='bg-primary text-light' >Datos de la Poliza</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Numero de Poliza:</label>
                                            <FormControl required value={policyNumber} onChange={({ target }) => setPolicyNumber(target.value)} size='sm' />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Aseguradora:</label>
                                            <FormControl required size='sm' as='select' value={company} onChange={({ target }) => { setPlan([]); setCompany(target.value) }}>
                                                <option value="">Seleccione...</option>
                                                {
                                                    Companies.map(company => (
                                                        <option value={company.slug}>{company.name}</option>
                                                    ))
                                                }
                                            </FormControl>
                                        </FormGroup>
                                    </Col>

                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Plan:</label>


                                            <Typeahead
                                                inputProps={{ required: true }}
                                                defaultInputValue=""
                                                id='plan'
                                                clearButton={true} size='sm'
                                                selected={plan}
                                                options={Companies.find(x => x.slug === company) && Companies.find(x => x.slug === company).plans.map(plan => plan) || []}
                                                onChange={setPlan}
                                                labelKey='name'
                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Tipo de Poliza:</label>
                                            <FormControl required as='select' size='sm' value={policyType} onChange={({ target }) => setPolicyType(target.value)}>
                                                <option>Individual</option>
                                                <option>Familiar</option>
                                                <option>Corporativa</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Opcion:</label>
                                            <InputGroup size='sm'>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl required value={option} onChange={({ target }) => setOption(target.value)} size='sm' />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Fecha Renovacion:</label>
                                            <Row>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={year - 2} max={year + 2} required size='sm' placeholder='Año' value={renovationYear} onChange={({ target }) => setRenovationYear(target.value)} />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={12} required size='sm' value={renovationMonth} onChange={({ target }) => setRenovationMonth(target.value)} placeholder='Mes' />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={31} required size='sm' value={renovationDay} onChange={({ target }) => setRenovationDay(target.value)} placeholder='Dia' />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Fecha Efectiva:</label>
                                            <Row>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={year - 2} max={year + 2} required size='sm' placeholder='Año' value={effectiveYear} onChange={({ target }) => setEffectiveYear(target.value)} />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={12} required size='sm' value={effectiveMonth} onChange={({ target }) => setEffectiveMonth(target.value)} placeholder='Mes' />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={31} required size='sm' value={effectiveDay} onChange={({ target }) => setEffectiveDay(target.value)} placeholder='Dia' />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Frecuencia de Pago:</label>
                                            <FormControl required value={frequency} onChange={({ target }) => setFrequency(target.value)} as='select' size='sm'>
                                                <option value='Anual'>Anual</option>
                                                <option value='Semestral'>Semestral</option>
                                                <option value='Mensual'>Mensual</option>

                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <label>Prima Total:</label>
                                            <InputGroup size='sm'>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl required value={prima} onChange={({ target }) => setPrima(target.value)} size='sm' />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Form>
            <Row className='mt-5'>
                <Col sm={12} className='text-center'>
                    <BulkModal keys={keys} createBulkClients={createBulkClients} />
                </Col>
            </Row>
        </Fragment>

    )
}

const BulkModal = ({ keys, createBulkClients }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState([])
    const handleSubmit = (e) => {

        alert('a')
        createBulkClients(data)
        console.log(data)
    }
    return (
        <Fragment>
            <Button size='lg' variant="primary" onClick={handleShow}>Cargar Via CSV</Button>


            <Modal dialogClassName="modal-90w" size='lg' show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Crear Clientes en Masa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <CsvParse
                            keys={keys}
                            onDataUploaded={(data) => setData(data)}
                            render={onChange => <FormControl type='file' onChange={onChange} />} />
                    </FormGroup>
                    {
                        data.length > 0 &&
                        <Table size='sm' style={{ fontSize: '0.8em' }}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Agente</th>
                                    <th>Cobrador</th>
                                    <th>Aseguradora</th>
                                    <th>Plan</th>
                                    <th>Opcion</th>
                                    <th>Numero de Poliza</th>
                                    <th>Tipo de Poliza</th>
                                    <th>Prima</th>
                                    <th>Fecha Efectiva</th>
                                    <th>Fecha de Renovacion</th>
                                    <th>Frecuencia de Pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(client => (
                                        <tr>
                                            <td>{client.name}</td>
                                            <td>{client.agent}</td>
                                            <td>{client.collector}</td>
                                            <td>{client.company}</td>
                                            <td>{client.plan}</td>
                                            <td>{client.option}</td>
                                            <td>{client.policy_number}</td>
                                            <td>{client.policy_type}</td>
                                            <td>{client.prima}</td>
                                            <td>{client.effective_date}</td>
                                            <td>{client.renovation_date}</td>
                                            <td>{client.frequency}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="primary">Continuar</Button>
                </Modal.Footer>

            </Modal>

        </Fragment>
    );
}

const mapStateToProps = state => (
    {
        agents: state.agents.agents,
        collectors: state.agents.collectors
    }
)

const mapDispatchToProps = dispatch => ({
    getAgents: () => dispatch(getAgents()),
    getCollectors: () => dispatch(getCollectors()),
    createClient: (client) => dispatch(createClient(client)),
    createBulkClients: (clientList) => dispatch(createBulkClients(clientList))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewClient)