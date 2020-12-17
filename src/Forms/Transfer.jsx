import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Alert, FormGroup, InputGroup } from 'react-bootstrap'
import AccountsOptions from '../options/accounts';
import { CurrencyOptions } from '../options/options';
import { addNotification } from '../ducks/notifications';
import Axios from 'axios';

import { API } from '../utils/utils';
import { Field, Form } from 'react-final-form';
import { composeValidators, Validators } from './Validators';
import { FinalFormInput, FinalFormSelect } from '../components/custom/FinalForm';


import { GlobalContext } from '../components/Layouts/Basic';
import { Thumbnail } from '../components/Thumbnail';

const TransferForm = ({ setNotification, notifications }) => {
    const [show, setShow] = useState(false);
    const { addNotification } = useContext(GlobalContext)

    const onTransferSubmit = (values) => {
        Axios.post(API + '/transfers', values).then(() => {
            addNotification('success', 'Transferencia realizada con exito')
            setShow(false)
        }).catch(err => {
            setNotification('danger', err.response.data.data)
        })
    }

    return (
        <>
            <Thumbnail onClick={() => setShow(true)} title='Transferencias Internas' icon={faExpandAlt} />
            <Modal size='md' show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Transferencia Interna</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        notifications.length > 0 && <Alert variant={notifications[0].type}>{notifications[0].text}</Alert>
                    }
                    <Form onSubmit={onTransferSubmit}>
                        {({ handleSubmit }) => (
                            <form id='transfer-form' onSubmit={handleSubmit}>
                                <Field name='from' validate={Validators.required}>
                                    {({ meta, input }) => (
                                        <FormGroup>
                                            <label>Desde: </label>
                                            <FinalFormSelect fieldProps={{ meta, input }} options={<AccountsOptions />} />
                                        </FormGroup>
                                    )}
                                </Field>
                                <Field name='to' validate={Validators.isDifferent}>
                                    {({ meta, input }) => (
                                        <FormGroup >
                                            <label>Hacia: </label>
                                            <FinalFormSelect fieldProps={{ meta, input }} options={<AccountsOptions />} />
                                        </FormGroup>
                                    )}
                                </Field>
                                <FormGroup>
                                    <label>Moneda/Monto: </label>
                                    <InputGroup size='sm'>
                                        <Field name='currency' validate={Validators.required}>
                                            {({ meta, input }) => (
                                                <FinalFormSelect feedback={false} fieldProps={{ meta, input }} options={<CurrencyOptions />} />

                                            )}
                                        </Field>
                                        <Field name='amount' validate={composeValidators(Validators.required, Validators.mustBeDecimal)}>
                                            {({ meta, input }) => (
                                                <FinalFormInput feedback={false} fieldProps={{ meta, input }} />
                                            )}
                                        </Field>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <label>Detalles: </label>
                                    <Field name='comment' validate={Validators.required}>
                                        {({ meta, input }) => (
                                            <FinalFormInput as='textarea' fieldProps={{ meta, input }} />
                                        )}
                                    </Field>
                                </FormGroup>

                            </form>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                    <Button form='transfer-form' type='submit' variant="primary">Realizar Transferencia</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
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