import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { API, formatMoney, TranslatePaymentMethods } from "../utils/utils";
const PaymentHistory = ({ policy }) => {
	const [show, setShow] = useState(false);
	const [payments, setPayments] = useState([]);
	useEffect(() => {
		if (show) {
			Axios.get(`${API}/policies/${policy}/payments`).then((res) => {
				setPayments(res.data.data);
			});
		}
	}, [show, setPayments, policy]);

	return (
		<>
			<Button block size="sm" onClick={() => setShow(true)}>
				Historial de Pagos
			</Button>
			<Modal show={show} onHide={() => setShow(false)} size="xl">
				<Modal.Header closeButton>Historial de Pagos</Modal.Header>
				<Modal.Body>
					<Table size="sm">
						<thead>
							<th>#Ref</th>
							<th>Fecha</th>
							<th>Metodo</th>
							<th>Cantidad</th>
							<th>Descuentos</th>
							<th>Comentario</th>
						</thead>
						<tbody>
							{Object.keys(payments).map((period, key) => (
								<Fragment key={key}>
									<tr>
										<td className="bg-primary text-white text-center" colSpan={6}>
											Periodo {period === "legacy" ? "Anterior" : period}
										</td>
									</tr>
									{payments[period].map((payment, kk) => {
										let discounts = payment.agent_discount + payment.agency_discount + payment.company_discount;
										return (
											<tr key={kk}>
												<td>{payment.id}</td>
												<td>{payment.payment_date}</td>
												<td>{TranslatePaymentMethods[payment.payment_method]}</td>
												<td>
													{formatMoney(payment.amount, "2", ".", ",", payment.currency === "USD" ? "$" : "Bs.")}{" "}
												</td>
												<td>{formatMoney(discounts, 2, ".", ",", payment.currency === "BOB" ? "Bs" : "$")}</td>
												<td>{payment.comment}</td>
											</tr>
										);
									})}
								</Fragment>
							))}
							{/* payments.map((payment, key) => {
								let discounts = payment.agent_discount + payment.agency_discount + payment.company_discount;

								return (
									<tr key={key}>
										<td>{payment.id}</td>
										<td>{payment.payment_date}</td>
										<td>{TranslatePaymentMethods[payment.payment_method]}</td>
										<td>{formatMoney(payment.amount, "2", ".", ",", payment.currency === "USD" ? "$" : "Bs.")} </td>
										<td>{formatMoney(discounts, 2, ".", ",", payment.currency === "BOB" ? "Bs" : "$")}</td>
										<td>{payment.comment}</td>
									</tr>
								);
							}) */}
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default PaymentHistory;
