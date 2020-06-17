import React from 'react'
import { Spinner } from 'react-bootstrap'

export const LoadingCard = props => {
    return (
        <div className='d-flex align-items-center justify-content-center h-100'>
            <Spinner animation='grow' className='text-primary'></Spinner>
        </div>

    )
}