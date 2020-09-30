import React, { useState } from 'react';
import { Button, Modal, Row, Col, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
export const ChangesModal = () => {
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
                    <Cambio type='Correccion' title="Reportes de Cambios al sistema">
                            <p className='my-0'>Se agrego la opcion de modificar el ID de hubspot al editar la poliza del cliente</p>
                        </Cambio>
                        <Cambio type='Correccion' title="Reportes de Cambios al sistema">
                            <p className='my-0'>Se ha agregado a la pantalla principal la alerta con los cambios de version,Cada vez que se realizen cambios en la aplicacion, los vamos a describir por aca (esta misma lista que estas leyendo), esten atentos a la fecha del alerta para saber cuando fueron subidos estos cambios</p>
                        </Cambio>
                        <Cambio type='Mejora' title="Reportes de Cambios al sistema">
                            <p className='my-0'>Se ha agregado a la pantalla principal la alerta con los cambios de version,Cada vez que se realizen cambios en la aplicacion, los vamos a describir por aca (esta misma lista que estas leyendo), esten atentos a la fecha del alerta para saber cuando fueron subidos estos cambios</p>
                        </Cambio>
                        <Cambio type='Mejora' title='Pestaña "Mi gestion" en la barra de navegacion'>
                            <p className='my-0'>A partir de esta version, podremos acceder a nuestra gestion, mediante el link ubicado en la barra de navegacion, la cual nos permite ver las cobranzas/gastos/ingresos que hemos realizado</p>
                        </Cambio>
                        <Cambio type='Mejora' title='PDF de ingresos/egresos ahora es descargable'>
                            <p className='my-0'>hemos agregado la funcionalidad de descargar nuevamente los PDF generados al registrar un gasto o Ingreso</p>
                        </Cambio>
                        <Cambio type='Correccion' title="Email a personas etiquetadas en cobranzas">
                            <p className='my-0'>Ahora al realizar una cobranza, podras etiquetar a las personas que desees enviar un correo para notificar la realizacion de la misma</p>
                        </Cambio>
                        <Cambio type='Importante' title="Email a personas etiquetadas en cobranzas">
                            <p className='my-0'>Los pagos con fecha previa al 29/9 mostraran como operador "Ninguno" en el comprobante, debido a que antes de esta fecha esta funcion no estaba disponible</p>
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