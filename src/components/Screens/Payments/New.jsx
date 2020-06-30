// Formulario para nueva cobranza 
import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getClientList, getClientById } from '../../../ducks/clients'
import { Form, Row, Col, Card, FormGroup, Table } from 'react-bootstrap';
import UpdateClientModal from '../Clients/UpdateClientModal';

import FormCobranza from './FormCobranza';
import ClientSelect from '../../custom/ClientSelect';
import { UserIs } from '../../../utils/utils';
const NewPayment = ({ clients, getClientList, getClientById,user }) => {
    const [client, setClient] = useState([]);
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
                                <ClientSelect onChange={setClient} selected={client} />

                            </FormGroup>
                        </Form>
                        {
                            clients.editing ?
                                <Row>
                                    <Col sm={12}>
                                        <p>Datos del cliente</p>
                                    </Col>
                                    <Col sm={12}>
                                        <Table size='sm'>

                                            <tr>
                                                <th># Poliza</th>
                                                <td>{clients.editing.policy_number}</td>
                                            </tr>
                                            <tr>
                                                <th>Nombre:</th>
                                                <td>{clients.editing.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Telefono:</th>
                                                <td>{clients.editing.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Aseguradora</th>
                                                <td>{clients.editing.company}</td>
                                            </tr>
                                            <tr>
                                                <th>Plan/Opcion:</th>
                                                <td>{clients.editing.plan} / {clients.editing.option}</td>
                                            </tr>
                                            <tr>
                                                <th>Frecuencia de Pago</th>
                                                <td>{clients.editing.frequency}</td>
                                            </tr>
                                            <tr>
                                                <th>Fecha Efectiva</th>
                                                <td>{clients.editing.effective_date}</td>
                                            </tr>
                                            <tr>
                                                <th>Fecha de Renovacion</th>
                                                <td>{clients.editing.renovation_date}</td>
                                            </tr>
                                            <tr>
                                                <th>Prima</th>
                                                <td>{clients.editing.prima}</td>
                                            </tr>
                                            <tr>
                                                <th>Agente</th>
                                                <td>{clients.editing.agent}</td>
                                            </tr>
                                            <tr>
                                                <th>Cobrador</th>
                                                <td>{clients.editing.collector}</td>
                                            </tr>
                                            {
                                                UserIs(user, 224) &&
                                                <tr>
                                                    <th colSpan={2}><UpdateClientModal /></th>
                                                </tr>
                                            }

                                        </Table>
                                    </Col>

                                </Row>
                                :
                                null
                        }

                    </Card.Body>
                </Card>
            </Col>
            <Col sm={8}>
                {
                    clients.editing ?
                        <FormCobranza id={clients.editing.id} prima={clients.editing.prima} />
                        :
                        null
                }
            </Col>
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
    clients: state.clients,
    user:state.session.user
})

const mapDispatchToProps = dispatch => ({
    getClientById: (id) => dispatch(getClientById(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewPayment);