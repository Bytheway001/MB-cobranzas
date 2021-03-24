// Formulario para pagos de poliza
import React from "react";
import { FormGroup, FormControl, Button, InputGroup, FormCheck } from "react-bootstrap";
import AccountsOptions from "../options/accounts";
import { CurrencyOptions } from "../options/options";
import { Field, Form } from "react-final-form";
import { composeValidators, Validators } from "./Validators";
import { DatePicker, Select } from "../Controls";
import { useNotifications } from "../context/notification";
import { useUser } from "../context/User";

const PaymentPolicyForm = ({ policy }) => {
	const { addNotification } = useNotifications();
	const { userActions } = useUser();
	const onFormSubmit = (values) => {
		let policy_payment = {
			...values,
			policy_id: policy.id,
		};
		userActions
			.createPolicyPayment(policy_payment)
			.then((res) => {
				addNotification("success", res.data);
			})
			.catch((err) => {
				addNotification("danger", err.response.data.data);
			});
	};

	return (
		<Form onSubmit={onFormSubmit}>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit} id="policy-payment-form">
					<Field name="payment_date" validate={Validators.required}>
						{({ input, meta }) => (
							<FormGroup>
								<label>Fecha de Pago de la Póliza</label>
								<DatePicker dateFormat="dd/MM/yyyy" {...input} />
								{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
							</FormGroup>
						)}
					</Field>

					<Field name="account_id" validate={Validators.required}>
						{({ input, meta }) => (
							<FormGroup>
								<label>Cuenta Pagadora:</label>
								<Select options={<AccountsOptions />} {...input} />
								{meta.error && meta.touched && <span className="error-feedback">{meta.error}</span>}
							</FormGroup>
						)}
					</Field>

					<FormGroup>
						<label>Tipo de Pago</label>

						<InputGroup>
							<Field component="input" value="Direct" type="radio" name="payment_type" validate={Validators.required}>
								{({ input }) => {
									return <FormCheck inline {...input} label="Pago Directo" />;
								}}
							</Field>
							<Field component="input" value="Finance" type="radio" name="payment_type" validate={Validators.required}>
								{({ input }) => {
									return <FormCheck inline {...input} label="Financiamieno" />;
								}}
							</Field>
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<label>Moneda/Monto</label>
						<InputGroup>
							<Field name="currency" validate={Validators.required}>
								{({ input }) => <Select options={<CurrencyOptions />} {...input} />}
							</Field>
							<Field name="amount" validate={composeValidators(Validators.required, Validators.mustBeDecimal)}>
								{({ input }) => <FormControl size="sm" {...input} />}
							</Field>
						</InputGroup>
					</FormGroup>

					<FormGroup>
						<label>Comentario</label>
						<Field name="comment">{({ input }) => <FormControl as="textarea" size="sm" {...input} />}</Field>
					</FormGroup>

					<Button block type="submit">
						Crear Pago
					</Button>
				</form>
			)}
		</Form>
	);
};

export default PaymentPolicyForm;
