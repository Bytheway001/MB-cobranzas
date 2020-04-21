import React, { Fragment } from 'react'
import { Container, Alert } from 'react-bootstrap'

import { connect } from 'react-redux';

import Navbar from '../Navbar';

const BasicLayout = ({ children }) => {
    return (
        <Fragment>
            <Navbar />
            <Container fluid className='p-5'>

                {children}
            </Container>
            <Notification/>
        </Fragment>

    )
}

const Notification=(props)=>(
    <Alert dismissible variant='danger' className='notification'>
        This is a text notification with a brief message
    </Alert>
)

const mapStateToProps = state => ({
    user: state.session.user
})
export default connect(mapStateToProps, null)(BasicLayout)