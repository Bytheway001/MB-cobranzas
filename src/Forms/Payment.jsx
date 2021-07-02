import React, { useState } from "react";
import { FormControl, Row, Col, FormGroup, Button, Modal, InputGroup, FormCheck } from "react-bootstrap";
import arrayMutators from "final-form-arrays";
import { PaymentMethodOptions, OfficeOptions, PaymentTypeOptions, CurrencyOptions } from "../options/options";
import AccountsOptions from "../options/accounts";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { composeValidators, Validators } from "./Validators";
import { ClientSelector, DatePicker, Select } from "../Controls";
import { useClients } from "../context/clients";
import { useNotifications } from "../context/notification";
const agencyMethods = [
	"tdc_to_company",
	"transfer_to_company",
	"check_to_foreign_company",
	"tdc_to_collector",
	"claim_to_company",
	"check_to_agency_foreign",
	"check_to_agency_local",
	"other_credit_card",
];

const PaymentForm = ({ policy, renovation }) => {
	const { clientActions, clients } = useClients();
	const { addNotification } = useNotifications();
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const onFormSubmit = (values) => {
		// eslint-disable-next-line
		let { receiving_client, ...realValues } = values;

		setLoading(true);
		clientActions
			.createPayment(realValues)
			.then(() => {
				addNotification("success", "Cobranza Registrada con exito");
				setLoading(false);
				handleClose();
			})
			.catch(() => {
				addNotification("success", "No se Pudo Registrar La Cobranza");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const recipients = [
		"Felisa Quispe",
		"Sofia Aruquipa",
		"Narda Canelas",
		"Norah Guzman",
		"Marcelo De Rada Ocampo",
		"Ana Hamachi",
		"Zulema Navarro",
		"Janetth Poma",
		"Liz Mamani",
		"Yoshimi Andia",
		"Jessica Martinez",
		"Carola Verastegui",
		"Carmiña Mercado",
		"Glenda Gaitty",
		"Karen Dorado",
		"Soledad Sainz",
		"Heidy Teran",
		"Rafael Castillo",
	];
	const CheckboxGroup = ({ fields, options }) => {
		const toggle = (event, option) => {
			if (event.target.checked) fields.push(option);
			else fields.remove(option);
		};
		return (
			<Row>
				{options.map((option) => (
					<Col sm={12} key={option} style={{ fontSize: "0.9em" }}>
						<FormCheck label={option} onClick={(event) => toggle(event, option)} />
					</Col>
				))}
			</Row>
		);
	};

	return (
		<>
			<Button block size="sm" variant="primary" onClick={handleShow}>
				{!renovation ? "Registrar Cobranza" : "Renovar Poliza"}
			</Button>
			<Modal size="xl" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Registro de Cobranza (Poliza # {policy.policy_number})</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={onFormSubmit}
						mutators={{ ...arrayMutators }}
						initialValues={{
							policy_id: policy.id,
							agent_discount: 0,
							agency_discount: 0,
							company_discount: 0,
							amount: 0,
							change_rate: "1.00",
							currency: "USD",
							receiving_client: null,
							receiving_policy: null,
						}}
					>
						{({ handleSubmit, values }) => (
							<form autoComplete="off" onSubmit={handleSubmit} id="payment-form">
								<Row>
									<Col sm={4}>
										<Field name="payment_method" validate={Validators.required}>
											{({ input, meta }) => {
												return (
													<FormGroup>
														<label>Metodo de Pago</label>
														<Select
															isInvalid={meta.error && meta.touched}
															isValid={!meta.errors && meta.touched}
															onChange={input.onChange}
															value={input.value}
															options={<PaymentMethodOptions />}
															{...input}
														/>

														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</FormGroup>
												);
											}}
										</Field>
										{!agencyMethods.includes(values.payment_method) && (
											<Field name="account_id" validate={Validators.required}>
												{({ input, meta }) => (
													<FormGroup>
														<label>Cuenta Receptora</label>
														<Select
															isInvalid={meta.error && meta.touched}
															isValid={!meta.errors && meta.touched}
															onChange={input.onChange}
															value={input.value}
															options={<AccountsOptions />}
															{...input}
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</FormGroup>
												)}
											</Field>
										)}
										{values.payment_method === "other_credit_card" && (
											<Field name="receiving_client" validate={Validators.required}>
												{({ input, meta }) => (
													<FormGroup>
														<label>Cliente que recibe el pago</label>

														<ClientSelector
															onSearch={clientActions.getClients}
															title="Cliente"
															options={clients}
															isLoading={loading}
															onChange={input.onChange}
															clearButton={true}
															selected={input.value[0]}
														/>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</FormGroup>
												)}
											</Field>
										)}
										{values.receiving_client && values.receiving_client[0] && (
											<Field name="receiving_policy" validate={Validators.required}>
												{({ input, meta }) => (
													<FormGroup>
														<label>Poliza que Recibe el Pago</label>
														<Select
															options={values.receiving_client[0].policies.map((policy, key) => (
																<option key={key} value={policy.id}>
																	{policy.policy_number}-{policy.plan.name}
																</option>
															))}
															{...input}
														></Select>
														{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
													</FormGroup>
												)}
											</Field>
										)}
										<Field name="payment_type">
											{({ input, meta }) => (
												<FormGroup>
													<Select
														isInvalid={meta.error && meta.touched}
														isValid={!meta.errors && meta.touched}
														required
														label="Tipo de Pago"
														value={input.value}
														onChange={input.onChange}
														options={<PaymentTypeOptions />}
														{...input}
													/>
													{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
												</FormGroup>
											)}
										</Field>
										<Field name="office">
											{({ input, meta }) => (
												<FormGroup>
													<Select
														isInvalid={meta.error && meta.touched}
														isValid={!meta.errors && meta.touched}
														required
														label="Oficina"
														value={input.value}
														onChange={input.onChange}
														options={<OfficeOptions />}
														{...input}
													/>
													{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
												</FormGroup>
											)}
										</Field>
										<Field name="payment_date" validate={Validators.required}>
											{({ input, meta }) => (
												<FormGroup>
													<label>Fecha de Pago</label>
													<DatePicker {...input} />

													{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
												</FormGroup>
											)}
										</Field>
									</Col>
									<Col sm={4}>
										<FormGroup>
											<label>Moneda y Tipo de Cambio</label>
											<InputGroup size="sm">
												<Field name="currency">
													{({ input }) => (
														<Select
															required
															value={input.value}
															onChange={input.onChange}
															options={<CurrencyOptions />}
														/>
													)}
												</Field>
												<Field name="change_rate">
													{({ input }) => (
														<FormControl
															disabled={values.currency === "USD"}
															size="sm"
															onChange={input.onChange}
															value={input.value}
														/>
													)}
												</Field>
											</InputGroup>
										</FormGroup>
										<FormGroup>
											<label>Descuentos</label>
											<InputGroup size="sm">
												<InputGroup.Prepend>
													<InputGroup.Text>{values.currency === "BOB" ? "Bs." : "$"}</InputGroup.Text>
												</InputGroup.Prepend>
												<Field
													name="company_discount"
													validate={composeValidators(Validators.required, Validators.mustBeDecimal)}
												>
													{({ input, meta }) => (
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.errors && meta.touched}
															{...input}
															min="0"
															required
															value={input.value}
															onChange={input.onChange}
															placeholder="Aseg."
														/>
													)}
												</Field>
												<InputGroup.Prepend>
													<InputGroup.Text>{values.currency === "BOB" ? "Bs." : "$"}</InputGroup.Text>
												</InputGroup.Prepend>
												<Field
													name="agency_discount"
													validate={composeValidators(Validators.required, Validators.mustBeDecimal)}
												>
													{({ input, meta }) => (
														<>
															<FormControl
																isInvalid={meta.error && meta.touched}
																isValid={!meta.errors && meta.touched}
																{...input}
																size="sm"
																onChange={input.onChange}
																value={input.value}
																placeholder="Agencia"
															/>
														</>
													)}
												</Field>
												<InputGroup.Prepend>
													<InputGroup.Text>{values.currency === "BOB" ? "Bs." : "$"}</InputGroup.Text>
												</InputGroup.Prepend>
												<Field
													name="agent_discount"
													validate={composeValidators(Validators.required, Validators.mustBeDecimal)}
												>
													{({ input, meta }) => (
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.errors && meta.touched}
															size="sm"
															onChange={input.onChange}
															value={input.value}
															placeholder="Agente"
															{...input}
														/>
													)}
												</Field>
											</InputGroup>
											<span className="info-feedback">Compañia/Agencia/Agente</span>
										</FormGroup>
										<Field
											name="amount"
											validate={composeValidators(Validators.required, Validators.mustBeDecimal, (value) =>
												Validators.mustBePayable(value, values, policy)
											)}
										>
											{({ input, meta }) => (
												<FormGroup>
													<label>Monto Cancelado por el cliente</label>
													<InputGroup size="sm">
														<InputGroup.Prepend>
															<InputGroup.Text>{values.currency === "BOB" ? "Bs." : "$"}</InputGroup.Text>
														</InputGroup.Prepend>
														<FormControl
															isInvalid={meta.error && meta.touched}
															isValid={!meta.errors && meta.touched}
															size="sm"
															onChange={input.onChange}
															value={input.value}
															{...input}
														/>
													</InputGroup>
													{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
												</FormGroup>
											)}
										</Field>
										<Field name="comment">
											{({ input }) => (
												<FormGroup>
													<label>Notas Adicionales</label>
													<FormControl
														as="textarea"
														rows={5}
														size="sm"
														onChange={input.onChange}
														value={input.value}
													/>
												</FormGroup>
											)}
										</Field>
									</Col>
									<Col sm={4}>
										<FieldArray name="tags" component={CheckboxGroup} options={recipients} />
									</Col>
								</Row>
							</form>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" disabled={loading} form="payment-form">
						Registrar Cobranza
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PaymentForm;
