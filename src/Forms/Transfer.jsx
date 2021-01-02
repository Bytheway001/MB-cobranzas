import React, { useState } from "react";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, FormGroup, InputGroup } from "react-bootstrap";
import AccountsOptions from "../options/accounts";
import { CurrencyOptions } from "../options/options";
import { Field, Form } from "react-final-form";
import { composeValidators, Validators } from "./Validators";
import { FinalFormInput, FinalFormSelect } from "../components/custom/FinalForm";
import { Thumbnail } from "../components/Thumbnail";
import { useUser } from "../context/User";
import { useNotifications } from "../context/notification";

const TransferForm = () => {
	const { addNotification } = useNotifications();
	const [show, setShow] = useState(false);
	const { userActions } = useUser();
	const onTransferSubmit = (values) => {
		userActions.createTransfer(values).then((res) => {
			if (res.data.errors) {
				addNotification("danger", res.data.data);
			} else {
				addNotification("success", res.data);
			}
			setShow(false);
		});
	};

	return (
		<>
			<Thumbnail onClick={() => setShow(true)} title="Transferencias Internas" icon={faExpandAlt} />
			<Modal size="md" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Transferencia Interna</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onTransferSubmit}>
						{({ handleSubmit }) => (
							<form id="transfer-form" onSubmit={handleSubmit}>
								<Field name="from" validate={Validators.required}>
									{({ meta, input }) => (
										<FormGroup>
											<label>Desde: </label>
											<FinalFormSelect fieldProps={{ meta, input }} options={<AccountsOptions />} />
										</FormGroup>
									)}
								</Field>
								<Field name="to" validate={Validators.isDifferent}>
									{({ meta, input }) => (
										<FormGroup>
											<label>Hacia: </label>
											<FinalFormSelect fieldProps={{ meta, input }} options={<AccountsOptions />} />
										</FormGroup>
									)}
								</Field>
								<FormGroup>
									<label>Moneda/Monto: </label>
									<InputGroup size="sm">
										<Field name="currency" validate={Validators.required}>
											{({ meta, input }) => (
												<FinalFormSelect
													feedback={false}
													fieldProps={{ meta, input }}
													options={<CurrencyOptions />}
												/>
											)}
										</Field>
										<Field name="amount" validate={composeValidators(Validators.required, Validators.mustBeDecimal)}>
											{({ meta, input }) => <FinalFormInput feedback={false} fieldProps={{ meta, input }} />}
										</Field>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<label>Detalles: </label>
									<Field name="comment" validate={Validators.required}>
										{({ meta, input }) => <FinalFormInput as="textarea" fieldProps={{ meta, input }} />}
									</Field>
								</FormGroup>
							</form>
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Cancelar
					</Button>
					<Button form="transfer-form" type="submit" variant="primary">
						Realizar Transferencia
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default TransferForm;
