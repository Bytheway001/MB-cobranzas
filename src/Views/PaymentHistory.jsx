import Axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Tabs, Tab, Modal, Button, Table } from "react-bootstrap";
import { useGlobal } from "../context/global";
import { API, formatMoney, TranslatePaymentMethods } from "../utils/utils";
const PaymentHistory = ({ policy }) => {
	const { accounts } = useGlobal();
	const [show, setShow] = useState(false);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		if (show) {
			Axios.get(`${API}/policies/${policy}/history`).then((res) => {
				setHistory(res.data.data);
			});
		}
	}, [show, setHistory, policy]);

	return (
		<>
			<Button block size="sm" onClick={() => setShow(true)}>
				Historial de Pagos
			</Button>
			<Modal show={show} onHide={() => setShow(false)} size="xl">
				<Modal.Header closeButton>Historial de Pagos</Modal.Header>
				<Modal.Body>
					<Tabs defaultActiveKey="payments" id="uncontrolled-tab-example">
						<Tab eventKey="payments" title="Cobranzas" className="p-3">
							<Table size="sm" style={{ fontSize: "0.8em" }}>
								<thead>
									<tr>
										<th>Fecha</th>
										<th>Metodo</th>
										<th>Cantidad</th>
										<th>Cuenta</th>
										<th>Descuentos</th>
										<th>Operador</th>
										<th>Comentario</th>
									</tr>
								</thead>
								<tbody>
									{Object.keys(history).map((period, key) => (
										<Fragment key={key}>
											<tr>
												<td className="bg-primary text-white text-center" colSpan={7}>
													Periodo {period === "legacy" ? "Anterior" : period}
												</td>
											</tr>
											{history[period].payments.map((payment, kk) => {
												let discounts = payment.agent_discount + payment.agency_discount + payment.company_discount;
												return (
													<tr key={kk}>
														<td>{new Date(payment.payment_date).toLocaleDateString()}</td>
														<td>{TranslatePaymentMethods[payment.payment_method]}</td>
														<td>
															{formatMoney(
																payment.amount,
																"2",
																".",
																",",
																payment.currency === "USD" ? "$" : "Bs."
															)}{" "}
														</td>
														<td>
															{payment.account_id
																? accounts.find((x) => x.id === payment.account_id).name || null
																: "N/A"}
														</td>
														<td>
															{formatMoney(discounts, 2, ".", ",", payment.currency === "BOB" ? "Bs" : "$")}
														</td>
														<td>{payment.user.name}</td>
														<td>{payment.comment}</td>
													</tr>
												);
											})}
										</Fragment>
									))}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="policy_payments" title="Pagos de Poliza" className="p-3">
							<Table size="sm" style={{ fontSize: "0.8em" }}>
								<thead>
									<tr>
										<th>Fecha</th>
										<th>Pagado con</th>
										<th>Monto</th>
										<th>Operador</th>
										<td>Comentario</td>
									</tr>
								</thead>
								<tbody>
									{Object.keys(history).map((period, key) => (
										<Fragment key={key}>
											<tr>
												<td className="bg-primary text-white text-center" colSpan={6}>
													Periodo {period === "legacy" ? "Anterior" : period}
												</td>
											</tr>
											{history[period].policy_payments.map((pp, kk) => {
												let account = accounts.find((x) => x.id === pp.account_id);
												return (
													<tr key={kk}>
														<td>{pp.payment_date}</td>
														<td>{account ? account.name : "Tarjeta Terceros"}</td>
														<td>
															{formatMoney(pp.amount, "2", ".", ",", pp.currency === "USD" ? "$" : "Bs.")}{" "}
														</td>
														<td>{pp.user.name}</td>
														<td>{pp.comment}</td>
													</tr>
												);
											})}
										</Fragment>
									))}
								</tbody>
							</Table>
						</Tab>
					</Tabs>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default PaymentHistory;
