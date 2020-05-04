import React, { Fragment } from 'react'
import { Container, Alert } from 'react-bootstrap'

import { connect } from 'react-redux';

import Navbar from '../Navbar';
import { deleteNotification } from '../../ducks/notifications';

const BasicLayout = ({ children, notifications, deleteNotification }) => {
    return (
        <Fragment>
            <Navbar />
            <Container fluid className='p-5'>

                {children}
            </Container>
            <div className='notification-wrapper'>
                {
                    notifications.length > 0 && notifications.map((not, index) => {
                        return <Notification index={index} key={index} deleteNotification={deleteNotification} type={not.type}>{not.text}</Notification>
                    })
                }
            </div>


        </Fragment>

    )
}

const Notification = ({ children, type, deleteNotification, index }) => (
    <Alert dismissible onClose={() => deleteNotification(index)} variant={type} className='notification'>
        {children}
    </Alert>
)

const mapStateToProps = state => ({
    user: state.session.user,
    notifications: state.notifications
})
const mapDispatchToProps = dispatch => ({
    deleteNotification: (index) => dispatch(deleteNotification(index))
})
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)