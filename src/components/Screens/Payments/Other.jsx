import React, { useState } from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Input, DatePicker, Select } from '../../custom/Controls';
import AccountsOptions from '../../../options/accounts';
import { CurrencyOptions } from '../../../options/options';
import { API } from '../../../ducks/root';
import Axios from 'axios';
import { SmartCard } from '../../library/SmartCard';
import { addNotification } from '../../../ducks/notifications';
import { connect } from 'react-redux';
import { IncomeReceipt } from '../../../Receipts/Income';


const OtherPayment = ({ addNotification, user }) => {
    const [date, setDate] = useState(0);
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("");
    const [receipt, setReceipt] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm("Desea realizar esta operacion?")) {
            Axios.post(API + '/income', { date, description, account_id: account, amount, currency, user_id: user.id }).then(res => {

                addNotification('success', "Ingreso registrado con exito")
                console.log(res.data.data)
                setReceipt(res.data.data)
            })
                .catch(err => {
                    addNotification('danger', "No se pudo crear el ingreso")
                })
        }

    }

    return (
        <Row>
            <Col sm={6}>
                <SmartCard title='Otros ingresos'>
                    <Form onSubmit={handleSubmit}>
                        <DatePicker value={date} onChange={setDate} dateFormat='dd/MM/yyyy' label="Fecha" />
                        <Input value={description} onChange={({ target }) => setDescription(target.value)} label='Descripcion' />
                        <Input value={amount} onChange={({ target }) => setAmount(target.value)} label='Cantidad' />
                        <Select options={<CurrencyOptions />} onChange={({ target }) => setCurrency(target.value)} value={currency} label='Moneda' />
                        <Select label='Cuenta Receptora' options={<AccountsOptions except={[9]} />} value={account} onChange={({ target }) => setAccount(target.value)} />
                        <Button type='Submit'>Registrar Ingreso</Button>
                    </Form>
                </SmartCard>
            </Col>
            <Col sm={6}>
                {receipt && <IncomeReceipt data={receipt} user={user.name} />}
            </Col>
        </Row>
    )
}

const MSTP = state => (
    {
        user: state.session.user
    }
)

const MDTP = dispatch => (
    {
        addNotification: (type, text) => dispatch(addNotification(type, text))
    }
)

export default connect(MSTP, MDTP)(OtherPayment)