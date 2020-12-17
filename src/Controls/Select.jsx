import React from 'react';
import {FormControl} from 'react-bootstrap'


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
