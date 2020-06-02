import React, { useEffect } from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { getPaymentList, validatePayment } from '../../../ducks/payments'
import { connect } from 'react-redux'
import { formatMoney } from '../../../utils/utils'
import { MethodsArray } from '../../../options/options'

const PaymentsReport = ({ getPayments, list, validate,accounts }) => {
    useEffect(() => {
        getPayments()
    }, [])

    const validatePayment = (id) => {
        if (window.confirm('Seguro que desea validar esta cobranza?')) {
            validate(id);
            getPayments();
        }
    }
    return (
        <Row>
            <Col sm={12}>
                <h1 className="text-center">Reporte General de Cobranzas</h1>
            </Col>
            <Col sm={12}>
                <Table variant='bordered' size='sm' className='complex-table'>
                    <thead>
                        <tr>
                            <th rowSpan={2}>Ciudad</th>
                            <th rowSpan={2}>Fecha</th>
                            <th rowSpan={2}>Cliente</th>
                            <th rowSpan={2}>Monto Cancelado</th>
                            <th colSpan={3}>Descuentos</th>
                            <th rowSpan={2}>Procesado</th>
                            <th rowSpan={2}>Cobrador</th>
                            <th rowSpan={2}>Metodo de pago</th>
                            <th rowSpan={2}>Cuenta Receptora</th>
                        </tr>
                        <tr>
                            <th>Agencia</th>
                            <th>Agente</th>
                            <th>Aseguradora</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((payment, index) => (
                                <tr>
                                    <td>{payment.city.toUpperCase()}</td>
                                    <td>{payment.payment_date}</td>
                                    <td>{payment.client}</td>

                                    <td>{formatMoney(payment.amount, '2', ',', '.', payment.currency === 'USD' ? "$" : 'Bs.')}</td>
                                    <td>{formatMoney(payment.agency_discount, '2', ',', '.', payment.currency === 'USD' ? "$" : 'Bs.')}</td>
                                    <td>{formatMoney(payment.agent_discount, '2', ',', '.', payment.currency === 'USD' ? "$" : 'Bs.')}</td>
                                    <td>{formatMoney(payment.company_discount, '2', ',', '.', payment.currency === 'USD' ? "$" : 'Bs.')}</td>
                                    <td className='text-center'>
                                        {payment.processed ?
                                            'Procesado' :
                                            <Button onClick={() => validatePayment(payment.id)} block variant='warning' size='sm'>Validar</Button>
                                        }
                                    </td>
                                    <td>{payment.collector}</td>
                                    <td style={{fontSize:'0.8em'}}>{MethodsArray[payment.payment_method]}</td>
                                    <td>{accounts.length>0&&accounts.find(x=>x.id==payment.account).name}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}
const mapStateToProps = state => (
    { 
        list: state.payments.list,
        accounts:state.accounts.list
     }
)
const mapDispatchToProps = dispatch => (
    {
        getPayments: () => dispatch(getPaymentList()),
        validate: (id) => dispatch(validatePayment(id))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsReport)