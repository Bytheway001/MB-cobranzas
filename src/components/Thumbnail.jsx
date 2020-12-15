import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const buttonStyle = {
    height: 120,
    fontSize: '0.9em'
}

export const Thumbnail = ({ title, as, to, icon, onClick }) => {
    if (as) {
        return (
            <Button as={as} to={to} className='my-1 d-flex flex-column justify-content-center' block style={buttonStyle}>
                <p><FontAwesomeIcon size='3x' icon={icon} /></p>
                {title}
            </Button>
        )
    }
    else {
        return (
            <Button onClick={onClick} to={to} className='my-1 d-flex flex-column justify-content-center align-items-center' block style={buttonStyle}>
                <p><FontAwesomeIcon size='3x' icon={icon} /></p>
                {title}
            </Button>
        )
    }

}