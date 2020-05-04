
import React, { useState } from 'react';
import { FormControl, Row, Col, FormGroup, Card, Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { createPayment } from '../../../ducks/agents';
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
  
    
    return (
        <Card>
            <Card.Header className='bg-primary text-light'>Registrar Cobranza</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <FormGroup>
                                <label>Metodo de Pago</label>
                                <FormControl size='sm' value={method} onChange={({ target }) => setMethod(target.value)} as='select' required>
                                    <option value=''>Seleccione...</option>
                                    <optgroup label='Pagos a la Aseguradora'>
                                        <option value='tdc_to_company'>Pago Directo en su portal de cliente con Tarjeta de Credito</option>
                                        <option value='transfer_to_company'>Pago con transferencia Bancaria a la Aseguradora</option>
                                        <option value='check_to_foreign_company'>Pago con cheque extranjero a la Aseguradora</option>
                                        <option value='tdc_to_collector'>Pago con Tarjeta de Credito para que cobradora pague la poliza</option>
                                        <option value='claim_to_company'>Pago con abono de reclamo</option>
                                    </optgroup>
                                    <optgroup label='Pagos a la agencia'>
                                        <option value='transfer_to_local_agency'>Pago con transferencia bancaria a cuenta local de agencia</option>
                                        <option value='transfer_to_foreign_agency'>Pago con transferencia bancaria a cuenta extranjera a la agencia</option>
                                        <option value='check_to_foreign_agency'>Pago con cheque extranjero a la agencia</option>
                                        <option value='check_to_local_agency'>Pago con cheque local a la agencia</option>
                                        <option value='cash_to_agency'>Pago en efectivo la agencia</option>
                                    </optgroup>





                                </FormControl>
                            </FormGroup>
                            {
                                (method === 'transfer_to_local_agency' || method === 'transfer_to_foreign_agency') &&
                                <FormGroup>
                                    <label>Cuenta Receptora:</label>
                                    <FormControl size='sm' as='select' value={account} onChange={({ target }) => setAccount(target.value)} required>
                                        <option value="1">Cuenta 1</option>
                                        <option value='2'>Cuenta 2</option>
                                        <option value='3'>Cuenta 3</option>
                                    </FormControl>
                                </FormGroup>
                            }


                            <FormGroup >
                                <label>Tipo de Pago</label>
                                <FormControl size='sm' value={payment_type} onChange={({ target }) => setPaymentType(target.value)} as='select' required>
                                    <option value=''>Seleccione...</option>
                                    <option value='total'>Prima Completa</option>
                                    <option value='partial'>Pago Parcial</option>

                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Departamento:</label>
                                <FormControl size='sm' as='select' value={city} onChange={({ target }) => setCity(target.value)} required>
                                    <option value="sc">Santa Cruz</option>
                                    <option value='lp'>La Paz</option>
                                    <option value='cb'>Cochabamba</option>

                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha de Pago:</label>
                                <ReactDatePicker required className='form-control form-control-sm' onChange={setPaymentDate} dateFormat='dd/MM/yyyy' selected={paymentDate} />
                            </FormGroup>
                        </Col>
                        <Col sm={3}>
                            <FormGroup>
                                <label>Descuento de Aseguradora:</label>
                                <InputGroup size='sm'>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl size='sm' required type='number' value={companyDiscount} onChange={({ target }) => setCompanyDiscount(target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <label>Descuento de Agencia:</label>
                                <InputGroup size='sm'>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl size='sm' required type='number' value={agencyDiscount} onChange={({ target }) => setAgencyDiscount(target.value)} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <label>Descuento de Agente:</label>
                                <InputGroup size='sm'>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl size='sm' required type='number' value={agentDiscount} onChange={({ target }) => setAgentDiscount(target.value)} />
                                </InputGroup>

                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col sm={4}>
                                        <label>Moneda:</label>
                                        <FormControl size='sm' as='select' value={currency} onChange={({ target }) => setCurrency(target.value)} required>
                                            <option value=''>Seleccione...</option>
                                            <option value='USD'>USD</option>
                                            <option value='BOB'>Bolivianos</option>
                                        </FormControl>

                                    </Col>
                                    <Col sm={8}>
                                        <label>Monto Cancelado:</label>
                                        <InputGroup size='sm'>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>$</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required size='sm' type='text' value={amount} onChange={({ target }) => setAmount(target.value)} />
                                        </InputGroup>

                                    </Col>
                                </Row>

                            </FormGroup>
                        </Col>
                        <Col sm={5}>
                            <FormGroup>
                                <label>Notas de Cobrador</label>
                                <FormControl rows={5} as='textarea' value={comment} onChange={({ target }) => setComment(target.value)}>

                                </FormControl>
                            </FormGroup>
                            <Button disabled={creatingPayment} block type='submit' variant='success' size='lg'>{creatingPayment ? <Spinner animation='border'/> : 'Registrar Cobranza'} </Button>
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