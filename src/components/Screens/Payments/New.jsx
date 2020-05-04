import React, { useEffect, useState, Fragment } from 'react'

import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getClientList, getClientById } from '../../../ducks/agents'
import {  Form, Row, Col, Card,  FormGroup } from 'react-bootstrap';
import UpdateClientModal from '../Clients/UpdateClientModal';

import  FormCobranza  from './FormCobranza';
const NewPayment = ({ clients, getClientList, getClientById }) => {
    const [client, setClient] = useState([]);


    useEffect(() => {
        getClientList()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (client.length > 0) {
            getClientById(client[0].id)
        }
// eslint-disable-next-line
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
                                            <TextGroup label='Telefono:' text={clients.editing.phone || '--'} />
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
                                            <UpdateClientModal />
                                        </Col>

                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={12}>
                            <FormCobranza id={clients.editing.id} />
                        </Col>
                    </Fragment>
                    :
                    null
            }

        </Row>

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