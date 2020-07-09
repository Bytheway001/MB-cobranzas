import React from 'react';
import { Pagination, Row, Col,FormGroup,FormControl } from 'react-bootstrap';
/* Refactored */
export const Paginator = ({ pages, setPage, activePage, paginationData,setRows }) => {
    const {offset,rowsPerPage} = paginationData;
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Pagination >
                <Pagination.First onClick={() => setPage(1)} />
                <Pagination.Prev />
                {pages.map((x, index) => {
                    return (
                        <Pagination.Item active={index === activePage} onClick={() => setPage(x)}>{x}</Pagination.Item>
                    )

                })}
                <Pagination.Next className='bg-primary text-white' />
                <Pagination.Last onClick={() => setPage(pages.length)} />
            </Pagination>
            <Col>Mostrando desde {offset} hasta {offset + parseInt(rowsPerPage)}</Col>
            <FormGroup as={Row}>
                <Col sm={8}>
                    <label>Resultados Por Pagina</label>
                </Col>

                <Col>
                    <FormControl size='sm' as='select' onChange={({ target }) => setRows(target.value)}>
                        {
                            [10, 25, 50, 100].map((x, i) => {
                                return <option key={i} value={x}>{x}</option>
                            })
                        }
                    </FormControl>
                </Col>
            </FormGroup>
        </div >
    )
}

