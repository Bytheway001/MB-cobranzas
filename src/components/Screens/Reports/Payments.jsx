import React, { useEffect } from 'react'
import { Row, Col,Button, Card } from 'react-bootstrap'
import { getPaymentList, validatePayment } from '../../../ducks/payments'
import { connect } from 'react-redux'
import { formatMoney, methods } from '../../../utils/utils'

import BootstrapTable from 'react-bootstrap-table-next'

const PaymentsReport = ({ getPayments, list, validate }) => {
    useEffect(() => {
        getPayments()
    }, [getPayments])

    const validatePayment = (id) => {
        if (window.confirm('Seguro que desea validar esta cobranza?')) {
            validate(id);
            getPayments();
        }
    }
    const columns = [
        { dataField: 'id', text: "#Ref", style: { textAlign: 'center', verticalAlign: 'middle'},headerStyle:{width:40} },
        { dataField: 'payment_date', text: "Fecha", style: { textAlign: 'center', verticalAlign: 'middle' },headerStyle:{width:80} },
        { dataField: 'policy.plan.company.name', text: "Aseguradora", style: { textAlign: 'center', verticalAlign: 'middle' } },
        { dataField: 'policy.client.first_name',text:"Cliente",style:{ textAlign: 'center', verticalAlign: 'middle' }},
        { dataField: 'planoption', text: "Plan", formatter: (cell, row) => (`${row.policy.plan.name}-${formatMoney(row.policy.option)}`), style: { textAlign: 'center', verticalAlign: 'middle' } },
        { dataField: 'currency', text: "Moneda", style: { textAlign: 'center', verticalAlign: 'middle' } },
        { dataField: 'amount', text: "Monto", formatter: (cell) => formatMoney(cell, '2', '.', ',', ' '), style: { textAlign: 'right', verticalAlign: 'middle' } },
        { dataField: 'company_discount', text: "D. Aseg", formatter: (cell) => formatMoney(cell, '2', '.', ',', ' '), style: { textAlign: 'right', verticalAlign: 'middle' } },
        { dataField: 'agency_discount', text: "D. Agencia", formatter: (cell) => formatMoney(cell, '2', '.', ',', ' '), style: { textAlign: 'right', verticalAlign: 'middle' } },
        { dataField: 'agent_discount', text: "D. Agente", formatter: (cell) => formatMoney(cell, '2', '.', ',', ' '), style: { textAlign: 'right', verticalAlign: 'middle' } },
        { dataField: 'processed', text: "Procesado?", formatter: (cell,row) =>{
            return cell===0?<Button block size='sm' variant='success' onClick={()=>validatePayment(row.id)}>Validar</Button>:"SI"
        } },
        { dataField: 'payment_method', text: "Metodo",formatter:(cell)=>methods[cell]},
        { dataField: 'account.name', text: 'Cuenta Receptora', formatter: (cell) => cell===null ? "N/A" : cell }
    ]

    return (
        <Row>
            <Col sm={12}>
                <Card>
                    <Card.Header className='bg-primary text-white'>Validacion de Cobranzas</Card.Header>
                    <Card.Body>
                        <BootstrapTable classes='table-sm table-striped' keyField='id' columns={columns} data={list.filter(x=>!x.corrected_with)} />
                    </Card.Body>
                </Card>

            </Col>
        </Row>
    )
}
const mapStateToProps = state => (
    {
        list: state.payments.list,
        accounts: state.accounts.list
    }
)
const mapDispatchToProps = dispatch => (
    {
        getPayments: () => dispatch(getPaymentList()),
        validate: (id) => dispatch(validatePayment(id))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsReport)