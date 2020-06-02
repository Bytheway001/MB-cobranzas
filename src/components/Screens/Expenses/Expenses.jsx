import React, { useEffect } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getExpenses } from '../../../ducks/expenses';


const Expenses = ({ getExpenses, list }) => {
    useEffect(() => {
        getExpenses()
    }, [])


    return (
        <Row>
            <Col sm={12}>

                <h1 className="text-center">Reporte de Gastos</h1>
                <Button as={Link} to='/expenses/new' className='mb-5'>Registrar Nuevo Gasto</Button>
            </Col>
            <Col sm={12}>
                <Table size='sm'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th># Factura</th>
                            <th>Descripcion</th>
                            <th>Monto</th>
                            <th>Cuenta Pagadora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((expense, key) => (
                                <tr>
                                    <td>{expense.date}</td>
                                    <td>{expense.bill_number}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount + ' ' + expense.currency}</td>
                                    <td>{expense.account_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => (
    { list: state.expenses.list }
)

const mapDispatchToProps = dispatch => (
    {
        getExpenses: () => dispatch(getExpenses())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);