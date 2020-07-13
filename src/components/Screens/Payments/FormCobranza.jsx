
import React, { useState, Fragment } from 'react';
import { FormControl, Row, Col, FormGroup, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPayment } from '../../../ducks/agents';
import { numerize } from '../../../utils/utils';
import { PaymentMethodOptions, OfficeOptions, PaymentTypeOptions, CurrencyOptions } from '../../../options/options';
import AccountsOptions from '../../../options/accounts';
import { Input, Select, DatePicker } from '../../custom/Controls';
import { CustomCard } from '../../custom/CustomCard';
export const FormCobranza = ({ id, prima, createPayment, creatingPayment }) => {
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
    const [currency, setCurrency] = useState('USD')
    const [changeRate, setChangeRate] = useState('');
    const [error, setError] = useState(null);

    const handleCurrencyChange = (value) => {
        if (value === 'USD') {

            setChangeRate('');
        }
        setCurrency(value);

    }
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



    function validatePrima() {
        let payingAmount = currency === 'BOB' ? numerize(amount / changeRate) : numerize(amount)
        let aD = numerize(agentDiscount);
        let agD = numerize(agencyDiscount);
        let cd = numerize(companyDiscount)
        let d = aD + agD + cd
        let discounts = currency === 'BOB' ? numerize(d / changeRate) : numerize(d)
        let premium = numerize(prima)
        console.log(`El cliente esta pagando un total de $${payingAmount}, Su prima es de ${premium} con un descuento de ${discounts} por lo cual debe pagar ${premium - discounts}`);
        console.log(payingAmount, premium, discounts);
        console.log(payingAmount < premium - discounts)
        return payingAmount <= premium - discounts;
    }


    const handleSubmit = (e) => {
        setError(null)
        e.preventDefault();
        if (!validatePrima()) {
            setError('El monto ingresado es mayor al monto total del cliente')
        }
        else {
            let payment = {
                client_id: id,
                payment_method: method,
                payment_type,
                agency_discount: agencyDiscount,
                agent_discount: agentDiscount,
                company_discount: companyDiscount,
                payment_date: paymentDate,
                comment: comment,
                amount,
                city,
                currency,
                account_id: account,
                change_rate: changeRate
            }
            createPayment(payment)
        }



    }


    const lockedMethods = ['cash_to_agency', 'tdc_to_collector', 'check_to_foreign_company', 'transfer_to_company', 'tdc_to_company', 'check_to_local_agency', 'check_to_foreign_agency', 'claim_to_company'];
    return (
        <CustomCard title='Registrar Cobranza'>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col sm={4}>
                        <Select required label='Metodo de Pago' value={method} onChange={({ target }) => customSetMethod(target.value)} options={<PaymentMethodOptions />} />
                        {
                            !['tdc_to_company', 'transfer_to_company', 'check_to_foreign_company', 'tdc_to_collector', 'claim_to_company'].includes(method) ?
                                <Select required label="Cuenta Receptora" value={account} onChange={({ target }) => setAccount(target.value)} options={<AccountsOptions />} />
                                : null

                        }
                        <Select required label='Tipo de Pago' value={payment_type} onChange={({ target }) => setPaymentType(target.value)} options={<PaymentTypeOptions />} />
                        <Select required label='Oficina' value={city} onChange={({ target }) => setCity(target.value)} options={<OfficeOptions />} />
                        <DatePicker required label='Fecha de pago' required={true} onChange={setPaymentDate} dateFormat='dd/MM/yyyy' value={paymentDate} />
                    </Col>
                    <Col sm={3}>
                        <Row>
                            <Col sm={6}>
                                <Select label='Moneda' value={currency} onChange={({ target }) => handleCurrencyChange(target.value)} required options={<CurrencyOptions />} />
                            </Col>
                            <Col sm={6}>
                                {currency == 'BOB' && <Input type='number' label='Tipo de Cambio' value={changeRate} onChange={({ target }) => setChangeRate(target.value)} />}
                            </Col>
                        </Row>


                        <Input type='number' label='Desc. Aseguradora' prepend={currency === 'BOB' ? 'Bs' : '$'} value={companyDiscount} onChange={({ target }) => setCompanyDiscount(target.value)} />
                        <Input type='number' label='Desc. Agencia:' prepend={currency === 'BOB' ? 'Bs' : '$'} value={agencyDiscount} onChange={({ target }) => setAgencyDiscount(target.value)} />
                        <Input type='number' label='Desc. Agente:' prepend={currency === 'BOB' ? 'Bs' : '$'} value={agentDiscount} onChange={({ target }) => setAgentDiscount(target.value)} />



                        <Input type='number' label='Monto:' prepend={currency === 'BOB' ? 'Bs' : '$'} value={amount} onChange={({ target }) => setAmount(target.value)} required />
                    </Col>
                    <Col sm={5}>
                        <FormGroup>
                            <label>Notas de Cobrador</label>
                            <FormControl rows={5} as='textarea' value={comment} onChange={({ target }) => setComment(target.value)}>
                            </FormControl>
                        </FormGroup>
                        <Button disabled={creatingPayment} block type='submit' variant='success' size='lg'>{creatingPayment ? <Spinner animation='border' /> : 'Registrar Cobranza'} </Button>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        {
                            changeRate && (
                                <div className='conversions'>
                                    <p className='text-center'>Cantidades Convertidas</p>
                                    <p>Desc. Agente: {numerize(agentDiscount / changeRate)}</p>
                                    <p>Desc. Agencia: {numerize(agencyDiscount / changeRate)}</p>
                                    <p>Desc. Asegura: {numerize(companyDiscount / changeRate)}</p>
                                    <p>Monto: {numerize(amount / changeRate)}</p>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Form>
        </CustomCard>
      
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