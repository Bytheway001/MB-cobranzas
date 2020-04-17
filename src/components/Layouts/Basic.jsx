import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch, Redirect } from 'react-router-dom'
import HomeScreen from '../Screens/Home';
import { connect } from 'react-redux';
import { NewClient } from '../Screens/Clients/New';
import Navbar from '../Navbar';
import { Dashboard } from '../Screens/Dashboard';
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