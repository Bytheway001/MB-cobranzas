// Formulario para pagos de poliza
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import ClientSelect from '../../../custom/ClientSelect';
import { Select, Input } from '../../../custom/Controls';
import AccountsOptions from '../../../../options/accounts';
import { CurrencyOptions } from '../../../../options/options';
import Axios from 'axios';
import { API } from '../../../../ducks/root';
import { Fragment } from 'react';

export const PaymentPolicyForm = ({selectedClient}) => {
    const [client, setClient] = useState([]);
    const [account, setAccount] = useState(0);
    const [currency, setCurrency] = useState('USD');
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState("");
    const [policyStatus, setPolicyStatus] = useState('Pendiente')
    const [finance,setFinance]=useState('');
    const [loading,setLoading]=useState(false)
    /* Esta es la data acomodada para enviar al servidor */
    useEffect(()=>{
        if(selectedClient.length>0){
            setClient(selectedClient)
        }
    },[selectedClient])
    let payload = { client_id: client.length > 0 ? client[0].id : null, account_id:account, currency, amount, comment,policy_status:policyStatus }

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault()
        Axios.post(API + '/payments/policy', payload).then(res => {
            setLoading(false)
            alert('Pago registrado con exito')
        })
        .catch(err=>{
            setLoading(true)
            alert(err.response.data.data)
        })
    }
    return (
        <div>

            <Form onSubmit={handleSubmit}>
                <Select label='Cuenta Pagadora:' options={<AccountsOptions except={[9]} />} onChange={(e) => setAccount(e.target.value)} selected={client} />
                <Select label='Moneda:' onChange={({ target }) => setCurrency(target.value)} options={<CurrencyOptions />} value={currency} />
                <Input label='Monto Cancelado' value={amount} onChange={({ target }) => setAmount(target.value)} />
                <Select label='Marcar Poliza como:' value={policyStatus} options={
                    <Fragment>
                        {
                            ['Pagada', 'Financiada', 'Pendiente'].map((e) => <option value={e}>{e}</option>)
                        }
                    </Fragment>
                } onChange={({target})=>setPolicyStatus(target.value)}/>
                 {policyStatus==='Financiada' && <Input type='number' value={finance} label='Monto Financiado' onChange={({ target }) => setFinance(target.value)} />}
                <FormGroup>
                    <label>Notas:</label>
                    <FormControl value={comment} onChange={({ target }) => setComment(target.value)} as='textarea'>

                    </FormControl>
                </FormGroup>
                <Button type='submit' size='sm' block>Registrar Pago</Button>
            </Form>
        </div >
    )
}