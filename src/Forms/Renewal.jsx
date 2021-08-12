import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FormControl, Row, Button, Modal, Col, FormGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Field, Form } from "react-final-form";
import { useClients } from "../context/clients";
import { useGlobal } from "../context/global";
import { useNotifications } from "../context/notification";
import { DatePicker } from "../Controls";
import { API, formatMoney } from "../utils/utils";
import { composeValidators, Validators } from "./Validators";
export const Renewal = ({ pId }) => {
	const { companies } = useGlobal();
	const { clientActions } = useClients();
	const { addNotification } = useNotifications();
	const [policy, setPolicy] = useState(null);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (show) {
			Axios.get(API + "/policies/" + pId).then((res) => {
				setPolicy(res.data.data);
			});
		}
	}, [show, pId]);
	const onFormSubmit = (v) => {
		setLoading(true);
		let values = {
			policy_id: policy.id,
			plan_id: v.plan.id,
			option: v.option,
			frequency: v.frequency,
			premium: v.premium,
			renovation_date: v.renovation_date,
		};
		console.log(values);

		clientActions
			.createRenovation(values)
			.then(() => {
				addNotification("success", "Renovacion Exitosa");
				setLoading(false);
				handleClose();
			})
			.catch(() => {
				addNotification("success", "Renovacion Fallida");
				setLoading(false);
			});
	};

	return (
		<>
			<Button block size="sm" variant="primary" onClick={handleShow}>
				Renovar Poliza
			</Button>
			{policy && (
				<Modal size="xl" show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Renovacion de Poliza # {policy.policy_number}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={onFormSubmit} initialValues={{ ...policy, client_id: policy.client_id }}>
							{({ handleSubmit, values }) => (
								<form autoComplete="off" onSubmit={handleSubmit} id="renewal-form">
									<Row>
										<Col sm={12}>
											<Table size="sm">
												<thead>
													<tr>
														<th>ITEM</th>
														<th>Poliza Actual</th>
														<th>Renovacion</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th>Fecha de Renovacion</th>
														<td>{new Date(policy.renovation_date).toLocaleDateString()}</td>
														<td>
															<Field name="renovation_date" validate={Validators.required}>
																{({ input, meta }) => (
																	<>
																		<DatePicker
																			{...input}
																			className="form-control form-control-sm "
																			dateFormat="dd-MM-yyyy"
																		/>

																		{meta.error && meta.touched && (
																			<span className="error-feedback">{meta.error}</span>
																		)}
																	</>
																)}
															</Field>
														</td>
													</tr>
													<tr>
														<th>Plan</th>
														<td>{policy.plan.name}</td>
														<td>
															<Field validate={Validators.required} name="plan">
																{({ input, meta }) => {
																	return (
																		<>
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
																						? companies.find((x) => x.id === values.company.id)
																								.plans
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
														</td>
													</tr>
													<tr>
														<th>Opcion</th>
														<td>{formatMoney(policy.option, 2, ",", ".", "$")}</td>
														<td>
															<Field
																name="option"
																validate={composeValidators(Validators.required, Validators.mustBeNumber)}
															>
																{({ input, meta }) => (
																	<>
																		<FormControl
																			isInvalid={meta.error && meta.touched}
																			isValid={!meta.error && meta.touched}
																			size="sm"
																			{...input}
																		/>
																		{meta.error && meta.touched && (
																			<span className="error-feedback">{meta.error}</span>
																		)}
																	</>
																)}
															</Field>
														</td>
													</tr>
													<tr>
														<th>Frecuencia de Pago</th>
														<td>{policy.frequency}</td>
														<td>
															<Field name="frequency" validate={composeValidators(Validators.required)}>
																{({ input, meta }) => (
																	<>
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

																		{meta.error && meta.touched && (
																			<span className="error-feedback">{meta.error}</span>
																		)}
																	</>
																)}
															</Field>
														</td>
													</tr>
													<tr>
														<th>Prima</th>
														<td>{formatMoney(policy.premium, 2, ",", ".", "$")}</td>
														<td>
															{" "}
															<Field
																name="premium"
																validate={composeValidators(Validators.required, Validators.mustBeDecimal)}
															>
																{({ input, meta }) => (
																	<>
																		<FormControl
																			isInvalid={meta.error && meta.touched}
																			isValid={!meta.error && meta.touched}
																			size="sm"
																			{...input}
																		/>
																		{meta.error && meta.touched && (
																			<span className="error-feedback">{meta.error}</span>
																		)}
																	</>
																)}
															</Field>
														</td>
													</tr>
												</tbody>
											</Table>
										</Col>
										<Col sm={4}>
											<FormGroup></FormGroup>
										</Col>

										<Col sm={4}></Col>
									</Row>
								</form>
							)}
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button type="submit" disabled={loading} form="renewal-form">
							Renovar Poliza
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
};
