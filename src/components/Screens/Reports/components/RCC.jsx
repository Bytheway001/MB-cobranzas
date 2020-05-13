import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

export const RCC = (props) => {
    console.log('Ahuehue')
    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Reporte de Cobranzas Por Compañia</h1>
            </Col>
            <Col sm={12}>
                <Table size='sm' variant='bordered'>
                    <thead>
                        <tr className='bg-warning'>
                            <th></th>
                            <th colSpan={3}>EFECTIVO</th>
                            <th colSpan={3}>CHEQUES LOCALES</th>
                            <th colSpan={3}>BANCO </th>
                        </tr>
                        <tr className='bg-primary text-white'>
                            <th>Compañia</th>
                            <th>LPZ</th>
                            <th>CBB</th>
                            <th>SCZ</th>
                            <th>LPZ</th>
                            <th>CBB</th>
                            <th>SCZ</th>
                            <th>Dep. (Bisa)</th>
                            <th>Dep. (PS)</th>
                            <th>Total</th>
                            <th>CC</th>
                            <th>Transfer (Cias)</th>
                            <th>Total General</th>
                        </tr>
                    </thead>
                </Table>
            </Col>
        </Row>
    )
}