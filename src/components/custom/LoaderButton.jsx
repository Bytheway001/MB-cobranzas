import React from 'react';
import { Spinner, Button } from 'react-bootstrap';
export const LoaderButton = ({loading,children,size,...props})=>{
    return(
        <Button {...props}>
            {
                loading?
                <Spinner animation='border' size={size}/>
                :
                children
            }
            
        </Button>
    )
   
}