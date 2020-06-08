import React,{useState} from 'react'
import {Card,FormGroup,Button,Row,Col} from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

export const DateSearch = ({onSearch}) => {
 
    const [from,setFrom]=useState(new Date());
    const [to,setTo]=useState(new Date());
    return (
        <Card>
            <Card.Header className='bg-primary text-white'>Rango de Fecha</Card.Header>
            <Card.Body>
                <FormGroup as={Row}>
                    <Col sm={3}>
                        <label>Desde:</label>
                    </Col>
                    <Col sm={9}>
                        <ReactDatePicker className='form-control' selected={from} dateFormat='dd/MM/yyyy' onChange={setFrom} />
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <Col sm={3}>
                        <label>Hasta:</label>
                    </Col>
                    <Col sm={9}>
                        <ReactDatePicker className='form-control' selected={to} dateFormat='dd/MM/yyyy' onChange={setTo} />
                    </Col>

                </FormGroup>
                <Button onClick={()=>onSearch(from,to)} block>Buscar</Button>
            </Card.Body>
        </Card>
    )
}