import React from 'react';
import {FormGroup,InputGroup,FormControl} from 'react-bootstrap'
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