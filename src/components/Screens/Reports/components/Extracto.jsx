
import React, { useState } from 'react'
import { Modal, Button, ButtonGroup, Row, Col } from 'react-bootstrap'
import { formatMoney } from '../../../../utils/utils'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit'
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'
export const Extracto = ({ show, setShow, data, bob, usd }) => {
    const { ExportCSVButton } = CSVExport;
    const [month, setMonth] = useState("");
    const [balance] = useState("all");
    if (data.length > 0) {
        let saldoInicial = data.reduce((prev, obj) => {
            if (obj.currency === 'USD') {
                return {
                    ...prev,
                    USD: prev.USD - parseFloat(obj.debe) + parseFloat(obj.haber)
                }
            }
            else {

                return {
                    ...prev,
                    BOB: prev.BOB - parseFloat(obj.debe) + parseFloat(obj.haber)
                }
            }
        }, { BOB: bob, USD: usd })
        const finalData = data.map((row) => {
            saldoInicial[row.currency] = saldoInicial[row.currency] + parseFloat(row.debe) - parseFloat(row.haber)
            let obj = {
                date: row.date,
                description: row.description,
                currency: row.currency,
                debe: formatMoney(row.debe, '2', ',', '.',row.currency==="USD"?"$":"Bs. "),
                haber: formatMoney(row.haber, '2', ',', '.',row.currency==="USD"?"$":"Bs. "),
                saldo_usd: formatMoney(saldoInicial.USD, '2', ',', '.',),
                saldo_bob: formatMoney(saldoInicial.BOB, '2', ',', '.','Bs.'),
                category:row.category
            }

            return obj;
        }
        ).filter(x => parseInt(x.date.split('-')[1]) === parseInt(month) || month === "")
            .filter(z => {
                return balance === "all" || ((z.t === 'Ingreso' || z.t === 'Cobranza') && balance === "in") || ((z.t === 'Gasto' || z.t === 'Pago Poliza') && balance === "out")
            })
      
        const columns = [
            { dataField: 'date', text: 'Fecha' },
            { dataField:'category',text:'Categoria',filter:selectFilter({ options: [...new Set(finalData.map(e => (e['category'])))].map(x => ({ value: x, label: x })), className: 'form-control-sm', placeholder: 'Todas' })},
            { dataField: 'description', text: "Desc." },
            { dataField: 'currency', text: "Moneda",filter: selectFilter({ options: [{value:'USD',label:'USD'},{value:'BOB',label:'BOB'}], className: 'form-control-sm', placeholder: 'Todas' }) },
            { dataField: 'debe', text: "Debe" },
            { dataField: 'haber', text: "Haber" },
            { dataField: 'saldo_usd', text: "Saldo (USD)" },
            { dataField: 'saldo_bob', text: "Saldo (BOB)" }
            
        ]
        return (
            <>

                <Modal size='xl' show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Movimientos De Cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={4}>
                                <ButtonGroup size='sm' className='mb-3'>
                                    <Button className='secondary' disabled>Mes: </Button>
                                    <Button onClick={() => setMonth('01')}>Ene.</Button>
                                    <Button onClick={() => setMonth('02')}>Feb.</Button>
                                    <Button onClick={() => setMonth('03')}>Mar.</Button>
                                    <Button onClick={() => setMonth('04')}>Abr.</Button>
                                    <Button onClick={() => setMonth('05')}>May.</Button>
                                    <Button onClick={() => setMonth('06')}>Jun.</Button>
                                    <Button onClick={() => setMonth('07')}>Jul.</Button>
                                    <Button onClick={() => setMonth('08')}>Ago.</Button>
                                    <Button onClick={() => setMonth('09')}>Sep.</Button>
                                    <Button onClick={() => setMonth('10')}>Oct.</Button>
                                    <Button onClick={() => setMonth('11')}>Nov.</Button>
                                    <Button onClick={() => setMonth('12')}>Dic.</Button>
                                </ButtonGroup>
                            </Col>

                        </Row>

                        <ToolkitProvider keyField='id' data={finalData} columns={columns} exportCSV={{
                            fileName: 'Movimiento de Caja.csv',
                            noAutoBOM: false,
                            exportAll: false,
                            onlyExportFiltered: true,
                            separator: ";"
                        }} >
                            {
                                props => {
                                    return (
                                        <>
                                            <ExportCSVButton className='btn btn-primary btn-sm my-2' {...props.csvProps}>Descargar CSV!!</ExportCSVButton>
                                            <BootstrapTable id='cashflowtable' {...props.baseProps} striped hover bootstrap4={true} rowStyle={{ fontSize: '0.9em' }} condensed filter={filterFactory()} />
                                        </>
                                    )

                                }
                            }

                        </ToolkitProvider>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
              </Button>
                        <Button variant="primary" onClick={() => setShow(false)}>
                            Save Changes
              </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )

    }
    else return null







}
