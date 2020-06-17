import React, { Fragment, useEffect } from 'react'
import { Card, Row, Col, Table, Button, Alert, Badge } from 'react-bootstrap'
import { connect } from 'react-redux'
import { showClientProfile } from '../../../ducks/clients'
import { UpdateClientModal } from './UpdateClientModal'
import { Link } from 'react-router-dom'
import { formatMoney } from '../../../utils/utils'


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

                        <StaffNotes payments={showing.payments} pp={showing.policy_payments} />
                        <Buttons />
                    </Col>
                </Row>
                : null
            }


        </Fragment>
    )
}

const StaffNotes = ({ payments, pp }) => (
    <Card className='h-100' style={{ overflowY: 'scroll' }}>
        <Card.Header className='bg-primary text-light'>Notas (Staff)</Card.Header>
        <Card.Body>
            {payments && payments.map(p => (
                <Note text={p.comment} type='Cobranza' user={p.user} date={p.date} />
            ))}
            {pp && pp.map(p => (
                <Note text={p.comment} type='Pago de Poliza' user={p.user} date={p.date} />
            ))}
        </Card.Body>
    </Card>
)
const Buttons = props => (
    null
)


const Note = ({ type, text, user, date }) => (
    <Alert style={{borderRadius:0}} variant={type === 'Cobranza' ? 'primary' : 'danger'}>
        <Badge className='mr-2' size='sm' variant='secondary'>
            {type}
        </Badge>
        <div className='bg-primary text-white' style={{ padding: 5, position: 'absolute', top: 0, right: 0 }}>
            {user}
        </div>
        {date + ' ' + text}
    </Alert>
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
                    <p>{client.company}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Plan</p>
                    <p>{client.plan}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Opcion</p>
                    <p>{client.option}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Estado de la Poliza</p>
                    <p>{client.policy_status}</p>
                </div>
                <div className='w-100 d-flex flex-row justify-content-between'>
                    <p>Notas Adicionales</p>
                    <p>{client.comment?client.comment:'--'}</p>
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
                                <td>{p.date}</td>
                                <td>{formatMoney(p.amount,'.',',') }</td>

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