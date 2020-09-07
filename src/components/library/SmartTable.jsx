import React, { Fragment, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Paginator } from './Paginator';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

/**
 * 
 * @param {list} array of items
 * @param {headers} array of header names
 * @param {row} array of property names
 * @param {actions} boolean of show action buttons (To do refactoring)
 */

function convertToDate(string) {
    let regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (regex.test(string)) {
        let arrDate = string.split('-');
     
       return arrDate[2]+arrDate[1]+arrDate[0];
    }
    else {
        return string;
    }
}
export const SmartTable = ({ list, headers, rows, paginated, actions, ...props }) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [sortBy, setSortBy] = useState({ criteria: null, direction: 'UP' });



    /* Pagination logic */

    const pages = []

    const paginationData = {
        totalPages: Math.ceil(list.length / rowsPerPage),
        offset: (page - 1) * parseInt(rowsPerPage),
        rowsPerPage
    }



    for (let i = 1; i <= paginationData.totalPages; i++) {
        pages.push(i)
    }

    const handleRowsPerPage = (value) => {
        setPage(1)
        setRowsPerPage(value);
    }
    var sortedList = []
    if (sortBy.criteria) {

        sortedList = list.sort((a, b) => {
            let Asort = convertToDate(a[sortBy.criteria]);
            let Bsort = convertToDate(b[sortBy.criteria]);
           
            if (sortBy.direction === 'UP') {
                if (Asort > Bsort) {
                    return 1
                }
                else {
                    return -1
                }
            }
            else {
                if (Asort > Bsort) {
                    return -1
                }
                else {
                    return 1
                }
            }
        })
    }
    else {
        sortedList = list;
    }


    /* Devuelve la tabla con los filtros aplicados */
    const filteredList = sortedList.filter((x, index) => {
        if (index >= paginationData.offset && index < (paginationData.offset + parseInt(rowsPerPage))) {

            return true;
        }
        else {
            return false;
        }
    })




    const headerCells = headers.map((h, k) => <th key={k}>{h}<FontAwesomeIcon onClick={() => setSortBy({ criteria: rows[k], direction: sortBy.direction === 'UP' ? "DOWN" : "UP" })} style={{ float: 'right' }}
        icon={(sortBy.criteria === rows[k] && sortBy.direction === 'UP') ? faAngleDown : faAngleUp}
        color={sortBy.criteria === rows[k] ? 'purple' : 'white'}
        size='lg' />
    </th>)





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
                                return <td style={{width:h==='date'?'100px':'auto'}} key={k}>{item[h]}</td>
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
            {paginated && <Paginator paginationData={paginationData} activePage={page - 1} pages={pages} setPage={setPage} setRows={handleRowsPerPage} />}
            {tableElement}
        </Fragment>
    )
}


