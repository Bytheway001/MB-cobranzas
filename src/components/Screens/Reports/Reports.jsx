import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Reports = (props)=>{
    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Seleccione un reporte</h1>
            </Col>
            <Col sm={4}>
                <Button as={Link} to='/reports/payments' block>Reporte General de Cobranzas</Button>
                <Button as={Link} to='/reports/rcc' block>Reporte de Cobranza por compañias</Button>
                <Button as={Link} to='/reports/general' block>Reporte general de Estado</Button>
                <Button as={Link} to='/reports/general' block>Cheques en Transito</Button>
            </Col>
        </Row>
    )
}

export default Reports