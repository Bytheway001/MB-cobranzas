import React from 'react';
import { Card, Row,Col } from 'react-bootstrap';

export const CustomCard = ({ children, title, ...props }) => {
    return (
        
                <Card className='custom-card h-100'>
                    <Card.Header className='bg-primary text-white'>{title}</Card.Header>
                    <Card.Body>
                        {children}
                    </Card.Body>
                </Card>
            

    )
}