import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { Select, Input } from '../../custom/Controls';
import AccountsOptions from '../../../options/accounts';
import { API } from '../../../ducks/root';
import Axios from 'axios'
import { CurrencyOptions } from '../../../options/options';
import { connect } from 'react-redux';
import { addNotification } from '../../../ducks/notifications';

import { SmartCard } from '../../library/SmartCard';
const NewTransfer = ({ setNotification }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("");
    const [error, setError] = useState("");
    const [comment,setComment]=useState("");
    const handleSubmit = (e) => {
        setError("")
        let payload = { from, to, amount, currency,comment }
        e.preventDefault();
        Axios.post(API + '/transfers', payload).then(res => {
            setNotification('success', 'Transferencia realizada con exito')
        })
            .catch(err => {
                setNotification('danger', err.response.data.data)
            })
    }

    return (
        <Row>
            <Col sm={{ span: 4, offset: 4 }}>
                <SmartCard title='Transferencias entre cuentas'>
                    <Form onSubmit={handleSubmit}>
                        <Select value={from} onChange={({ target }) => setFrom(target.value)} label='Cuenta a Debitar:' options={<AccountsOptions except={[9]} />}></Select>
                        <Select value={to} onChange={({ target }) => setTo(target.value)} label='Cuenta a Abonar:' options={<AccountsOptions except={[9]} />}></Select>
                        <Row>
                            <Col sm={6}>
                                <Select value={currency} onChange={({ target }) => setCurrency(target.value)} options={<CurrencyOptions />} label='Monto a transferir:' />
                            </Col>
                            <Col sm={6}>
                                <Input value={amount} onChange={({ target }) => setAmount(target.value)} label='Monto a transferir:' />
                            </Col>
                            <Col sm={12}>
                                <Input value={comment} onChange={({ target }) => setComment(target.value)} label='Comentario:' />
                            </Col>
                        </Row>

                        <Button type='submit' block>Completar Transferencia</Button>
                        {error && <p className='text-danger text-center mt-5'>{error}</p>}
                    </Form>
                </SmartCard>

            </Col>
        </Row>
    )
}



const mapDispatchToProps = dispatch => (
    {
        setNotification: (type, text) => dispatch(addNotification(type, text))
    }
)

export default connect(null, mapDispatchToProps)(NewTransfer)