
import React, { useState } from 'react';
import { FormControl, Row, Col, FormGroup, Card, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { createPayment } from '../../../ducks/agents';
import { PaymentMethodOptions, AccountsOptions, OfficeOptions, PaymentTypeOptions, CurrencyOptions } from '../../../options/options';
import { Input, Select, DatePicker } from '../../custom/Controls';
export const FormCobranza = ({ id, createPayment, creatingPayment }) => {
    const [method, setMethod] = useState('')
    const [payment_type, setPaymentType] = useState("")
    const [agencyDiscount, setAgencyDiscount] = useState(0)
    const [companyDiscount, setCompanyDiscount] = useState(0)
    const [agentDiscount, setAgentDiscount] = useState(0)
    const [paymentDate, setPaymentDate] = useState(0)
    const [amount, setAmount] = useState(0)
    const [comment, setComment] = useState('')
    const [city, setCity] = useState('')
    const [account, setAccount] = useState('')
    const [currency, setCurrency] = useState('')

    const customSetMethod = (value) => {
        if (value == 'cash_to_agency') {
            setAccount(1);
        }
        else if (value == 'check_to_agency_local' || value == 'check_to_agency_foreign') {
            setAccount(9)
        }
        else {
            setAccount("")
        }
        setMethod(value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let payment = {
            client_id: id,
            payment_method: method,
            payment_type,
            agency_discount: agencyDiscount,
            agent_discount: agentDiscount,
            company_discount: companyDiscount,
            payment_date: new Date(paymentDate).toLocaleDateString(),
            comment: comment,
            amount,
            city,
            currency,
            account
        }
        createPayment(payment)
    }

    const lockedMethods = ['cash_to_agency', 'tdc_to_collector', 'check_to_foreign_company', 'transfer_to_company', 'tdc_to_company', 'check_to_local_agency', 'check_to_foreign_agency', 'claim_to_company'];
    return (
        <Card>
            <Card.Header className='bg-primary text-light'>Registrar Cobranza</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Select label='Metodo de Pago' value={method} onChange={({ target }) => customSetMethod(target.value)} options={<PaymentMethodOptions />} />
                            <Select label='Cuenta Receptora' value={account} onChange={({ target }) => setAccount(target.value)} options={<AccountsOptions />} />
                            <Select label='Tipo de Pago' value={payment_type} onChange={({ target }) => setPaymentType(target.value)} options={<PaymentTypeOptions />} />
                            <Select label='Oficina' value={city} onChange={({ target }) => setCity(target.value)} options={<OfficeOptions />} />
                            <DatePicker label='Fecha de pago' required={true} onChange={setPaymentDate} dateFormat='dd/MM/yyyy' value={paymentDate} />
                        </Col>
                        <Col sm={3}>
                            <Input type='number' label='Descuento de Aseguradora' prepend='$' value={companyDiscount} onChange={({ target }) => setCompanyDiscount(target.value)} />
                            <Input type='number' label='Descuento de Agencia:' prepend='$' value={agencyDiscount} onChange={({ target }) => setAgencyDiscount(target.value)} />
                            <Input type='number' label='Descuento de Agente:' prepend='$' value={agentDiscount} onChange={({ target }) => setAgentDiscount(target.value)} />
                         
                            <Row>
                                <Col sm={6}>
                                <Select label='Moneda' value={currency} onChange={({ target }) => setCurrency(target.value)} required options={<CurrencyOptions />} />
                                </Col>
                                <Col sm={6}>
                                <Input type='number' label='Monto Cancelado:' prepend='$' value={amount} onChange={({ target }) => setAmount(target.value)} required/>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <label>Notas de Cobrador</label>
                                <FormControl rows={5} as='textarea' value={comment} onChange={({ target }) => setComment(target.value)}>

                                </FormControl>
                            </FormGroup>
                            <Button disabled={creatingPayment} block type='submit' variant='success' size='lg'>{creatingPayment ? <Spinner animation='border' /> : 'Registrar Cobranza'} </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>

    )
}

const mapStateToProps = state => (
    {
        creatingPayment: state.agents.creatingPayment
    }
)

const mapDispatchToProps = dispatch => (
    {
        createPayment: (payment) => dispatch(createPayment(payment))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(FormCobranza)