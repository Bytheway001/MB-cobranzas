import React, { useState, useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap'

import { connect } from 'react-redux';
import Navbar from '../Navbar';
import { deleteNotification } from '../../ducks/notifications';
import { getAccountList } from '../../ducks/accounts';

export const GlobalContext = React.createContext();

const BasicLayout = ({ children, listAccounts }) => {
    const [notifications, setNotifications] = useState([]);
    const addNotification=(type,message)=>{
        notifications.push({type,message})
        setNotifications([...notifications])
    }
    const deleteNotification=(i)=>{
        setNotifications([...notifications.filter((x,index)=>index!==i)])
    }
    useEffect(() => {
        listAccounts()
    }, [listAccounts])
    return (
        <GlobalContext.Provider value={{notifications, addNotification}}>
            <Navbar />
            <Container fluid className='p-5'>
                {children}
            </Container>
            <GlobalContext.Consumer >
                {({ notifications }) => (
                    <div className='notification-wrapper'>
                        {
                            notifications.length > 0 && notifications.map((not, index) => {
                                return <Notification index={index} key={index} deleteNotification={()=>deleteNotification(index)} type={not.type}>{not.message}</Notification>
                            })
                        }
                    </div>
                )}
            </GlobalContext.Consumer>
        </GlobalContext.Provider>
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
    deleteNotification: (index) => dispatch(deleteNotification(index)),
    listAccounts: () => dispatch(getAccountList())
})
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)