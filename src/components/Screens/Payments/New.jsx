import React, { useEffect, useState, Fragment } from 'react'
import {Companies} from '../../../utils/utils';
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getClientList, getClientById } from '../../../ducks/agents'
import { Modal, Form, Row, Col, Card, Button, FormGroup, FormControl } from 'react-bootstrap';
import {UpdateClientModal} from '../Clients/UpdateClientModal';
const NewPayment = ({ clients, getClientList, getClientById }) => {
    const [client, setClient] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getClientList()
    }, [])

    useEffect(() => {
        if (client.length > 0) {
            getClientById(client[0].id)
        }

    }, [client])


    return (
        <Row>
            <Col sm={4} className='mb-5'>
                <Card className='h-100'>
                    <Card.Header className='bg-primary text-light' >Paso: 1.- Seleccion de Cliente</Card.Header>
                    <Card.Body>
                        <Form>
                            <FormGroup>
                                <label>Cliente:</label>
                                <Typeahead id='client' options={clients.list} onChange={setClient} selected={client} labelKey='name' />
                            </FormGroup>


                            <Button block>Registrar Pago</Button>
                        </Form>

                    </Card.Body>
                </Card>
            </Col>
            {
                clients.editing ?
                    <Fragment>
                        <Col sm={8} className='mb-5'>
                            <Card>
                                <Card.Header className='bg-primary text-light'>2.- Poliza del cliente</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col sm={3}>
                                            <TextGroup label='Nombre' text={clients.editing.name} />
                                            <TextGroup label='Agente:' text={clients.editing.agent} />
                                            <TextGroup label='Cobrador:' text={clients.editing.collector} />

                                        </Col>
                                        <Col sm={3}>
                                            <TextGroup label='Aseguradora:' text={clients.editing.company} />
                                            <TextGroup label='Plan:' text={clients.editing.plan} />
                                            <TextGroup label='Opcion:' text={clients.editing.option} />

                                        </Col>
                                        <Col sm={3}>
                                            <TextGroup label='Numero de Poliza:' text={clients.editing.policy_number} />
                                            <TextGroup label='Tipo de poliza:' text={clients.editing.policy_type} />
                                            <TextGroup label='Prima:' text={clients.editing.prima} />

                                        </Col>
                                        <Col sm={3}>
                                            <TextGroup label='Frecuencia de Pago:' text={clients.editing.frequency} />
                                            <TextGroup label='Fecha Efectiva:' text={new Date(clients.editing.effective_date).toLocaleDateString()} />
                                            <TextGroup label='Fecha de Renovacion:' text={new Date(clients.editing.renovation_date).toLocaleDateString()} />

                                        </Col>

                                    </Row>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col sm={12}>
                                            <UpdateClientModal client={clients.editing}/>
                                        </Col>

                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <FormCobranza />
                        </Col>
                    </Fragment>
                    :
                    null
            }

        </Row>

    )
}

const FormCobranza = props => {
    return (
        <Card>
            <Card.Header className='bg-primary text-light'>Registrar Cobranza</Card.Header>
            <Card.Body>
                <Form>
                    <FormGroup>
                        <label>Metodo de Pago</label>
                        <FormControl as='select'>
                            <option>Pago Directo en su portal de cliente con Tarjeta de Credito</option>
                            <option>Pago con Tarjeta de Credito para que cobradora pague la poliza</option>
                            <option>Pago con transferencia Bancaria a la Aseguradora</option>
                            <option>Pago con cheque extranjero a la compañia</option>
                            <option>Pago con cheque extranjero a la agencia</option>
                            <option>Pago con cheque local a la agencia</option>
                            <option>Pago con transferencia bancaria a cuenta local de agencia</option>
                            <option>Pago en efectivo (USD) a la agencia</option>
                            <option>Pago en efectivo (Bolivianos) a la agencia</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Cuenta Receptora</label>
                        <FormControl as='select'>
                            <option>Cuenta BNB 12345</option>
                            <option>Cuenta Bisa 1234567</option>
                            <option>Cuenta Union 666666</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Tipo de Pago</label>
                        <FormControl as='select'>
                            <option>Prima Completa</option>
                            <option>Prima descuento agencia</option>
                            <option>Prima descuento aseguradora</option>
                            <option>Plan de Pagos de agencia</option>
                            <option>Plan de pagos con descuento de agencia</option>
                            <option>Plan de pagos con descuento de aseguradora</option>
                            <option>Cambio de forma de pago</option>
                        </FormControl>
                    </FormGroup>
                </Form>
            </Card.Body>
        </Card>

    )
}



const TextGroup = ({ label, text }) => (
    <div className='px-2 mb-2' >
        <p className='mb-0'><b>{label}</b></p>
        <p style={{ fontSize: '1.1em' }} className='mb-0'>{text}</p>
    </div>
)


const mapStateToProps = state => ({
    clients: state.clients
})

const mapDispatchToProps = dispatch => ({
    getClientList: () => dispatch(getClientList()),
    getClientById: (id) => dispatch(getClientById(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPayment);