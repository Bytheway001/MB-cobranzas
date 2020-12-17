import React,{useState} from 'react';
import {Button,Modal} from 'react-bootstrap'
import { CurrencyChange } from '../../../Forms/CurrencyChange';


export const CurrencyChangeForm = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button block size='sm' onClick={() => setShow(true)}>Cambiar Divisas</Button>
            <Modal size='lg' show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambio de Divisas</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <CurrencyChange />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => setShow(false)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}