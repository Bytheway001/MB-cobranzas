import React from "react";
import { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import Axios from "axios";

import { Input, Select } from "../Controls";
import { CONVERT_CURRENCY } from "../utils/endpoints";

const CurrencyChange = ({ handleAccountRefresh, accounts }) => {
	const [show, setShow] = useState(false);
	const [from, setAccountFrom] = useState("");
	const [to, setAccountTo] = useState("");
	const [amount, setAmount] = useState("");
	const [rate, setCurrencyRate] = useState("");
	const [currency, setCurrency] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = { from, to, amount, rate, currency };
		Axios.post(CONVERT_CURRENCY, data)
			.then(() => {
				handleAccountRefresh();
				setShow(false);
			})
			.catch((err) => {
				alert(err);
			});
	};

	const changeTypes = [
		{ value: "USD/BOB", label: "Dolares a Bolivianos" },
		{ value: "BOB/USD", label: "Bolivianos a Dolares" },
	];

	return (
		<>
			<Button block size="sm" onClick={() => setShow(true)}>
				Cambiar Divisas
			</Button>

			<Modal size="lg" show={show} onHide={() => setShow(false)}>
				<Form onSubmit={handleSubmit} id="change_currency_form">
					<Modal.Header closeButton>
						<Modal.Title>Cambio de Divisas</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Select
									value={from}
									onChange={({ target }) => setAccountFrom(target.value)}
									options={accounts.map((a, k) => (
										<option key={k} value={a.id}>
											{a.name}
										</option>
									))}
									label="Cuenta a Debitar"
								/>
							</Col>
							<Col sm={6}>
								<Select
									value={to}
									onChange={({ target }) => setAccountTo(target.value)}
									options={accounts.map((a, k) => (
										<option key={k} value={a.id}>
											{a.name}
										</option>
									))}
									label="Cuenta a Abonar"
								/>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<Select
									value={currency}
									onChange={({ target }) => setCurrency(target.value)}
									options={changeTypes.map((o, k) => (
										<option key={k} value={o.value}>
											{o.label}
										</option>
									))}
									label="Transaccion a Realizar"
								/>
							</Col>
							<Col sm={6}>
								<Input
									value={rate}
									onChange={({ target }) => setCurrencyRate(target.value)}
									type="number"
									label="Tipo de Cambio"
								/>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<Input value={amount} onChange={({ target }) => setAmount(target.value)} type="number" label="Cantidad" />
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={() => setShow(false)}>
							Cancelar
						</Button>
						<Button variant="success" for="change_currency_form" type="submit">
							Cambiar divisas
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default CurrencyChange;
