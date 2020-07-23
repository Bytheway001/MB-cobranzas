import React, { useState } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { CustomCard } from '../../custom/CustomCard';
import { Input, DatePicker, Select } from '../../custom/Controls';
import AccountsOptions from '../../../options/accounts';
import { CurrencyOptions } from '../../../options/options';
import { API } from '../../../ducks/root';
import Axios from 'axios';
export const OtherPayment = () => {
    const [date, setDate] = useState(0);
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState("");
    const [amount,setAmount]=useState("");
    const [currency,setCurrency]=useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(window.confirm("Desea realizar esta operacion?")){
            Axios.post(API+'/income',{date,description,account_id:account,amount,currency}).then(res=>{
                console.log(res.data.data)
            })
            .catch(err=>{
                console.log(err.response)
            })
        }

    }

    return (
        <Row>
            <Col sm={12}>
                <CustomCard title='Otros ingresos'>
                    <Form onSubmit={handleSubmit}>
                        <DatePicker value={date} onChange={setDate} dateFormat='dd/MM/yyyy' label="Fecha"/>
                        <Input value={description} onChange={({target})=>setDescription(target.value)} label='Descripcion'/>
                        <Input value={amount} onChange={({target})=>setAmount(target.value)} label='Cantidad'/>
                        <Select value={currency} options={<CurrencyOptions/>} onChange={({target})=>setCurrency(target.value)} value={currency} label='Moneda'/>
                        <Select label='Cuenta Receptora' options={<AccountsOptions except={[9]} />} value={account} onChange={({ target }) => setAccount(target.value)} />
                        <Button type='Submit'>Registrar Ingreso</Button>
                    </Form>
                </CustomCard>
            </Col>
        </Row>
    )
}