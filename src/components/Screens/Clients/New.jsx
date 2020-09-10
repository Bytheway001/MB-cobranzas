import React, { useEffect, Fragment } from 'react';
import { Row, Col, Form, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Typeahead } from 'react-bootstrap-typeahead';
import { getAgents, getCollectors } from '../../../ducks/agents';
import { createClient, createBulkClients } from '../../../ducks/clients'
import { connect } from 'react-redux';
import { BulkModal } from './BulkModal';
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { SmartCard } from '../../library/SmartCard';
const NewClient = ({ agents, getAgents, collectors, getCollectors, createClient, createBulkClients }) => {
    const [first_name, setFirstName] = useState('');
    const [comment, setComment] = useState('');
    const [last_name, setLastName] = useState('');
    const [agent, setAgent] = useState([])
    const [collector, setCollector] = useState([])
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
    const [h_id, setHubspotId] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [companies,setCompanies]=useState([]);
    const [plans,setPlans]=useState([]);
    function listPlansByCompany(company_id){
        Axios.get(API+'/plans/'+company_id).then(res=>{
            setPlans(res.data.data)
        })
    }

    useEffect(() => {
        Axios.get(API+'/companies').then(res=>{
           setCompanies(res.data.data)
        })
        getAgents();
        getCollectors()
    }, [getAgents,getCollectors])

    const handleCompanyChange=(value)=>{
        setCompany(value)
        listPlansByCompany(value)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        let renovationDate = `${renovationDay}-${renovationMonth}-${renovationYear}`
        let effectiveDate = `${effectiveDay}-${effectiveMonth}-${effectiveYear}`
        let client = {
            first_name: first_name + ' ' + last_name,
            agent_id: agent[0].id,
            collector_id: collector[0].id,
            policy_number: policyNumber,
            policy_type: policyType,
            company: company,
            plan: plan[0].name,
            option,
            renovation_date: renovationDate,
            effective_date: effectiveDate,
            frequency,
            prima,
            email,
            phone,
            comment
        }
        console.log(client)
        createClient(client)
        
    }

    const year = new Date().getFullYear()
    const keys = [
        'company',
        'policy_number',
        'h_id',
        'collector',
        'name',
        'plan',
        'option',
        'effective_date',
        'renovation_date',
        'prima',
        'frequency',
        'agent',
        'email',
        'phone',
        'comment',
    ]

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <SmartCard title='Datos del Usuario'>

                            <FormGroup as={Row}>
                                <Col sm={6}>
                                    <label>Email:</label>
                                    <FormControl required value={email} size='sm' onChange={({ target }) => setEmail(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <label>Nombre:</label>
                                    <FormControl required value={first_name} size='sm' onChange={({ target }) => setFirstName(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <label>Apellido:</label>
                                    <FormControl required value={last_name} size='sm' onChange={({ target }) => setLastName(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <label>Telefono:</label>
                                    <FormControl required value={phone} size='sm' onChange={({ target }) => setPhone(target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <Col sm={6}>
                                    <label>ID en Hubspot</label>
                                    <FormControl value={h_id} size='sm' onChange={({ target }) => setHubspotId(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <label>Cobrador:</label>
                                    <Typeahead inputProps={{ required: true }} id='cobrador' clearButton={true} size='sm' selected={collector} labelKey='name' onChange={setCollector} options={collectors} />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <label>Agente:</label>
                                <Typeahead inputProps={{ required: true }} id='agent' clearButton={true} size='sm' selected={agent} onChange={setAgent} labelKey='name' options={agents} />

                            </FormGroup>
                            <FormGroup>

                            </FormGroup>

                            <FormGroup>
                                <label>Comentario:</label>
                                <FormControl as='textarea' value={comment} size='sm' onChange={({ target }) => setComment(target.value)} />
                            </FormGroup>

                        </SmartCard>
                    </Col>
                    <Col md={6}>
                        <SmartCard title="Datos de la poliza">
  
                         
                                <Row>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Numero de Poliza:</label>
                                            <FormControl required value={policyNumber} onChange={({ target }) => setPolicyNumber(target.value)} size='sm' />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Aseguradora:</label>
                                            <FormControl required size='sm' as='select' value={company} onChange={({ target }) => { setPlan([]); handleCompanyChange(target.value) }}>
                                                <option value="">Seleccione...</option>
                                                {
                                                    companies.map(company => (
                                                        <option value={company.id}>{company.name}</option>
                                                    ))
                                                }
                                            </FormControl>
                                        </FormGroup>
                                    </Col>

                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Plan:</label>


                                            <Typeahead
                                                inputProps={{ required: true }}
                                                defaultInputValue=""
                                                id='plan'
                                                clearButton={true} size='sm'
                                                selected={plan}
                                                options={(plans && plans.map(plan => plan)) || ([])}
                                                onChange={setPlan}
                                                labelKey='name'
                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Tipo de Poliza:</label>
                                            <FormControl required as='select' size='sm' value={policyType} onChange={({ target }) => setPolicyType(target.value)}>
                                                <option>Individual</option>
                                                <option>Familiar</option>
                                                <option>Corporativa</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
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
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Fecha Renovacion:</label>
                                            <Row>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={31} required size='sm' value={renovationDay} onChange={({ target }) => setRenovationDay(target.value)} placeholder='Dia' />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={12} required size='sm' value={renovationMonth} onChange={({ target }) => setRenovationMonth(target.value)} placeholder='Mes' />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={year - 2} max={year + 2} required size='sm' placeholder='Año' value={renovationYear} onChange={({ target }) => setRenovationYear(target.value)} />

                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Fecha Efectiva:</label>
                                            <Row>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={31} required size='sm' value={effectiveDay} onChange={({ target }) => setEffectiveDay(target.value)} placeholder='Dia' />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={1} max={12} required size='sm' value={effectiveMonth} onChange={({ target }) => setEffectiveMonth(target.value)} placeholder='Mes' />
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={4}>
                                                    <FormGroup>
                                                        <FormControl type='number' min={year - 2} max={year + 2} required size='sm' placeholder='Año' value={effectiveYear} onChange={({ target }) => setEffectiveYear(target.value)} />

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Frecuencia de Pago:</label>
                                            <FormControl required value={frequency} onChange={({ target }) => setFrequency(target.value)} as='select' size='sm'>
                                                <option value=''>Seleccione...</option>
                                                <option value='Anual'>Anual</option>
                                                <option value='Semestral'>Semestral</option>
                                                <option value='Trimestral'>Trimestral</option>
                                                <option value='Mensual'>Mensual</option>

                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <FormGroup>
                                            <label>Prima Total:</label>
                                            <InputGroup size='sm'>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>$</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl required value={prima} onChange={({ target }) => setPrima(target.value)} size='sm' />
                                            </InputGroup>
                                        </FormGroup>
                                        <Button type='submit'>Crear</Button>
                                    </Col>

                                </Row>
                           
                        </SmartCard>
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