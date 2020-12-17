import React, { useState, useEffect } from 'react'
import { Row, Col, Button,  Card, FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import Axios from 'axios';
import {  CurrencyOptions,  } from '../../../options/options';
import AccountsOptions from '../../../options/accounts';
import { connect } from 'react-redux';
import { API } from '../../../utils/utils';
import { Field, Form } from 'react-final-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IncomeReceipt } from '../../../Receipts/Income';
import { composeValidators, Validators } from '../../../Forms/Validators';
import { DatePicker, Select } from '../../../Controls';

const NewExpense = ({ user }) => {
    const [categories, setCategories] = useState([]);
    const [receipt, setReceipt] = useState(false);
    const [error,setError]=useState(false);
    useEffect(() => {
        Axios.get(API + '/categories').then(res => {
            setCategories(res.data.data)
        })
    }, [])
    const onExpenseSubmit = (values) => {
        console.log(values)
        if (window.confirm("Desea registrar este Ingreso?")) {
            Axios.post(API + '/income', { ...values, user_id: user.id }).then(res => {
                setError(false);
                setReceipt(res.data.data)
            })
                .catch(err => {
                   if(err.response){
                    setError(err.response.data)
                   }
                   else{
                       console.log(err)
                   }
                    
                })
        }
    }


    return (
        <Row>
            <Col sm={12}><h2 className="text-center">Nuevo Ingreso</h2></Col>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Datos del Ingreso</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onExpenseSubmit}>
                            {({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                  
                                    <Field name='date' validate={Validators.required}>
                                        {({ input, meta }) => (
                                            <FormGroup >
                                                <label>Fecha</label>
                                                <DatePicker isInvalid={meta.error && meta.touched} isValid={!meta.errors && meta.touched} required onChange={input.onChange} dateFormat='dd/MM/yyyy' value={input.value}  {...input} />
                                            </FormGroup>

                                        )}
                                    </Field>
                                   
                                    <Field name='description' validate={Validators.required}>
                                        {({ input, meta }) => (
                                            <FormGroup>
                                                <label>Descripcion</label>
                                                <FormControl isInvalid={meta.error && meta.touched} isValid={!meta.errors && meta.touched} as='textarea' style={{ resize: 'none' }} rows={4} value={input.value} onChange={input.onChange} {...input} />
                                            </FormGroup>
                                        )}
                                    </Field>

                                    <FormGroup>
                                        <label>Moneda / Monto</label>
                                        <InputGroup size='sm'>
                                            <Field name='currency' validate={Validators.required}>
                                                {({ input, meta }) => (
                                                    <Select isInvalid={meta.error && meta.touched} isValid={!meta.errors && meta.touched} onChange={input.onChange} value={input.value} {...input} options={<CurrencyOptions />} />
                                                )}

                                            </Field>
                                            <Field name='amount' validate={composeValidators(Validators.required, Validators.mustBeDecimal)}>
                                                {({ input, meta }) => (
                                                    <FormControl isInvalid={meta.error && meta.touched} isValid={!meta.errors && meta.touched} onChange={input.onChange} value={input.value} {...input} />
                                                )}
                                            </Field>

                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Categoria / Cuenta Receptora</label>
                                        <InputGroup size='sm'>
                                            <Field name='category_id' validate={Validators.required}>
                                                {({ input, meta }) => (
                                                    <Select 
                                                        isInvalid={meta.error && meta.touched} 
                                                        isValid={!meta.errors && meta.touched} 
                                                        onChange={input.onChange} value={input.value} {...input} 
                                                        options={categories.filter(x=>x.type==='Ingreso').map((cat,key) => <option key={key} value={cat.id}>
                                                            {cat.parent_id?categories.find(x=>x.id===cat.parent_id).name+' - ':null}  {cat.name}
                                                        </option>)} />
                                                )}

                                            </Field>
                                            <Field name='account_id' validate={Validators.required}>
                                                {({ input, meta }) => (
                                                    <Select isInvalid={meta.error && meta.touched} isValid={!meta.errors && meta.touched} onChange={input.onChange} value={input.value} {...input} options={<AccountsOptions />} />
                                                )}
                                            </Field>
                                        </InputGroup>
                                    </FormGroup>
                                    <Button size='sm' block type='submit'>Registrar Ingreso</Button>
                                </form>
                            )}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={8}>
                <div className='h-100' style={{ border: 'black 1px solid' }} >
                    
                    {error &&(
                        <div className='h-100 flex-column align-items-center justify-content-center d-flex' style={{color:'#721c24'}}>
                        <FontAwesomeIcon size='3x' icon={faTimes}/>
                        <p>{error.data}</p>
                        </div>
                    )}
                    {receipt && <IncomeReceipt data={receipt} user={user.name} modal={false} />}
                </div>

            </Col>
        </Row>
    )

}
/*
const NewExpense = ({ user }) => {
    const [date, setDate] = useState('');
    const [office, setOffice] = useState('');
    const [bill_number, setBillNumber] = useState("");
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("");
    const [currency, setCurrency] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [receipt, setReceipt] = useState(false);

    
    useEffect(() => {
        Axios.get(API + '/categories').then(res => {
            setCategoryList(res.data.data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { date, office, bill_number, description, amount, account_id: account, currency, category_id: category }
        if (window.confirm("Desea registrar este egreso?")) {
            setLoading(true)
            setError({})
            Axios.post(API + '/expenses', { ...data, user_id: user.id }).then(res => {
                setError({ type: 'success', text: 'Egreso registrado con exito' })
                setLoading(false)
                setReceipt(res.data.data)
            })
                .catch(err => {
                    setError({ type: 'danger', text: err.response.data.data })
                    setLoading(false)
                })
        }
    }

    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Nuevo Egreso</h1>
            </Col>
            <Col sm={4}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Registro de Gasto</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            
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
                                    <Select label='Categoria' options={categoryList.map(cat => <option value={cat.id}>{cat.name}</option>)} onChange={({ target }) => setCategory(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <Select label='Cuenta Pagadora' options={<AccountsOptions except={[9]} />} value={account} onChange={({ target }) => setAccount(target.value)} />
                                </Col>
                            </Row>
                            <Button disabled={loading} type='submit' block>Registrar Gasto</Button>

                            {error && <Alert variant={error.type} className='mt-5'>{error.text}</Alert>}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={8}>
                {receipt && <PaymentReceipt data={receipt} user={user.name} modal={false} />}
            </Col>
        </Row>
    )
}
*/
const mapStateToProps = state => (
    { user: state.session.user }
)

export default connect(mapStateToProps, null)(NewExpense)