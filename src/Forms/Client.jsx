import React, { useState } from "react";
import { Row, Col, FormGroup, FormControl, Button, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, Field } from "react-final-form";
import { composeValidators, Validators } from "./Validators";
import { useNotifications } from "../context/notification";
import { useGlobal } from "../context/global";
import { useClients } from "../context/clients";

const ClientForm = ({ editing }) => {
	const { addNotification } = useNotifications();
	const { agents, collectors } = useGlobal();
	const { clientActions } = useClients();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onFormSubmit = (data) => {
		//eslint-disable-next-line
		let { agent, collector, policies, ...rest } = data;
		let client = {
			...rest,
			agent_id: data.agent_id,
			collector_id: data.collector_id,
		};
		clientActions
			.create(client)
			.then(() => {
				addNotification("success", "Cliente Creado con Exito");
				handleClose();
			})
			.catch((err) => {
				let messages = err.response.data.data;
				addNotification("danger", messages);
			});
	};
	return (
		<>
			<Button block size="sm" variant="primary" onClick={handleShow}>
				{editing ? "Modificar Cliente" : "Nuevo Cliente"}
			</Button>
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{editing ? "Modificar Cliente" : "Nuevo Cliente"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onFormSubmit} initialValues={editing}>
						{({ handleSubmit }) => (
							<form id="client-form" onSubmit={handleSubmit}>
								<Row>
									<Col sm={6}>
										<FormGroup>
											<Field name="first_name" validate={Validators.required}>
												{({ input, meta }) => (
													<>
														<label>Nombres</label>
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.error && meta.touched}
															size="sm"
															{...input}
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field validate={Validators.required} name="agent_id">
												{({ input, meta }) => {
													let value = agents.find((x) => x.id === input.value);
													value = value ? [value] : [];
													return (
														<>
															<label>Agente </label>
															<Typeahead
																isInvalid={meta.touched && input.value.length === 0}
																isValid={meta.touched && !meta.error}
																{...input}
																id="agent_selector"
																onChange={(val) => input.onChange(val[0] ? val[0].id : "")}
																selected={value}
																name={input.name}
																size="sm"
																labelKey="name"
																options={agents}
															/>
															{meta.touched && meta.error && (
																<span className="error-feedback">{meta.error}</span>
															)}
														</>
													);
												}}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field validate={Validators.required} name="collector_id">
												{({ input, meta }) => {
													let value = collectors.find((x) => x.id === input.value);
													value = value ? [value] : [];
													return (
														<>
															<label>Cobrador</label>
															<Typeahead
																isInvalid={meta.touched && input.value.length === 0}
																isValid={meta.touched && !meta.error}
																id="collector_selector"
																{...input}
																onChange={(val) => input.onChange(val[0] ? val[0].id : "")}
																selected={value}
																name={input.name}
																size="sm"
																labelKey="name"
																options={collectors}
															/>
															{meta.touched && meta.error && (
																<span className="error-feedback">{meta.error}</span>
															)}
														</>
													);
												}}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field name="h_id" validate={composeValidators(Validators.required, Validators.mustBeNumber)}>
												{({ input, meta }) => (
													<>
														<label>ID Hubspot</label>
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.error && meta.touched}
															size="sm"
															{...input}
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
									</Col>
									<Col sm={6}>
										<FormGroup>
											<Field name="email" validate={composeValidators(Validators.required, Validators.mustBeEmail)}>
												{({ input, meta }) => (
													<>
														<label>Email</label>
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.error && meta.touched}
															size="sm"
															{...input}
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field name="phone" validate={composeValidators(Validators.required, Validators.mustBeNumber)}>
												{({ input, meta }) => (
													<>
														<label>Telefono</label>
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.error && meta.touched}
															size="sm"
															{...input}
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
										<FormGroup>
											<label>Notas</label>
											<FormControl as={Field} size="sm" name="comment" component="textarea" rows={5} />
										</FormGroup>
									</Col>
								</Row>
							</form>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button form="client-form" type="submit" size="sm" variant="primary">
						{!editing ? "Crear Nuevo Cliente" : "Actualizar Cliente"}
					</Button>
					<Button size="sm" variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ClientForm;
