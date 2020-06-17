import React,{useState,Fragment} from 'react'
import {Modal,FormGroup,Table,Button,FormControl} from 'react-bootstrap';
import CsvParse from '@vtex/react-csv-parse'

export const BulkModal = ({ keys, createBulkClients }) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([])
    const handleSubmit = (e) => {
        console.log(data)
        createBulkClients(data)
        setShow(false)
        setData([])
    }

    const loadData=(data)=>{
        setData(data)
    }
    return (
        <Fragment>
            <Button size='lg' variant="primary" onClick={handleShow}>Cargar Via CSV</Button>
            <Modal dialogClassName="modal-90w" size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Clientes en Masa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <CsvParse
                            keys={keys}
                            onDataUploaded={(data) => setData(data)}
                            render={onChange => <FormControl type='file' onChange={onChange} />} />
                    </FormGroup>
                    {
                        data.length > 0 &&
                        <Table size='sm' style={{ fontSize: '0.8em' }}>
                            <thead>

                                <tr>
                                    {Object.keys(data[0]).map((header, index) => (
                                        <th>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(client => (

                                        <tr>
                                            {keys.map((h, k) => {
                                                if (!client[h]) {
                                                    return <td style={{ color: 'red' }}><b>--</b></td>
                                                }
                                                return <td>{client[h]}</td>
                                            })}

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="primary">Continuar</Button>
                </Modal.Footer>

            </Modal>

        </Fragment>
    );
}