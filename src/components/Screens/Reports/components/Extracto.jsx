
import React from 'react'
import { Modal, Table, Button } from 'react-bootstrap'
import { formatMoney } from '../../../../utils/utils'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { CustomTable } from '../../../custom/CustomTable'
export const Extracto = ({ show, setShow, data }) => {
    const headers = ['Fecha', 'Descripcion', 'Moneda','Debe','Haber']

    if (data.length > 0) {
        const finalData = data.map((row, index) => (
            {
                date:row.date,
                description:row.description,
                currency:row.currency,
               
                debe: row.type === 'IN' ? formatMoney(row.amount,'2','.',',') : 0,
                haber: row.type === 'OUT' ?  formatMoney(row.amount,'2','.',',') :0
            })
        )
        const rows = Object.keys(finalData[0]);



            console.log(finalData)
        return (
            <>
                <Modal size='xl' show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Movimientos De Cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReactHTMLTableToExcel className='btn btn-primary btn-sm mb-2' table="caja-list" filename="tablexls" buttonText='Descargar (xls)' />
                        {finalData && <CustomTable id='caja-list' actions={false} list={finalData} rows={rows} headers={headers} paginated={true} />}
                        
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
