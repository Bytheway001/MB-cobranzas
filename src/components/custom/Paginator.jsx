import React, { Fragment } from 'react';
import { Pagination, Row, Col, FormGroup, FormControl } from 'react-bootstrap';
import {faBan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/* Refactored */
export const Paginator = ({ pages, setPage, activePage, paginationData, setRows }) => {
    const { offset, rowsPerPage } = paginationData;
    // Initial active Page =0;
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Pagination >

                <Pagination.First onClick={() => setPage(1)} />
                <Pagination.Prev />

                <PaginationLinks setPage={setPage} active={activePage} length={pages.length} />

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


const PaginationLinks = ({ active, length,setPage }) => {
    return (
        <Fragment>

            {active > 2 ? <Pagination.Item onClick={()=>setPage(active-1)}>{active - 1}</Pagination.Item> : <Pagination.Item> <FontAwesomeIcon color='red' icon={faBan}/></Pagination.Item>}
            {active > 0 ? <Pagination.Item onClick={()=>setPage(active)}>{active}</Pagination.Item> : <Pagination.Item><FontAwesomeIcon color='red' icon={faBan}/></Pagination.Item>}
            <Pagination.Item active>{active + 1}</Pagination.Item>
            {active < length - 1 ? <Pagination.Item onClick={()=>setPage(active+2)}>{active + 2}</Pagination.Item > : <Pagination.Item disabled><FontAwesomeIcon color='red' icon={faBan}/></Pagination.Item>}
            {active < length -2 ? <Pagination.Item onClick={()=>setPage(active+3)}>{active + 3}</Pagination.Item> : <Pagination.Item disabled><FontAwesomeIcon color='red' icon={faBan}/></Pagination.Item>}
        </Fragment>
    )
}
