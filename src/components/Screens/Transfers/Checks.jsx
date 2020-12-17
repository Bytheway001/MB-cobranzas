import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';

import AccountsOptions from '../../../options/accounts';

import { SmartCard } from '../../library/SmartCard';
import { API } from '../../../utils/utils';
import { Select } from '../../../Controls';
export const View = () => {
    const [list, setList] = useState([]);
    const [checkId,setCheckId]=useState('');
    const [accountId,setAccountId]=useState("");
    useEffect(() => {
        Axios.get(API + '/checks').then(res => {
            setList(res.data.data)
        })
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const payload = {checkId,accountId}
        console.log(payload);
        Axios.post(API+'/checks/collect',payload).then(res=>{
            alert(res.data.data)
        })
    }

    return (
        <Row>
           
            <Col sm={12}>
                <SmartCard title="Cobro de Cheques">
                <Form onSubmit={handleSubmit}>
                    <Select value={checkId}  onChange={({target})=>setCheckId(target.value)} label='Cheque a cobrar' options={list.filter(x=>x.status==='En Oficina').map((x,k) => <option key={k} value={x.id}>{x.client} ({x.amount} {x.currency})</option>)} />
                    <Select value={accountId} onChange={({target})=>setAccountId(target.value)} label='Cuenta a abonar' options={<AccountsOptions except={[9]} />} />
                    <Button type='submit'>Cobrar Cheque</Button>
                </Form>
                </SmartCard>
            </Col>
        </Row>
    )
}

const mapStateToProps = () => (
    {

    }
)

const mapDispatchToProps = () => (
    {}
)
export const ChecksCollection = connect(mapStateToProps, mapDispatchToProps)(View)

