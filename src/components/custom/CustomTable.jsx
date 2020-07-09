import React, { Fragment,useState } from 'react';
import { Table } from 'react-bootstrap';
import { Paginator } from './Paginator';

export const CustomTable = ({ list, headers, rows, paginated }) => {
    const [page,setPage]=useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const paginationData={
        totalPages:Math.ceil(list.length / rowsPerPage),
        offset:(page-1) * parseInt(rowsPerPage),
        rowsPerPage

    }

    const pages = []

    
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

    const options = [5, 10, 20, 50].map((p, key) => {
        return <option value={p}>{p}</option>
    })

    const headerCells = headers.map((h, k) => <th key={k}>{h}</th>)
    const tableElement = (
        <Table size='sm' variant='bordered' style={{ fontSize: '0.8em' }}>
            <thead>
                <tr className='bg-info text-white'>
                    {headerCells}
                </tr>
            </thead>
            <tbody>
                {
                    filteredList.map(item => (
                        <tr>
                            {rows.map((h, k) => {
                                return <td key={k}>{item[h]}</td>
                            })}
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

