import React, { useState } from "react";
import { Row, Col, Button, Card, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import { OfficeOptions, CurrencyOptions } from "../options/options";
import AccountsOptions from "../options/accounts";
import { ExpenseReceipt } from "../Receipts/Expense";
import { Field, Form } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { composeValidators, Validators } from "./Validators";
import { DatePicker, Select } from "../Controls";
import { useGlobal } from "../context/global";
import { useUser } from "../context/User";

const ExpensesForm = () => {
	const { categories } = useGlobal();
	const { userActions, user } = useUser();
	const [receipt, setReceipt] = useState(false);
	const [error, setError] = useState(false);

	const onExpenseSubmit = (values) => {
		userActions
			.createExpense(values)
			.then((res) => {
				setError(false);
				setReceipt(res);
			})
			.catch((err) => {
				setError(err.response.data);
			});
	};
	console.log(categories);
	return (
		<Row>
			<Col sm={12}>
				<h2 className="text-center">Nuevo Egreso</h2>
			</Col>
			<Col sm={4}>
				<Card>
					<Card.Header className="bg-primary text-white">Datos del Egreso</Card.Header>
					<Card.Body>
						<Form onSubmit={onExpenseSubmit}>
							{({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<Field name="office" validate={Validators.required}>
										{({ input, meta }) => (
											<FormGroup>
												<Select
													isInvalid={meta.error && meta.touched}
													isValid={!meta.errors && meta.touched}
													label="Oficina"
													options={<OfficeOptions />}
													value={input.value}
													onChange={input.onChange}
													{...input}
												/>
												{meta.touched && meta.error && <span className="error-feedback">{meta.error}</span>}
											</FormGroup>
										)}
									</Field>
									<Field name="date" validate={Validators.required}>
										{({ input, meta }) => (
											<FormGroup>
												<label>Fecha</label>
												<DatePicker
													isInvalid={meta.error && meta.touched}
													isValid={!meta.errors && meta.touched}
													required
													onChange={input.onChange}
													dateFormat="dd/MM/yyyy"
													value={input.value}
													{...input}
												/>
											</FormGroup>
										)}
									</Field>
									<Field name="bill_number" validate={Validators.required}>
										{({ input, meta }) => (
											<FormGroup>
												<label># Factura</label>
												<FormControl
													isInvalid={meta.error && meta.touched}
													isValid={!meta.errors && meta.touched}
													value={input.value}
													onChange={input.onChange}
													{...input}
												/>
												{meta.touched && meta.error && <span className="error-feedback">{meta.error}</span>}
											</FormGroup>
										)}
									</Field>
									<Field name="description" validate={Validators.required}>
										{({ input, meta }) => (
											<FormGroup>
												<label>Descripcion</label>
												<FormControl
													isInvalid={meta.error && meta.touched}
													isValid={!meta.errors && meta.touched}
													as="textarea"
													style={{ resize: "none" }}
													rows={4}
													value={input.value}
													onChange={input.onChange}
													{...input}
												/>
											</FormGroup>
										)}
									</Field>

									<FormGroup>
										<label>Moneda / Monto</label>
										<InputGroup size="sm">
											<Field name="currency" validate={Validators.required}>
												{({ input, meta }) => (
													<Select
														isInvalid={meta.error && meta.touched}
														isValid={!meta.errors && meta.touched}
														onChange={input.onChange}
														value={input.value}
														{...input}
														options={<CurrencyOptions />}
													/>
												)}
											</Field>
											<Field
												name="amount"
												validate={composeValidators(Validators.required, Validators.mustBeDecimal)}
											>
												{({ input, meta }) => (
													<FormControl
														isInvalid={meta.error && meta.touched}
														isValid={!meta.errors && meta.touched}
														onChange={input.onChange}
														value={input.value}
														{...input}
													/>
												)}
											</Field>
										</InputGroup>
									</FormGroup>
									<FormGroup>
										<label>Categoria / Cuenta Pagadora</label>
										<InputGroup size="sm">
											<Field name="category_id" validate={Validators.required}>
												{({ input, meta }) => (
													<Select
														isInvalid={meta.error && meta.touched}
														isValid={!meta.errors && meta.touched}
														onChange={input.onChange}
														value={input.value}
														{...input}
														options={Object.keys(categories.egresos).map((cname, i) => (
															<optgroup label={cname} key={i}>
																{categories.egresos[cname].map((x, j) => (
																	<option key={j} value={x.id}>
																		{x.name}
																	</option>
																))}
															</optgroup>
														))}
													/>
												)}
											</Field>
											<Field name="account_id" validate={Validators.required}>
												{({ input, meta }) => (
													<Select
														isInvalid={meta.error && meta.touched}
														isValid={!meta.errors && meta.touched}
														onChange={input.onChange}
														value={input.value}
														{...input}
														options={<AccountsOptions />}
													/>
												)}
											</Field>
										</InputGroup>
									</FormGroup>
									<Button size="sm" block type="submit">
										Registrar Gasto
									</Button>
								</form>
							)}
						</Form>
					</Card.Body>
				</Card>
			</Col>
			<Col sm={8}>
				<div className="h-100" style={{ border: "black 1px solid" }}>
					{error && (
						<div className="h-100 flex-column align-items-center justify-content-center d-flex" style={{ color: "#721c24" }}>
							<FontAwesomeIcon size="3x" icon={faTimes} />
							<p>{error.data}</p>
						</div>
					)}
					{receipt && <ExpenseReceipt data={receipt} user={user.name} modal={false} />}
				</div>
			</Col>
		</Row>
	);
};

export default ExpensesForm;
