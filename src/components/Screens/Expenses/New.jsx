import React, { useState } from 'react'
import { Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { Select, DatePicker, Input } from '../../custom/Controls';
import { OfficeOptions, CurrencyOptions, CategoryOptions, AccountsOptions } from '../../../options/options';

const NewExpense = props => {
    const [date, setDate] = useState('');
    const [office, setOffice] = useState('');
    const [bill_number, setBillNumber] = useState("");
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("");
    const [currency, setCurrency] = useState("");
    const [category, setCategory] = useState("");
    console.log(date)
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { date, office, bill_number, description, amount, account, currency,category }
        Axios.post(API + '/expenses', data).then(res => {
            console.log(res.data)
        })
    }

    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Nuevo Gasto</h1>
            </Col>
            <Col sm={{ span: 4, offset: 4 }}>
                <Form onSubmit={handleSubmit}>
                    <Select label='Oficina' options={<OfficeOptions />} value={office} onChange={({ target }) => setOffice(target.value)} />
                    <DatePicker label='Fecha de pago' required={true} onChange={setDate} dateFormat='dd/MM/yyyy' value={date} />
                    <Input label='# Factura' value={bill_number} onChange={({ target }) => setBillNumber(target.value)} />
                    <Input label='Descripcion' value={description} onChange={({ target }) => setDescription(target.value)} />
                    <Row>
                        <Col sm={6}>
                            <Select label='Moneda' options={<CurrencyOptions />} value={currency} onChange={({ target }) => setCurrency(target.value)} />
                        </Col>
                        <Col sm={6}>
                            <Input label='Monto' value={amount} onChange={({ target }) => setAmount(target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Select label='Categoria' options={<CategoryOptions />} onChange={({ target }) => setCategory(target.value)} />
                        </Col>
                        <Col sm={6}>
                            <Select label='Cuenta Pagadora' options={<AccountsOptions />} onChange={({ target }) => setAccount(target.value)} />
                        </Col>
                    </Row>
                    <Button type='submit' block>Registrar Gasto</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default NewExpense