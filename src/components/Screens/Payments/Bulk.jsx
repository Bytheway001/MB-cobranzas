import React from 'react';
import { Row, FormControl, Col } from 'react-bootstrap';
import CsvParse from '@vtex/react-csv-parse'
export const BulkPayments =()=>{
    const keys = [
        'city',
        'payment_method',
        'payment_type',
        'policy_number',
        'payment_date',
        'agency_discount',
        'agent_discount',
        'company_discount',
        'currency',
        'amount',
        'account'
    ]

    return(
        <Row>
            <Col sm={12}>
            <CsvParse
                            keys={keys}
                         
                            render={onChange => <FormControl type='file' onChange={onChange} />} />
            </Col>
        </Row>
    )
}