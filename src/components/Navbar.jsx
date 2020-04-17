import React from 'react';
import { Navbar as Bar, Nav, Form, NavDropdown, FormControl, Button, Image } from 'react-bootstrap'
import { login, logout } from '../ducks/session';
import { connect } from 'react-redux'
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router-dom';
const Navbar = ({ user, logout, login }) => {
    if(!user){
        return <Redirect to='/login'/>
    }
    return (
        <Bar variant='dark' bg="primary" expand="lg">
            <Bar.Brand href="#home">Cobranzas PS</Bar.Brand>
            <Bar.Toggle aria-controls="basic-navbar-nav" />
            <Bar.Collapse id="basic-navbar-nav">

                <Nav className="ml-auto">
                    <Bar.Brand>
                        <GoogleLogout
                            clientId='346512427285-0gs9tg2cvhd0v4b3r5h7dvjitm8fkcal.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Image src={user.imageUrl} height={32} style={{ borderRadius: 50, cursor: 'pointer' }} onClick={renderProps.onClick} />
                            )}
                            onLogoutSuccess={logout}
                        />
                    </Bar.Brand>
                    <Bar.Text>{user.email}</Bar.Text>

                </Nav>
            </Bar.Collapse>
        </Bar >
    )
}

const mapStateToProps = state => ({
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)