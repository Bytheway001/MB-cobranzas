import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Select, Input } from '../../custom/Controls';
import AccountsOptions from '../../../options/accounts';
import { API } from '../../../ducks/root';
import Axios from 'axios'
import { CurrencyOptions } from '../../../options/options';
import { connect } from 'react-redux';
import { addNotification } from '../../../ducks/notifications';
const NewTransfer = ({setNotification}) =>{
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
    const [amount,setAmount]=useState("")
    const [currency,setCurrency]=useState("");
    const [error,setError]=useState("");
    const handleSubmit=(e)=>{
        setError("")
        let payload = {from,to,amount,currency}
        e.preventDefault();
        Axios.post(API+'/transfers',payload).then(res=>{
            setNotification('success','Transferencia realizada con exito')
        })
        .catch(err=>{
            setNotification('danger',err.response.data.data)
        })
    }
    
    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Transferencias Internas</h1>

            </Col>
            <Col sm={{span:4,offset:4}}>
                <Form onSubmit={handleSubmit}>
                <Select value={from} onChange={({target})=>setFrom(target.value)} label='Cuenta a Debitar:' options={<AccountsOptions except={[9]}/>}></Select>
                <Select value={to} onChange={({target})=>setTo(target.value)} label='Cuenta a Abonar:' options={<AccountsOptions except={[9]}/>}></Select>
                <Row>
                    <Col sm={6}>
                    <Select value={currency} onChange={({target})=>setCurrency(target.value)} options={<CurrencyOptions/>} label='Monto a transferir:'/>
                    </Col>
                    <Col sm={6}>
                    <Input value={amount} onChange={({target})=>setAmount(target.value)} label='Monto a transferir:'/>
                    </Col>
                </Row>
              
                <Button type='submit' block>Completar Transferencia</Button>
                {error && <p className='text-danger text-center mt-5'>{error}</p>}
                </Form>
            </Col>
        </Row>
    )
}



const mapDispatchToProps = dispatch =>(
    {
        setNotification:(type,text)=>dispatch(addNotification(type,text))
    }
)

export default connect(null,mapDispatchToProps)(NewTransfer)