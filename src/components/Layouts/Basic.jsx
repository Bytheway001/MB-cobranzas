import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'

import { connect } from 'react-redux';

import Navbar from '../Navbar';

const BasicLayout = ({ children }) => {
    return (
        <Fragment>
            <Navbar />
            <Container fluid className='p-5'>

                {children}
            </Container>
        </Fragment>

    )
}

const mapStateToProps = state => ({
    user: state.session.user
})
export default connect(mapStateToProps, null)(BasicLayout)