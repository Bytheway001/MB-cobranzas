import React, { useState } from "react";
import { Button, Modal, Row, Col, FormGroup, FormControl } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Field, Form } from "react-final-form";
import { useClients } from "../context/clients";
import { useGlobal } from "../context/global";
import { DatePicker } from "../Controls";
import { composeValidators, Validators } from "./Validators";
import { useNotifications } from "../context/notification";
const PolicyForm = ({ policy, client }) => {
	const { addNotification } = useNotifications();
	const { companies } = useGlobal();
	const { clientActions } = useClients();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const onFormSubmit = (d) => {
		//eslint-disable-next-line
		let { plan, company, selected, ...rest } = d;
		let policy = {
			...rest,
			plan_id: d.plan.id,
		};
		//eslint-disable-next-line
		clientActions
			.createPolicy(policy)
			.then((res) => {
				handleClose();
				addNotification("success", res.data.data);
			})
			.catch((err) => {
				let messages = err.response.data.data;
				addNotification("danger", messages);
			});
	};

	return (
		<>
			<Button block size="sm" variant="primary" onClick={handleShow}>
				{!policy ? "Agregar Poliza" : "Editar Poliza"}
			</Button>
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nueva Poliza</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={onFormSubmit}
						initialValues={{
							...policy,
							client_id: client,
						}}
					>
						{({ handleSubmit, values }) => (
							<form id="policy-form" onSubmit={handleSubmit}>
								<Row>
									<Col sm={6}>
										<Field name="client_id">
											{({ input, meta }) => (
												<>
													<FormControl type="hidden" isValid={!meta.error && meta.touched} size="sm" {...input} />
												</>
											)}
										</Field>

										<FormGroup>
											<Field validate={Validators.required} name="company">
												{({ input, meta }) => {
													return (
														<>
															<label>Aseguradora</label>
															<Typeahead
																isInvalid={meta.error ? true : false}
																isValid={!meta.error && meta.dirty}
																id="company-selector"
																onChange={(val) => input.onChange(val[0])}
																selected={
																	input.value
																		? Array.isArray(input.value)
																			? input.value
																			: [companies.find((x) => x.id === parseInt(input.value.id))]
																		: []
																}
																name={input.name}
																size="sm"
																labelKey="name"
																options={companies}
															/>
															{meta.dirty && meta.error && (
																<span className="error-feedback">{meta.error}</span>
															)}
														</>
													);
												}}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field validate={Validators.required} name="plan">
												{({ input, meta }) => {
													return (
														<>
															<label>Plan</label>
															<Typeahead
																isInvalid={meta.error ? true : false}
																isValid={!meta.error && meta.dirty}
																id="plan-selector"
																onChange={(val) => {
																	input.onChange({
																		...val[0],
																		company: input.value.company,
																	});
																}}
																selected={input.value.id ? [input.value] : []}
																name={input.name}
																size="sm"
																labelKey="name"
																options={
																	values.company
																		? companies.find((x) => x.id === values.company.id).plans
																		: []
																}
															/>
															{meta.dirty && meta.error && (
																<span className="error-feedback">{meta.error}</span>
															)}
														</>
													);
												}}
											</Field>
										</FormGroup>

										<FormGroup>
											<Field name="option" validate={composeValidators(Validators.required, Validators.mustBeNumber)}>
												{({ input, meta }) => (
													<>
														<label>Opcion</label>
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
											<Field name="policy_number" validate={composeValidators(Validators.required)}>
												{({ input, meta }) => (
													<>
														<label>Número de Póliza</label>
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
											<Field name="frequency" validate={composeValidators(Validators.required)}>
												{({ input, meta }) => (
													<>
														<label>Frecuencia de Pago</label>
														<FormControl
															as="select"
															isInvalid={meta.error && meta.touched}
															isValid={!meta.error && meta.touched}
															size="sm"
															{...input}
														>
															<option value="">Seleccione...</option>
															<option value="Monthly">Mensual</option>
															<option value="Quarterly">Trimestral</option>
															<option value="Semiannual">Semestral</option>
															<option value="Annual">Anual</option>
														</FormControl>

														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
									</Col>
									<Col sm={6}>
										<FormGroup>
											<Field name="effective_date" validate={Validators.required}>
												{({ input, meta }) => (
													<>
														<label>Fecha Efectiva</label>
														<DatePicker
															value={input.value}
															onChange={input.onChange}
															className="form-control form-control-sm"
															dateFormat="dd-MM-yyyy"
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field name="renovation_date" validate={Validators.required}>
												{({ input, meta }) => (
													<>
														<label>Fecha Renovacion</label>
														<DatePicker
															value={input.value}
															onChange={input.onChange}
															className="form-control form-control-sm"
															dateFormat="dd-MM-yyyy"
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</>
												)}
											</Field>
										</FormGroup>
										<FormGroup>
											<Field
												name="premium"
												validate={composeValidators(Validators.required, Validators.mustBeDecimal)}
											>
												{({ input, meta }) => (
													<>
														<label>Prima Total Anualizada</label>
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
											<Field name="comment">
												{({ input, meta }) => (
													<>
														<label>Notas de la Poliza</label>
														<FormControl
															as="textarea"
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
								</Row>
							</form>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button size="sm" variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
					<Button size="sm" type="submit" form="policy-form" variant="primary">
						{!policy ? "Crear Poliza" : "Guardar Cambios"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PolicyForm;
