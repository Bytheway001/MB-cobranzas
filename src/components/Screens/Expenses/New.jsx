import React, { useState, useEffect } from 'react'
import { Row, Col, Form, FormGroup, FormControl, Button, Tabs, Tab, Alert } from 'react-bootstrap'
import Axios from 'axios';
import { API } from '../../../ducks/root';
import { Select, DatePicker, Input } from '../../custom/Controls';
import { OfficeOptions, CurrencyOptions, CategoryOptions } from '../../../options/options';
import { PaymentPolicyForm } from './components/PolicyForm';
import AccountsOptions from '../../../options/accounts';

const NewExpense = props => {
    const [date, setDate] = useState('');
    const [office, setOffice] = useState('');
    const [bill_number, setBillNumber] = useState("");
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState("");
    const [currency, setCurrency] = useState("");
    const [category, setCategory] = useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const [categoryList,setCategoryList]=useState([]);
    useEffect(()=>{
        Axios.get(API+'/categories').then(res=>{
            setCategoryList(res.data.data)
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { date, office, bill_number, description, amount, account_id:account, currency, category_id:category }
        setLoading(true)
        setError({})
        Axios.post(API + '/expenses', data).then(res => {
     
            setError({type:'success',text:'Egreso registrado con exito'})
            setLoading(false)
        })
        .catch(err=>{
           setError({type:'danger',text:err.response.data.data})
           setLoading(false)
        })
    }

    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Nuevo Egreso</h1>
            </Col>
            <Col sm={{ span: 4, offset: 4 }}>
                <Tabs className='nav-justified' defaultActiveKey='policies'>
                    <Tab title='Gastos Operativos' eventKey='expenses' className='p-3'>
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
                                    <Select label='Categoria' options={categoryList.map(cat=><option value={cat.id}>{cat.name}</option>)} onChange={({ target }) => setCategory(target.value)} />
                                </Col>
                                <Col sm={6}>
                                    <Select label='Cuenta Pagadora' options={<AccountsOptions except={[9]}/>} value={account} onChange={({ target }) => setAccount(target.value)} />
                                </Col>
                            </Row>
                            <Button disabled={loading} type='submit' block>Registrar Gasto</Button>
                            {error && <Alert variant={error.type} className='mt-5'>{error.text}</Alert>}
                        </Form>
                    </Tab>
                    <Tab title='Pago de Polizas' eventKey='policies' className='p-3'>
                        <PaymentPolicyForm/>
                    </Tab>
                </Tabs>

            </Col>
        </Row>
    )
}

export default NewExpense