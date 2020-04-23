import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import { Companies } from '../../../utils/utils';
import { Typeahead } from 'react-bootstrap-typeahead';

export const UpdateClientModal = ({ client }) => {
    const initialState = {
        plan: [client.plan],
        option: client.option,
        company: Companies.find(x => x.name === client.company).slug,
        prima: client.prima,
        frequency: client.frequency
    }
    const [show, setShow] = useState(false);
    const [plan, setPlan] = useState(initialState.plan);
    const [option, setOption] = useState(initialState.option);
    const [company, setCompany] = useState(initialState.company)
    const [prima, setPrima] = useState(initialState.prima)
    const [frequency, setFrequency] = useState(initialState.frequency)
    const handleClose = () => {
        setShow(false)
        setPlan(initialState.plan)
        setOption(initialState.option)
        setCompany(initialState.company)
        setPrima(initialState.prima)
        setFrequency(initialState.frequency)
    };
    const handleShow = () => {

        setPlan(initialState.plan)
        setOption(initialState.option)
        setCompany(initialState.company)
        setPrima(initialState.prima)
        setFrequency(initialState.frequency)
        setShow(true);
    }

    return (
        <>
            <Button onClick={handleShow} block>Actualizar Poliza</Button>

            <Modal size='lg' show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Poliza de cliente</Modal.Title>
                    {JSON.stringify(client.company)}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <label>Aseguradora</label>
                                    <FormControl size='sm' as='select' value={company} onChange={({ target }) => setCompany(target.value)}>
                                        <option value="">Seleccione...</option>
                                        {
                                            Companies.map((c, index) => (
                                                <option value={c.slug} key={index}>{c.name}</option>
                                            ))
                                        }
                                    </FormControl>

                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <label>Plan</label>
                                    <Typeahead
                                        inputProps={{ required: true }}
                                        defaultInputValue=""
                                        id='plan'
                                        clearButton={true} size='sm'
                                        selected={plan}
                                        options={Companies.find(x => x.slug === company.id) && Companies.find(x => x.slug === company).plans.map(plan => plan) || []}
                                        onChange={setPlan}
                                        labelKey='name'
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <label>Opcion</label>
                                    <FormControl size='sm' value={option} onChange={({ target }) => setOption(target.value)} />

                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <label>Prima</label>
                                    <FormControl size='sm' value={prima} onChange={({ target }) => setPrima(target.value)} />

                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                    <label>Frecuencia de Pago</label>
                                    <FormControl size='sm' value={frequency} onChange={({ target }) => setFrequency(target.value)} />

                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}