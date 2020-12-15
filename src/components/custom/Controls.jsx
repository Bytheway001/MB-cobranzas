import React, { useEffect } from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { getAgents, getCollectors } from '../../ducks/agents';
import Axios from 'axios';
import { useState } from 'react';

import { API } from '../../utils/utils';

export const Input = ({ label, type, onChange, value, ...props }) => (
    <FormGroup >
        <label>{label}</label>
        {
            props.prepend ?
                <InputGroup size='sm'>
                    <InputGroup.Prepend>
                        <InputGroup.Text>{props.prepend}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type={type} {...props} size='sm' value={value} onChange={onChange} />
                </InputGroup>
                :
                <FormControl type={type} {...props} size='sm' value={value} onChange={onChange} />
        }

    </FormGroup>
)

export const Select = ({ label, onChange, value, options,  ...props }) => {

    return (
        <>
            <label>{label}</label>
            <FormControl size='sm' value={value} onChange={onChange} as='select' {...props}>
                <option value="">Seleccione...</option>
                {options}
            </FormControl>
        </>
    )
}

export const DatePicker = ({ label, onChange, value, ...props }) => (
    <FormGroup>
        <label>{label}</label>
        <ReactDatePicker autoComplete="off" {...props} className='form-control form-control-sm' onChange={onChange} dateFormat='dd-MM-yyyy' selected={value} />
    </FormGroup>
)

const AgentSelect = ({ agents, onChange, value, getAgentList, label }) => {
    useEffect(() => {
        getAgentList()

    }, [getAgentList])

    const handleChange = newValue => {

        if (newValue[0]) {
            onChange(newValue[0].id)
        }
        else {
            onChange(null)
        }
    }
    return (
        <FormGroup>
            <label>{label}</label>
            <Typeahead id='agent' size='sm' options={agents} onChange={handleChange} selected={value ? [agents.find(x => x.id === parseInt(value))] : []} labelKey='name' clearButton={true} />
        </FormGroup>
    )
}

const CollectorSelect = ({ collectors, onChange, getCollectorList, label, value }) => {
    useEffect(() => {
        getCollectorList()
    }, [getCollectorList])

    const handleChange = value => {
        if (value[0]) {
            onChange(value[0].id)
        }
        else {
            onChange(null)
        }
    }



    return (
        <>
            <FormGroup>
                <label>{label}</label>
                {collectors.length > 0 &&
                    <Typeahead id='collector' size='sm' options={collectors} onChange={handleChange} selected={value ? [collectors.find(x => x.id === parseInt(value))] : []} labelKey='name' clearButton={true} />
                }
            </FormGroup>
        </>
    )
}

export const CompanySelect = (props) => {
    const [companies, setCompanies] = useState([])
    useEffect(() => {
        Axios.get(API + '/companies').then(res => {
            setCompanies(res.data.data)
        })
    }, [])

    return (
        <Select {...props} options={companies.map(c => <option value={c.id} key={c.id}>{c.name}</option>)} />
    )
}

export const PlanSelect = ({ company, ...props }) => {
    const [plans, setPlans] = useState([])
    useEffect(() => {
        if (company) {
            Axios.get(API + '/plans/' + company).then(res => {
                setPlans(res.data.data)
            })
        }
        else {
            setPlans([])
        }

    }, [company])


    return (
        <Select {...props} options={plans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)} />
    )
}



const mapStateToProps = state => (
    {
        agents: state.agents.agents,
        collectors: state.agents.collectors,
        list: state.clients.list
    }
)

const mapDispatchToProps = dispatch => (
    {
        getAgentList: () => dispatch(getAgents()),
        getCollectorList: () => dispatch(getCollectors()),

    }
)

export const AgentSelector = connect(mapStateToProps, mapDispatchToProps)(AgentSelect)
export const CollectorSelector = connect(mapStateToProps, mapDispatchToProps)(CollectorSelect)
