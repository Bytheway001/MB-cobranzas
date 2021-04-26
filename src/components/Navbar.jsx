import React from "react";
import { Navbar as Bar, Nav, Button, Image, NavDropdown } from "react-bootstrap";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import { useUser } from "../context/User";

const Navbar = () => {
	const { user, userActions, userRole } = useUser();

	return (
		<Bar variant="dark" bg="primary" expand="lg">
			<Bar.Brand href="#home">Cobranzas PS</Bar.Brand>
			<Bar.Toggle aria-controls="basic-navbar-nav" />
			<Bar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/">
						Inicio
					</Nav.Link>
					<Nav.Link as={Link} to={"/reports/finances/" + user.id}>
						Mi Gestion
					</Nav.Link>
					<NavDropdown title="Operaciones">
						<NavDropdown.Item style={{ fontSize: "0.8em" }} as={Link} to="/policy/pay">
							Pago de Polizas
						</NavDropdown.Item>

						<NavDropdown.Item style={{ fontSize: "0.8em" }} as={Link} to="/renewals">
							Renovaciones
						</NavDropdown.Item>
					</NavDropdown>
					{userRole(255) && (
						<NavDropdown title="Reportes">
							<NavDropdown.Item style={{ fontSize: "0.8em" }} as={Link} to="/reports/payments">
								Validar Cobranzas
							</NavDropdown.Item>
							<NavDropdown.Item style={{ fontSize: "0.8em" }} as={Link} to="/reports/finances">
								Financiero
							</NavDropdown.Item>
							<NavDropdown.Item style={{ fontSize: "0.8em" }} as={Link} to="/reports/general">
								Generales
							</NavDropdown.Item>
							<NavDropdown.Item style={{ fontSize: "0.8em" }} as={Link} to="/reports/financiamientos">
								Polizas Financiadas
							</NavDropdown.Item>
						</NavDropdown>
					)}
				</Nav>

				<Nav className="ml-auto">
					<Bar.Text>{user.email}</Bar.Text>
					<Bar.Text className="ml-3">
						<Image src={user.imageUrl} height={32} style={{ borderRadius: 50, cursor: "pointer" }} />
					</Bar.Text>
					<Bar.Brand></Bar.Brand>
					<GoogleLogout
						clientId="346512427285-0gs9tg2cvhd0v4b3r5h7dvjitm8fkcal.apps.googleusercontent.com"
						render={() => <Button onClick={userActions.logoutUser}>Salir</Button>}
						onLogoutSuccess={userActions.logout}
					/>
				</Nav>
			</Bar.Collapse>
		</Bar>
	);
};

export default Navbar;
