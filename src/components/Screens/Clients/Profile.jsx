import React, { Fragment, useEffect } from 'react'
import { Card, Row, Col, Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { showClientProfile } from '../../../ducks/agents'
import { UpdateClientModal } from './UpdateClientModal'
import { Link } from 'react-router-dom'


const ClientProfile = ({ match, showing, showClientProfile }) => {
    useEffect(() => {
        showClientProfile(match.params.id)
        //eslint-disable-next-line 
    }, [])
    return (
        <Fragment>
            {showing ?
                <Row style={{ height: '30vh' }} className='mb-5'>
                    <Col sm={4} className='mb-3 h-100'>
                        <UserData client={showing} />
                        <UserPayments payments={showing.payments} />
                    </Col>
                    <Col sm={8}>

                        <StaffNotes payments={showing.payments} />
                        <Buttons />
                    </Col>
                </Row>
                : null
            }


        </Fragment>
    )
}

const StaffNotes = ({ payments }) => (
    <Card className='h-100' style={{ overflowY: 'scroll' }}>
        <Card.Header className='bg-primary text-light'>Notas (Staff)</Card.Header>
        <Card.Body>
            {payments && payments.map(p => (
                <Note text={p.comment} />
            ))}
        </Card.Body>
    </Card>
)
const Buttons = props => (
    null
)


const Note = props => (
    <Card className='mb-2' >
        <Card.Body>


            <div>{props.text}</div>
        </Card.Body>
    </Card>
)

const UserData = ({ client }) => {
    if (!client) {
        return null
    }
    return (
        <Card className='mb-3'>
            <Card.Header className='bg-primary text-light d-flex'>
                <span>Datos del Cliente</span>
               
            </Card.Header>
            <Card.Body >
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Nombre</p>
                    <p>{client.first_name}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Numero de Poliza</p>
                    <p>{client.policy_number}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Aseguradora/Plan</p>
                    <p>{client.company} / {client.plan}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Opcion</p>
                    <p>{client.option}</p>
                </div>
            </Card.Body>

        </Card>
    )
}

const UserPayments = ({ payments }) => (
    <Card>
        <Card.Header className='bg-primary text-light d-flex'>
            <span>Historial de Pagos (Ultimos 10)</span>
            <Button as={Link} variant='secondary' className='ml-auto' size='sm' to='/payments/new'>Registrar Pago</Button>
        </Card.Header>
        <Card.Body >
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha de Pago</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map(p => (
                            <tr>
                                <td>{p.id}</td>
                                <td>{p.payment_date}</td>
                                <td>{p.amount}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Card.Body>
    </Card>
)

const mapStateToProps = state => (
    {
        showing: state.clients.showing
    }
)

const mapDispatchToProps = dispatch => (
    {
        showClientProfile: (id) => dispatch(showClientProfile(id))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)