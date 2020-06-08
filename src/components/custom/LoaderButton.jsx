import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
export const LoaderButton = ({loading,children,...props})=>{
    return(
        <Button {...props}>
            {
                loading?
                <Spinner animation='border'/>
                :
                children
            }
            
        </Button>
    )
   
}