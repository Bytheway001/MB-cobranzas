import React from 'react';
import { Row, Col, Button, Table, Alert, Modal, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { SmartCard } from '../../library/SmartCard';
import { getClientById, selectClient } from '../../../ducks/clients';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { UserIs } from '../../../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faDollarSign, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { CashBox } from './components/Cashbox';
import { UserPaymentsModal } from './components/UserPaymentsModal';
import ClientForm, { NewClientForm } from '../../Forms/Client';
import { ClientProfileTable } from '../../Tables/ClientProfileTable';
import { ClientSelector } from '../../custom/Controls';
import TransferForm from '../../Forms/Transfer';
import { useState } from 'react';

const buttonStyle = {
    height: 120,
    fontSize: '0.9em'
}


export const Thumbnail = ({ title, as, to, icon, onClick }) => {
    if (as) {
        return (
            <Button as={as} to={to} className='my-1 d-flex flex-column justify-content-center' block style={buttonStyle}>
                <p><FontAwesomeIcon size='3x' icon={icon} /></p>
                {title}
            </Button>
        )
    }
    else {
        return (
            <Button onClick={onClick} to={to} className='my-1 d-flex flex-column justify-content-center align-items-center' block style={buttonStyle}>
                <p><FontAwesomeIcon size='3x' icon={icon} /></p>
                {title}
            </Button>
        )
    }

}


const ChangesModal = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button size='sm' onClick={() => setShow(true)}>Ver Cambios</Button>
            <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambios de Version</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>NOTA: Los colores a continuacion indican a que se refiere cada nota</Col>
                        <Col>
                            <h4><Badge variant='success'>Nuevas Funcionalidades</Badge></h4>
                        </Col>
                        <Col>
                            <h4> <Badge size='md' variant='warning'>Notas de desarrollador</Badge></h4>

                        </Col>
                        <Col>
                            <h4> <Badge size='md' variant='danger'>Correccion de errores</Badge></h4>

                        </Col>
                    </Row>
                    <ListGroup>
                        <ListGroupItem className='bg-info'>
                            <h5>[NUEVO] Reportes de Cambios al sistema</h5>
                            <p className='my-0'>- Se ha agregado a la pantalla principal la alerta con los cambios de version</p>
                            <p className='my-0'>- Cada vez que se realizen cambios en la aplicacion, los vamos a describir por aca (esta misma lista que estas leyendo), esten atentos a la fecha del alerta para saber cuando fueron subidos estos cambios</p>
                        </ListGroupItem>
                        <ListGroupItem className='bg-success'>
                            <h5>[NUEVO] Pestaña "Mi gestion" en la barra de navegacion</h5>
                            <p className='my-0'>- A partir de esta version, podremos acceder a nuestra gestion, mediante el link ubicado en la barra de navegacion</p>
                            <p className='my-0'>Esta funcionalidad nos permite ver las cobranzas/gastos/ingresos que hemos realizado</p>
                           
                        </ListGroupItem>
                        <ListGroupItem className='bg-success'>
                            <h5>[NUEVO] PDF de ingresos/egresos ahora es descargable</h5>
                            <p className='my-0'>hemos agregado la funcionalidad de descargar nuevamente los PDF generados al registrar un gasto o Ingreso</p>
                           
                        </ListGroupItem>
                       
                        <ListGroupItem className='bg-success'>
                            <h5>[CORRECCION] Email a personas etiquetadas en cobranzas</h5>
                            <p className='my-0'>Ahora al realizar una cobranza, podras etiquetar a las personas que desees enviar un correo para notificar la realizacion de la misma</p>

                        </ListGroupItem>
                        <ListGroupItem className='bg-warning'>
                            <h5>[AVISO] Identificador de pagos previos al 29/9</h5>
                            <p className='my-0'>Los pagos con fecha previa al 29/9 mostraran como operador "Ninguno" en el comprobante, debido a que antes de esta fecha esta funcion no estaba disponible</p>

                        </ListGroupItem>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button form='client_form' type='submit' variant="primary">Actualizar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export const Collector = ({ clients, getClientById, selectClient, user, accounts }) => {



    const testValue = (val) => {
        if (val[0]) {
            selectClient(val[0])
        }
        else {
            selectClient(null)
        }
    }
    const editing = clients.editing

    return (
        <Row>
            <Col sm={12}>
                <Alert variant='info'>El sistema ha sido actualizado, <ChangesModal /></Alert>
            </Col>
            <Col sm={6}>
                <SmartCard title="Clientes">
                    <Row className='mb-2'>
                        <Col sm={1}>
                            <label>Cliente</label>
                        </Col>
                        <Col sm={6}>
                            <ClientSelector title='Cliente' selected={editing ? [editing] : []} onChange={(val) => testValue(val)} />
                        </Col>
                        <Col sm={5}>
                            <NewClientForm modal={true} />
                        </Col>
                    </Row>
                    <Row>
                        {
                            editing &&
                            <Col xs={12}>
                                <ClientProfileTable editing={editing} />
                                <Table className='mt-1' variant='bordered' size='sm'>
                                    <tbody>
                                        <tr>
                                            <th colSpan={4} className='bg-primary text-white'>Acciones:</th>
                                        </tr>
                                        <tr>
                                            <th><ClientForm modal={true} /></th>
                                            <th><Button variant='success' as={Link} to='/payments/new' block size='sm'>Registrar Cobranza</Button></th>
                                            <th><UserPaymentsModal client={editing} /></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        }
                    </Row>
                </SmartCard>
            </Col>
            {
                UserIs(user, 248) &&
                <Col sm={6}>
                    <SmartCard title='Operaciones'>
                        <Row>
                            {accounts.length > 0 && user.account &&
                                <Col sm={12}>
                                    <CashBox id={accounts.find(x => x.id === user.account.id).id} usd={accounts.find(x => x.id === user.account.id).usd} bob={accounts.find(x => x.id === user.account.id).bob} />
                                </Col>
                            }
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <TransferForm modal={true} />
                            </Col>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/expenses/new' title='Registrar Gasto' icon={faShareSquare} />
                            </Col>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/other_incomes' title='Registrar Ingreso' icon={faDollarSign} />
                            </Col>
                            <Col sm={6}>
                                <Thumbnail as={Link} to='/checks/collect' title='Cobro de Cheques' icon={faMoneyBillWave} />
                            </Col>

                        </Row>
                    </SmartCard>
                </Col>
            }


        </Row>
    )
}




const mapStateToProps = state => ({
    clients: state.clients,
    selectedClient: state.clients.editing,
    user: state.session.user,
    accounts: state.accounts.list
})

const mapDispatchToProps = dispatch => ({
    getClientById: (id) => dispatch(getClientById(id)),
    selectClient: (id) => dispatch(selectClient(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Collector);
