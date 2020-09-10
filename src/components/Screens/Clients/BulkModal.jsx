import React,{useState,Fragment} from 'react'
import {Modal,FormGroup,Table,Button,FormControl, Alert} from 'react-bootstrap';
import CsvParse from '@vtex/react-csv-parse'

export const BulkModal = ({ keys, createBulkClients }) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [errors,setErrors]=useState('');
    const handleSubmit = (e) => {
        console.log(data)
        createBulkClients(data)
        setShow(false)
        setData([])
    }



    const loadData=(data)=>{
        console.log(data)
        let badRows = data.filter(x=>x.h_id==='')
        if(badRows.length>0){
            setErrors("Hay "+badRows.length+' Registros con problemas')
        }
        else{
            setErrors("");
        }
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
                            onDataUploaded={(data) => loadData(data)}
                            render={onChange => <FormControl type='file' onChange={onChange} />} />
                        {data && <p>{data.length} Registros a cargar</p>}
                        {errors && <Alert variant='danger'>{errors}</Alert>}
                    </FormGroup>
                    {
                        data.length > 0 &&
                        <Table size='sm' style={{ fontSize: '0.8em' }}>
                            <thead>

                                <tr>
                                    {keys.map((header, index) => (
                                        <th>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(client => (

                                        
                                        <tr className={client.h_id!==''?'white':'bg-danger'}>
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