import React from 'react';
import {FormGroup} from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker';

export const DatePicker = ({ label, onChange, value, ...props }) => (
    <FormGroup>
        <label>{label}</label>
        <ReactDatePicker autoComplete="off" {...props} className='form-control form-control-sm' onChange={onChange} dateFormat='dd-MM-yyyy' selected={value} />
    </FormGroup>
)
