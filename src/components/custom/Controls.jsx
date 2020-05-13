import React from 'react';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

export const Input = ({ label, type, onChange, value, ...props }) => (
    <FormGroup>
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

export const Select = ({ label, onChange, value, controlOptions, options, ...props }) => (
    <FormGroup >
        <label>{label}</label>
        <FormControl size='sm' value={value} onChange={onChange} as='select' {...controlOptions}>
            <option value="">Seleccione...</option>
            {options}
        </FormControl>
    </FormGroup>
)

export const DatePicker = ({ label, onChange, value, ...props }) => (
    <FormGroup>
        <label>{label}</label>
        <ReactDatePicker {...props} className='form-control form-control-sm' onChange={onChange} dateFormat='dd/MM/yyyy' selected={value} />
    </FormGroup>
)

