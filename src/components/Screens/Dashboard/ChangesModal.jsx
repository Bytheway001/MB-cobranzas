import React, { useState } from 'react';
import { Button, Modal, Row, Col, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
export const ChangesModal = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button size='sm' onClick={() => setShow(true)}>Ver Cambios (29/10)</Button>
            <Modal size='xl' show={show} onHide={() => setShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <p className='my-0'>Version Actual:2.1</p>
                        Cambios de Version
                        </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>NOTA: Los colores a continuacion indican a que se refiere cada nota</Col>
                        <Col>
                            <h4><Badge variant='success'>Nuevas Funcionalidades</Badge></h4>
                        </Col>
                        <Col>
                            <h4><Badge variant='info'>Informacion</Badge></h4>
                        </Col>
                        <Col>
                            <h4> <Badge size='md' variant='danger'>Notas Importantes</Badge></h4>

                        </Col>
                        <Col>
                            <h4> <Badge size='md' variant='warning'>Correccion de errores</Badge></h4>

                        </Col>
                    </Row>
                    <ListGroup>
                    <Cambio type='Mejora' title="Reportes de Cambios al sistema">
                            <p className='my-0'>Cambios en Recibos de Gastos</p>
                            <p>Los comprobantes de gastos ahora muestran la categoria del gasto registrado</p>
                        </Cambio>
                    <Cambio type='Mejora' title="Reportes de Cambios al sistema">
                            <p className='my-0'>Reportes del mes</p>
                            <p>Ahora los reportes mostraran inicialmente las operaciones llevadas a cabo en el mes actual, de igual manera se puede filtrar si se necesita un rango mayor</p>
                        </Cambio>
                        <Cambio type='Correccion' title="Reportes de Cambios al sistema">
                            <p className='my-0'>Se han modificado los datos en el comprobante PDF de Gastos/Ingresos</p>
                            <p>Se acomodo el campo "firma operador" que estaba duplicado por "recibido conforme" </p>
                            <p>Se coloco la cuenta pagadora/receptora de la operacion</p>
                            <p>Los comprobantes de egreso ahora muestran el campo "#egreso" correctamente</p>
                        </Cambio>
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

const Cambio = ({ type, title, children }) => {
    const types = [
        { type: 'Info', variant: 'info' },
        { type: 'Mejora', variant: 'success' },
        { type: 'Correccion', variant: 'warning' },
        { type: 'Importante', variant: 'danger' }
    ]
    const noticiatype = types.find(x => x.type === type)
    return (
        <ListGroupItem className={'my-1 bg-' + noticiatype.variant}>
            <h5>{'[' + noticiatype.type.toUpperCase() + ']'} {title}</h5>
            {children}
        </ListGroupItem>
    )
}