import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import Axios from 'axios';
import { UserPayments } from '../../Clients/Profile';
import { API } from '../../../../utils/utils';

export const UserPaymentsModal = ({ client }) => {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        Axios.get(API + '/clients/show/' + client.id).then(res => {
            setProfile(res.data.data)
        }
        )
    }, [client.id])
    console.log(profile)
    return (
        <>
            <Button block size='sm' onClick={() => setShow(true)}>Historial de Pago</Button>
            <Modal size='lg' show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Historial de Pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                    {profile && <UserPayments payments={profile.payments} />}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => setShow(false)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}