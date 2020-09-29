import React, { useState } from 'react';
import { connect } from 'react-redux';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap'
import { Input, Select } from '../custom/Controls';
import AccountsOptions from '../../options/accounts';
import { CurrencyOptions } from '../../options/options';
import { Thumbnail } from '../Screens/Dashboard/Collector';
import { addNotification } from '../../ducks/notifications';
import Axios from 'axios';
import { SmartCard } from '../library/SmartCard';
import { API } from '../../utils/utils';
export const TransferForm = ({ accounts, modal, setNotification, notifications }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState("")
    const [currency, setCurrency] = useState("");
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false)
    
    const handleSubmit = (e) => {
        let payload = { from, to, amount, currency, comment }
        e.preventDefault();
        Axios.post(API + '/transfers', payload).then(res => {
            setNotification('success', 'Transferencia realizada con exito')
            setShow(false)
        })
            .catch(err => {

                setNotification('danger', err.response.data.data)

            })
    }


    const realForm = (
        <Form onSubmit={handleSubmit} id='transfer_form'>
            <Select value={from} onChange={({ target }) => setFrom(target.value)} label='Cuenta a Debitar:' options={<AccountsOptions except={[9]} />}></Select>
            <Select value={to} onChange={({ target }) => setTo(target.value)} label='Cuenta a Abonar:' options={<AccountsOptions except={[9]} />}></Select>
            <Row>
                <Col sm={6}>
                    <Select value={currency} onChange={({ target }) => setCurrency(target.value)} options={<CurrencyOptions />} label='Monto a transferir:' />
                </Col>
                <Col sm={6}>
                    <Input value={amount} onChange={({ target }) => setAmount(target.value)} label='Cantidad:' />
                </Col>
                <Col sm={12}>
                    <Input value={comment} onChange={({ target }) => setComment(target.value)} label='Comentario:' />
                </Col>
            </Row>
            {!modal && <Button type='submit' block>Completar Transferencia</Button>}
        </Form>
    )

    if (modal) {
        return (
            <>
                <Thumbnail onClick={() => setShow(true)} title='Transferencias Internas' icon={faExpandAlt} />
                <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transferencia Interna</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            notifications.length>0 && <Alert variant={notifications[0].type}>{notifications[0].text}</Alert>
                        }
                        {realForm}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                        <Button form='transfer_form' type='submit' variant="primary">Enviar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
    else {
        return (
            <Row>
                <Col sm={{ span: 4, offset: 4 }}>
                    <SmartCard title='Transferencias entre cuentas'>
                        {realForm}
                    </SmartCard>
                </Col>
            </Row>
        )
    }


}
const mapStateToProps = state => (
    {
        notifications: state.notifications
    }
)
const mapDispatchToProps = dispatch => (
    {
        setNotification: (type, text) => dispatch(addNotification(type, text))
    }
)
export default connect(mapStateToProps, mapDispatchToProps)(TransferForm)