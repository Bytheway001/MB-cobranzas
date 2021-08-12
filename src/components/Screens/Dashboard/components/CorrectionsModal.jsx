import Axios from "axios";
import React from "react";
import { Modal, Button, Form, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNotifications } from "../../../../context/notification";
import { API } from "../../../../utils/utils";

export const CorrectionsModal = ({ correction, setCorrection, updateData }) => {
	const { addNotification } = useNotifications();

	const translateTypes = {
		expenses: "Gastos",
		policy_payments: "Pago de polizas",
		incomes: "Ingresos",
		payments: "Cobranzas",
	};
	const handleSubmit = (e, data) => {
		e.preventDefault();
		Axios.post(API + "/changes", data).then(() => {
			addNotification("success", "Correccion Realizada");

			setCorrection(null);
			updateData();
		});
	};

	if (correction) {
		return (
			<>
				<Modal animation={false} show={correction ? true : false} onHide={() => setCorrection(null)}>
					<Modal.Header closeButton>
						<Modal.Title>Revertir Operacion</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form id="correction" onSubmit={(e) => handleSubmit(e, { type: correction.type, ref: correction.row.id })}>
							<Row>
								<Col md={12}>
									<p className="mb-2">
										<b>Datos del registro</b>
									</p>
									<ListGroup>
										<ListGroupItem>Tipo: {translateTypes[correction.type]}</ListGroupItem>

										<ListGroupItem>
											Descripcion:{" "}
											{correction.type === "payments"
												? `Cobranza ${correction.row.policy.client.first_name}`
												: correction.type === "policy_payments"
												? `Pago de poliza ${correction.row.policy.client.first_name}`
												: correction.row.description}
										</ListGroupItem>
									</ListGroup>
								</Col>
							</Row>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={() => setCorrection(null)}>
							Cancelar
						</Button>
						<Button form="correction" type="submit" variant="primary">
							Confirmar
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	} else return null;
};
