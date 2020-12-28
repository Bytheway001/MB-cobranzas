import React, { useState, Fragment, useCallback } from "react";
import { Row, Col, Table, Card, Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";
import Axios from "axios";

import { connect } from "react-redux";
import { Extracto } from "./components/Extracto";
import { DateSearch } from "../../custom/DateSearch";
import { API, formatMoney } from "../../../utils/utils";
import { CorrectionsModal } from "../Dashboard/components/CorrectionsModal";
import { PaymentsList } from "./PaymentsList";
import { IncomeList } from "./IncomeList";
import { ExpensesList } from "./ExpensesList";
import { PolicyPaymentsList } from "./PolicyPaymentsList";

const Finances = ({ user, match }) => {
	const [accounts, setAccounts] = useState([]);
	const [report, setReport] = useState(null);
	const [modalshow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState([]);
	const id = match.params.id || null;
	const [correction, setCorrection] = useState(null);
	const [saldo, setSaldo] = useState({ USD: 0, BOB: 0 });

	const LookReports = useCallback(
		(from = null, to = null) => {
			if (from && to) {
				const f = new Date(from).toLocaleDateString();
				const t = new Date(to).toLocaleDateString();
				Axios.get(API + "/reports?f=" + f + "&t=" + t + (id ? "&id=" + id : "")).then((res) => {
					setReport(res.data);
				});
			} else {
				Axios.get(API + "/reports" + (id ? "?id=" + id : "")).then((res) => {
					setReport(res.data);
				});
			}
		},
		[id]
	);

	useEffect(() => {
		Axios.get(API + "/accounts").then((res) => {
			setAccounts(res.data.data);
		});
		LookReports();
	}, [LookReports]);

	const fillModal = (e, id) => {
		Axios.get(API + "/movements/" + id).then((res) => {
			setSaldo({ BOB: accounts.find((x) => x.id === id).bob, USD: accounts.find((x) => x.id === id).usd });
			setModalData(res.data.data);
			setModalShow(true);
		});
	};

	return (
		<Fragment>
			<Row className="mb-2">
				<Col sm={12}>
					<DateSearch onSearch={LookReports} />
					<CorrectionsModal correction={correction} setCorrection={setCorrection} />
				</Col>

				<Col sm={12}>
					{report && (
						<Tabs defaultActiveKey="expenses" id="uncontrolled-tab-example">
							<Tab eventKey="expenses" title="Gastos" className="p-3">
								<ExpensesList expenses={report.expenses} setCorrection={setCorrection} />
							</Tab>
							<Tab eventKey="incomes" title="Ingresos" className="p-3">
								<IncomeList incomes={report.incomes} setCorrection={setCorrection} />
							</Tab>
							<Tab
								eventKey="policy_payments"
								title="Pago de Polizas"
								className={`p-3 ${user.role !== "master" ? "d-none" : ""}`}
							>
								{user.role === "master" ? (
									<PolicyPaymentsList payments={report.policy_payments} setCorrection={setCorrection} />
								) : (
									<p>No tiene permisos para ver esta informacion</p>
								)}
							</Tab>
							<Tab eventKey="cash" title="Saldos" className="p-3">
								{user.role === "master" ? (
									<Row>
										<Col sm={6}>
											<Card>
												<Card.Header className="bg-primary text-white">Cuentas Bancarias</Card.Header>
												<Card.Body>
													<Table variant="striped" size="sm" style={{ fontSize: "0.8em" }}>
														<thead>
															<tr className="bg-info text-white">
																<th>Cuenta</th>
																<th>USD</th>
																<th>BOB</th>
															</tr>
														</thead>
														<tbody>
															{accounts.length > 0 &&
																accounts
																	.filter((x) => x.type === "Bank" || x.type === "Checks")
																	.map((account, key) => (
																		<tr key={key}>
																			<td>
																				<button
																					className="btn-a"
																					onClick={(e) => fillModal(e, account.id)}
																				>
																					{account.name}
																				</button>
																			</td>
																			<td className="text-right">
																				{formatMoney(account.usd, 2, ",", ".", "$")}
																			</td>
																			<td className="text-right">
																				{formatMoney(account.bob, 2, ",", ".", "Bs.")}
																			</td>
																		</tr>
																	))}
														</tbody>
													</Table>
												</Card.Body>
											</Card>
										</Col>
										<Col sm={6}>
											<Card className="h-100">
												<Card.Header className="bg-primary text-white">Efectivo</Card.Header>
												<Card.Body>
													<Extracto
														bob={saldo.BOB}
														usd={saldo.USD}
														show={modalshow}
														setShow={setModalShow}
														data={modalData}
													/>
													<Table variant="striped" size="sm" style={{ fontSize: "0.8em" }}>
														<thead>
															<tr className="bg-info text-white">
																<th>Cuenta</th>
																<th>USD</th>
																<th>BOB</th>
															</tr>
														</thead>
														<tbody>
															{accounts.length > 0 &&
																accounts
																	.filter((x) => x.type === "Cash")
																	.map((account, key) => (
																		<tr key={key}>
																			<td>
																				<button
																					className="btn-a"
																					onClick={(e) => fillModal(e, account.id)}
																				>
																					{account.name}
																				</button>
																			</td>
																			<td className="text-right">
																				{formatMoney(account.usd, 2, ",", ".", "$")}
																			</td>
																			<td className="text-right">
																				{formatMoney(account.bob, 2, ",", ".", "Bs.")}
																			</td>
																		</tr>
																	))}
														</tbody>
													</Table>
												</Card.Body>
											</Card>
										</Col>
									</Row>
								) : (
									<p>No tiene permisos para ver esta informacion</p>
								)}
							</Tab>
							<Tab eventKey="payments" title="Cobranzas" className="p-3">
								<PaymentsList payments={report.payments} setCorrection={setCorrection} />
							</Tab>
							<Tab eventKey="checks" title="Cheques" className="p-3">
								<Table style={{ fontSize: "0.8em" }} size="sm" className="table-striped" variant="hover">
									<thead>
										<tr className="bg-info text-white">
											<th>Cliente</th>
											<th>Cantidad</th>
											<th>Status</th>
											<th>Cobrado en:</th>
										</tr>
									</thead>
									<tbody>
										{report.checks.map((check, key) => (
											<tr key={key}>
												<td>{check.client}</td>
												<td>{formatMoney(check.amount, 2, ",", ".", "$")}</td>
												<td>{check.status}</td>
												<td>{check.collected}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Tab>
						</Tabs>
					)}
				</Col>
			</Row>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({ user: state.session.user });
export default connect(mapStateToProps, null)(Finances);
