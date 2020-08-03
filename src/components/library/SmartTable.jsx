import React, { Fragment,useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Paginator } from './Paginator';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {list} array of items
 * @param {headers} array of header names
 * @param {row} array of property names
 * @param {actions} boolean of show action buttons (To do refactoring)
 */

export const SmartTable = ({ list, headers, rows, paginated,actions,...props }) => {
    const [page,setPage]=useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const pages = []

    const paginationData={
        totalPages:Math.ceil(list.length / rowsPerPage),
        offset:(page-1) * parseInt(rowsPerPage),
        rowsPerPage
    }

    

    for (let i = 1; i <= paginationData.totalPages; i++) {
        pages.push(i)
    }

    const handleRowsPerPage=(value)=>{
        setPage(1)
        setRowsPerPage(value);
    }

    const filteredList = list.filter((x, index) => {
        if (index >= paginationData.offset && index < (paginationData.offset + parseInt(rowsPerPage))) {
            console.log(index, paginationData.offset)
            console.log(paginationData.offset+parseInt(rowsPerPage))
            console.log('***')
            return true;
        }
        else {
            return false;
        }
    })

    const headerCells = headers.map((h, k) => <th key={k}>{h}</th>)

    /* This is the actual JSX for the table */
    const tableElement = (
        <Table size='sm' {...props} variant='bordered' style={{ fontSize: '0.8em' }}>
            <thead>
                <tr className='bg-info text-white'>
                    {headerCells}
                    {actions && <td>Acciones</td>}
                </tr>
            </thead>
            <tbody>
                {
                    filteredList.map(item => (
                        <tr>
                            {rows.map((h, k) => {
                                return <td key={k}>{item[h]}</td>
                            })}
                            {actions && <td><Button as={Link} to={'/clients/profile/' + item.id} block size='sm' style={{ padding: 2 }}>Ver Poliza</Button></td>}
                        </tr>
                    ))
                }
            </tbody>

        </Table>
    )


    return (
        <Fragment>
            {paginated && <Paginator paginationData={paginationData} activePage={page-1} pages={pages} setPage={setPage} setRows={handleRowsPerPage}/>}
            {tableElement}
        </Fragment>
    )
}


