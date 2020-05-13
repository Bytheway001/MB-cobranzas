import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getExpenses } from '../../../ducks/expenses';

const Expenses= props =>{
    return (
        <Row>
            <Col sm={12}>
            <h1 className="text-center">Reporte de Gastos</h1>
            <Button as={Link} to='/expenses/new'>Registrar Nuevo Gasto</Button>
            </Col>
            <Col sm={12}>

            </Col>
        </Row>
    )
}

const mapStateToProps = state=>(
    {list:state.expenses.list}
)

const mapDispatchToProps = dispatch =>(
    {
        getExpenses: ()=>getExpenses()
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Expenses);