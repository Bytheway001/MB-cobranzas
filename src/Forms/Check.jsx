import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import React, { useState } from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { API, formatMoney } from "../utils/utils";
import { FinalFormSelect } from "../components/custom/FinalForm";
import { composeValidators, Validators } from "./Validators";
import AccountsOptions from "../options/accounts";
import { Thumbnail } from "../components/Thumbnail";
import { useNotifications } from "../context/notification";

const CheckForm = () => {
	const { addNotification } = useNotifications();
	const [show, setShow] = useState(false);
	const [checks, setChecks] = useState([]);
	const handleShow = () => {
		Axios.get(API + "/checks?status=Collected")
			.then((res) => {
				setChecks(res.data.data);
			})
			.then(setShow(true));
	};
	const onCheckFormSubmit = (values) => {
		Axios.post(API + "/operations/collectcheck", values).then((res) => {
			addNotification("success", res.data.data);
		});
	};
	return (
		<>
			<Thumbnail onClick={() => handleShow()} title="Cobro de Cheques" icon={faMoneyBillWave} />
			<Modal size="md" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Cobrar Cheque</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onCheckFormSubmit}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit} id="check-form">
								<FormGroup>
									<label>Seleccionar Cheque</label>
									<Field name="check_id" validate={Validators.required}>
										{({ meta, input }) => (
											<FinalFormSelect
												fieldProps={{ meta, input }}
												options={checks.map((check, k) => (
													<option key={k} value={check.id}>{`${check.client.first_name} - ${formatMoney(
														check.amount,
														2,
														".",
														",",
														" " + check.currency
													)}`}</option>
												))}
											/>
										)}
									</Field>
								</FormGroup>
								<FormGroup>
									<label>Cuenta a Depositar</label>
									<Field
										name="account_id"
										validate={composeValidators(Validators.required, (value) =>
											Validators.mustNotBe(value, ["101", "100", "109", "9"])
										)}
									>
										{({ meta, input }) => (
											<FinalFormSelect fieldProps={{ meta, input }} options={<AccountsOptions />} />
										)}
									</Field>
								</FormGroup>
							</form>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger">Cancelar</Button>
					<Button type="submit" form="check-form">
						Cobrar Cheque
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CheckForm;
