import React, { useEffect } from 'react'
import { Row, Col, Button, Table, Card } from 'react-bootstrap';
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

                <h1 className="text-center"></h1>
               
            </Col>
            <Col sm={12}>
                <Card>
                    <Card.Header className='bg-primary w-100 d-flex flex-row text-white align-items-center justify-content-between'>
                        <span>Reporte de Gastos</span>
                        <Button variant='info' size='sm' as={Link} to='/expenses/new'>Registrar Nuevo Gasto</Button>
                    </Card.Header>
                    <Card.Body>
                        <Table variant='striped' size='sm'>
                            <thead className='bg-info text-white'>
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
                    </Card.Body>
                </Card>

            </Col>
        </Row>
    )
}

const mapStateToProps = state => (
    { list: state.expenses.expenses }
)

const mapDispatchToProps = dispatch => (
    {
        getExpenses: () => dispatch(getExpenses())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);