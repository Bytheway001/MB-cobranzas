import React from 'react';
import { Table, Button, Pagination, FormControl, Row, Col, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Select } from '../../custom/Controls';
const Paginator = ({ pages, setPage }) => (
    <Pagination>
        <Pagination.First onClick={() => setPage(1)} />
        <Pagination.Prev />
        {pages.map((x, index) => {
            return (
                <Pagination.Item onClick={() => setPage(x)}>{x}</Pagination.Item>
            )

        })}
        <Pagination.Next />
        <Pagination.Last onClick={() => setPage(pages.length)} />
    </Pagination>
)




export const ClientList = ({ list }) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = Math.ceil(list.length / rowsPerPage)
    const pages = []
    const offset = (page-1) * parseInt(rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    
    const handleRowsPerPage=(value)=>{
       
        setPage(1)
        setRowsPerPage(value);
    }

    const filteredList = list.filter((x, index) => {
        if (index >= offset && index < (offset + parseInt(rowsPerPage))) {
            console.log(index, offset)
            console.log(offset+parseInt(rowsPerPage))
            console.log('***')
            return true;
        }
        else {
            return false;
        }
    })

    const options = [5, 10, 20, 50].map((p, key) => {
        return <option value={p}>{p}</option>
    })

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Paginator pages={pages} setPage={setPage} />
                <Col>Mostrando desde {offset} hasta {offset + parseInt(rowsPerPage)}</Col>
                <FormGroup as={Row}>
                    <Col sm={8}>
                        <label>Resultados Por Pagina</label>
                    </Col>

                    <Col>
                        <FormControl size='sm' as='select' onChange={({ target }) => handleRowsPerPage(target.value)}>
                            {
                                [10, 25, 50, 100].map((x, i) => {
                                    return <option key={i} value={x}>{x}</option>
                                })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>
            </div>


            <Table variant='striped' size='sm' style={{ fontSize: '0.75em' }}>
                <thead>
                    <tr className='bg-info text-white'>
                        <th style={{ width: '1%' }}>Numero</th>
                        <th>{page} Cliente</th>
                        <th>{offset}Agente</th>
                        <th>Cobrador</th>
                        <th>Aseguradora</th>
                        <th>Plan</th>
                        <th>Opcion</th>
                        <th>Fecha Renovacion</th>
                        <th>Fecha Efectiva</th>
                        <th>Frecuencia de Pago</th>
                        <th>Estado</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((client, key) => (
                            <tr>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.agent}</td>
                                <td>{client.collector}</td>
                                <td>{client.company}</td>
                                <td>{client.plan}</td>
                                <td>{client.option}</td>
                                <td>{client.effective_date}</td>
                                <td>{client.renovation_date}</td>
                                <td>{client.frequency}</td>
                                <td>{client.status}</td>
                                <td><Button as={Link} to={'/clients/profile/' + client.id} block size='sm' style={{ padding: 2 }}>Ver Poliza</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </div>
    )
}