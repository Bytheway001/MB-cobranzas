import React, { useState } from 'react'
import {  FormGroup, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

class CustomInput extends React.Component {
    render() {
        let {onClick, value, onChange, disabled,label} = this.props
        return (
            <FormGroup>
                <InputGroup size='sm'>
                    <InputGroup.Prepend>
                        <InputGroup.Text>{label}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl size='sm' onClick={onClick} value={value} onChange={onChange} disabled={disabled} />
                </InputGroup>
            </FormGroup>
        )
    }
}
export const DateSearch = ({ onSearch }) => {

    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    return (
        <>
            <FormGroup as={Row}>

                <Col sm={4}>
                    <ReactDatePicker customInput={<CustomInput label='Desde:' />} selected={from} dateFormat='dd/MM/yyyy' onChange={setFrom} />

                </Col>
                <Col sm={4}>
                    <ReactDatePicker customInput={<CustomInput label='Hasta:' />} selected={to} dateFormat='dd/MM/yyyy' onChange={setTo} />

                </Col>
                <Col sm={4}>
                    <Button size='sm' onClick={() => onSearch(from, to)} block>Buscar</Button>
                </Col>
            </FormGroup>


        </>
    )
}