
import React, { useState } from 'react';
import { FormControl, Row, Col, FormGroup, Card, Form, Button, Spinner } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { createPayment } from '../../../ducks/agents';
export const FormCobranza = ({ id,createPayment,creatingPayment }) => {
    const [method, setMethod] = useState('')
    const [payment_type, setPaymentType] = useState("")
    const [agencyDiscount, setAgencyDiscount] = useState(0)
    const [companyDiscount, setCompanyDiscount] = useState(0)
    const [paymentDate, setPaymentDate] = useState(0)
    const [amount, setAmount] = useState(0)
    const [comment, setComment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        let payment = {
            client_id: id,
            payment_method: method,
            payment_type,
            agency_discount: agencyDiscount,
            company_discount: companyDiscount,
            payment_date: new Date(paymentDate).toLocaleDateString(),
            comment: comment
        }
        createPayment(payment)
     
    }
    console.log(creatingPayment)
    return (
        <Card>
            <Card.Header className='bg-primary text-light'>Registrar Cobranza</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <label>Metodo de Pago</label>
                                <FormControl size='sm' value={method} onChange={({ target }) => setMethod(target.value)} as='select'>
                                    <option value=''>Seleccione...</option>
                                    <option value='tdc_company'>Pago Directo en su portal de cliente con Tarjeta de Credito</option>
                                    <option value='tdc_collector'>Pago con Tarjeta de Credito para que cobradora pague la poliza</option>
                                    <option value='transfer_company'>Pago con transferencia Bancaria a la Aseguradora</option>
                                    <option value='foreign_check_company'>Pago con cheque extranjero a la compañia</option>
                                    <option value='foreign_check_agency'>Pago con cheque extranjero a la agencia</option>
                                    <option value='local_check_agency'>Pago con cheque local a la agencia</option>
                                    <option value='local_transfer_agency'>Pago con transferencia bancaria a cuenta local de agencia</option>
                                    <option value='usd_cash_agency'>Pago en efectivo (USD) a la agencia</option>
                                    <option value='bob_cash_agency'>Pago en efectivo (Bolivianos) a la agencia</option>
                                </FormControl>
                            </FormGroup>

                            <FormGroup >
                                <label>Tipo de Pago</label>
                                <FormControl size='sm' value={payment_type} onChange={({ target }) => setPaymentType(target.value)} as='select'>
                                    <option value=''>Seleccione</option>
                                    <option value='total'>Prima Completa</option>
                                    <option value='partial'>Pago Parcial</option>

                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha de Pago:</label>
                                <ReactDatePicker className='form-control form-control-sm' onChange={setPaymentDate} dateFormat='dd/MM/yyyy' selected={paymentDate} />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <label>Descuento de Aseguradora:</label>
                                <FormControl size='sm' type='number' value={agencyDiscount} onChange={({ target }) => setAgencyDiscount(target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <label>Descuento de Aseguradora:</label>
                                <FormControl size='sm' type='number' value={companyDiscount} onChange={({ target }) => setCompanyDiscount(target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <label>Monto Cancelado:</label>
                                <FormControl size='sm' type='text' value={amount} onChange={({ target }) => setAmount(target.value)} />
                            </FormGroup>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <label>Notas de Cobrador</label>
                                <FormControl rows={5} as='textarea' value={comment} onChange={({ target }) => setComment(target.value)}>
                                    {JSON.stringify(creatingPayment)}
                                </FormControl>
                            </FormGroup>
                            <Button disabled={creatingPayment} block type='submit' variant='success' size='lg' type='submit'>{creatingPayment?<Spinner animation='border'></Spinner>:'Registrar Cobranza'} </Button>
                        </Col>
                    </Row>



                </Form>
            </Card.Body>
        </Card>

    )
}

const mapStateToProps = state=>(
    {
        creatingPayment:state.agents.creatingPayment
    }
)

const mapDispatchToProps = dispatch => (
    {
        createPayment: (payment) => dispatch(createPayment(payment))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(FormCobranza)