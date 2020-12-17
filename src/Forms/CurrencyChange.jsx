import React, { useEffect } from 'react';
import { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import Axios from 'axios';
import { API } from '../utils/utils';
import { Input, Select } from '../Controls';


const CurrencyChange = () => {
    const [show,setShow]=useState(false);
    const [account_from, setAccountFrom] = useState('');
    const [account_to, setAccountTo] = useState("");
    const [amount, setAmount] = useState("");
    const [currencyRate, setCurrencyRate] = useState("")
    const [currency, setCurrency] = useState("");
    const [accounts, setAccounts] = useState([]);

    const refreshAccounts = () => {
        Axios.get(API + '/accounts').then(res => {
            setAccounts(res.data.data);
        })
    }
    useEffect(() => {
        refreshAccounts();
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            from: account_from,
            to: account_to,
            amount: amount,
            rate: currencyRate,
            type: currency
        }
        Axios.post(API + '/convert', data).then(() => {
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    const changeTypes = [
        { value: 'USD/BOB', label: 'Dolares a Bolivianos' },
        { value: 'BOB/USD', label: 'Bolivianos a Dolares' }
    ]


    return (
        <>
            <Button block size='sm' onClick={() => setShow(true)}>Cambiar Divisas</Button>
            <Modal size='lg' show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambio de Divisas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={6}>
                                <Select value={account_from} onChange={({ target }) => setAccountFrom(target.value)} options={accounts.map((a,k) => <option key={k} value={a.id}>{a.name}</option>)} label="Cuenta a Debitar" />
                            </Col>
                            <Col sm={6}>
                                <Select value={account_to} onChange={({ target }) => setAccountTo(target.value)} options={accounts.map((a,k) => <option key={k} value={a.id}>{a.name}</option>)} label="Cuenta a Abonar" />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Select value={currency} onChange={({ target }) => setCurrency(target.value)} options={changeTypes.map((o,k) => <option key={k} value={o.value}>{o.label}</option>)} label='Transaccion a Realizar' />
                            </Col>
                            <Col sm={6}>
                                <Input value={currencyRate} onChange={({ target }) => setCurrencyRate(target.value)} type='number' label='Tipo de Cambio' />
                            </Col>
                            <Col sm={12}>
                                <Input value={amount} onChange={({ target }) => setAmount(target.value)} type='number' label='Cantidad' />
                            </Col>
                        </Row>
                        <Button block size='sm' type='submit'>Cambiar divisas</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => setShow(false)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default CurrencyChange;