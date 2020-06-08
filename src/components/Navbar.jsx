import React from 'react';
import { Navbar as Bar, Nav, Button, Image, NavDropdown } from 'react-bootstrap'
import { login, logout } from '../ducks/session';
import { connect } from 'react-redux'
import { GoogleLogout } from 'react-google-login';
import { Redirect, Link } from 'react-router-dom';
const Navbar = ({ user, logout, login }) => {
    if (!user) {
        return <Redirect to='/login' />
    }
    return (
        <Bar variant='dark' bg="primary" expand="lg">
            <Bar.Brand href="#home">Cobranzas PS</Bar.Brand>
            <Bar.Toggle aria-controls="basic-navbar-nav" />
            <Bar.Collapse id="basic-navbar-nav">
                <Nav className='mr-auto'>
                    <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
                    <Nav.Link as={Link} to='/clients/new'>Crear Cliente</Nav.Link>
                    <NavDropdown title='Operaciones'>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/payments/new'>Nueva Cobranza</NavDropdown.Item>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/transfers/new'>Transferencias Internas</NavDropdown.Item>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/checks/collect'>Cobro de Cheques en transito</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title='Reportes'>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/reports/payments'>Cobranzas</NavDropdown.Item>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/reports/general'>General</NavDropdown.Item>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/reports/rcc'>Cobranzas por Compañia</NavDropdown.Item>
                        <NavDropdown.Item  style={{fontSize:'0.8em'}} as={Link} to='/reports/finances'>Financiero</NavDropdown.Item>
                       
                    </NavDropdown>
                    <Nav.Link as={Link} to='/expenses'>Gastos</Nav.Link>
                </Nav>
                <Nav className="ml-auto">


                    <Bar.Text>{user.email}</Bar.Text>
                    <Bar.Text className='ml-3'>
                        <Image src={user.imageUrl} height={32} style={{ borderRadius: 50, cursor: 'pointer' }} />
                    </Bar.Text>
                    <Bar.Brand>
                    </Bar.Brand>
                    <GoogleLogout
                        clientId='346512427285-0gs9tg2cvhd0v4b3r5h7dvjitm8fkcal.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button onClick={renderProps.onClick}>Salir</Button>
                        )}
                        onLogoutSuccess={logout}
                    />
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