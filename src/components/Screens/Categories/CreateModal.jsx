import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoryForm from './Form';


export const CreateModal = ({ categoryList, text,editing,btnStyle }) => {
    const [show, setShow] = useState(false);


    return (
        <>
            <Button style={btnStyle} size='sm' variant="info" onClick={() => setShow(true)}>{text}</Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategoryForm categoryList={categoryList} editing={editing} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
          </Button>
                    <Button type='submit' form='category-form'>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}