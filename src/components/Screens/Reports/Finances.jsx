import React, { useState, Fragment, useCallback } from "react";
import { Row, Col, Table, Card, Tabs, Tab } from "react-bootstrap";
import { useEffect } from "react";
import Axios from "axios";

import { Extracto } from "./components/Extracto";
import { DateSearch } from "../../custom/DateSearch";
import { API, formatMoney } from "../../../utils/utils";
import { CorrectionsModal } from "../Dashboard/components/CorrectionsModal";
import { PaymentsList } from "./PaymentsList";
import { IncomeList } from "./IncomeList";
import { ExpensesList } from "./ExpensesList";
import { PolicyPaymentsList } from "./PolicyPaymentsList";
import { useUser } from "../../../context/User";
import { useGlobal } from "../../../context/global";
import { faBuilding, faCoins, faMoneyBillAlt, faMoneyCheck, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { downloadXls } from "../../../utils/donwloadXls";

const Finances = ({ match }) => {
	const { userActions, reports, userRole } = useUser();
	const { accounts } = useGlobal();
	const id = match.params.id || null;
	const [modalshow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [correction, setCorrection] = useState(null);
	const [saldo, setSaldo] = useState({ USD: 0, BOB: 0 });
	const [account_id, setAccountId] = useState(null);
	const [period, setPeriod] = useState(null);
	const download = async () => {
		const res = await Axios.get(API + "/exports/cash/" + account_id + (period ? "?period=" + period : ""));
		downloadXls(res.data.data.file, res.data.data.filename);
	};
	const fillModal = useCallback(
		(period) => {
			Axios.get(API + "/reports/movements/" + account_id + (period ? `?period=${period}` : "")).then((res) => {
				setSaldo({ BOB: accounts.find((x) => x.id === account_id).BOB, USD: accounts.find((x) => x.id === account_id).USD });
				setModalData(res.data.data);
				setModalShow(true);
				setPeriod(period);
			});
		},
		[account_id, accounts]
	);

	const changeAccountId = (newId) => {
		setAccountId(newId);
	};

	const onMonthChange = (period) => {
		fillModal(period);
	};
	useEffect(() => {
		userActions.getReports(null, null, id);
	}, [id, userActions]);

	useEffect(() => {
		if (account_id) {
			fillModal();
		}
	}, [account_id, fillModal]);

	return (
		<Fragment>
			<Row className="mb-2">
				<Col sm={12}>
					<DateSearch onSearch={(f, t) => userActions.getReports(f, t, id)} />
					<CorrectionsModal
						correction={correction}
						setCorrection={setCorrection}
						updateData={() => userActions.getReports(null, null, id)}
					/>
				</Col>

				<Col sm={12}>
					{reports && (
						<Tabs defaultActiveKey="expenses" id="uncontrolled-tab-example" className="nav-justified tabs-custom">
							<Tab
								eventKey="expenses"
								title={
									<>
										<FontAwesomeIcon className="mx-2" icon={faSignOutAlt} />
										{"Gastos"}
									</>
								}
								className="p-3"
							>
								<ExpensesList expenses={reports.expenses} setCorrection={setCorrection} />
							</Tab>
							<Tab
								eventKey="incomes"
								title={
									<>
										<FontAwesomeIcon className="mx-2" icon={faSignInAlt} />
										{"Ingresos"}
									</>
								}
								className="p-3"
							>
								<IncomeList incomes={reports.incomes} setCorrection={setCorrection} />
							</Tab>
							<Tab
								eventKey="policy_payments"
								title={
									<>
										<FontAwesomeIcon className="mx-2" icon={faBuilding} />
										{"Pago de Polizas"}
									</>
								}
								className="p-3"
								tabClassName={!userRole(255) ? "d-none" : ""}
							>
								<PolicyPaymentsList payments={reports.policy_payments} setCorrection={setCorrection} />
							</Tab>
							<Tab
								eventKey="cash"
								title={
									<>
										<FontAwesomeIcon className="mx-2" icon={faCoins} />
										{"Saldos"}
									</>
								}
								className="p-3"
								tabClassName={!userRole(255) ? "d-none" : ""}
							>
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
																				onClick={() => changeAccountId(account.id)}
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
													download={download}
													bob={saldo.BOB}
													usd={saldo.USD}
													show={modalshow}
													setShow={setModalShow}
													data={modalData}
													onMonthChange={onMonthChange}
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
																				onClick={() => changeAccountId(account.id)}
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
							</Tab>
							<Tab
								eventKey="payments"
								title={
									<>
										<FontAwesomeIcon className="mx-2" icon={faMoneyBillAlt} />
										{"Cobranzas"}
									</>
								}
								className="p-3"
							>
								<PaymentsList payments={reports.payments} setCorrection={setCorrection} />
							</Tab>
							<Tab
								eventKey="checks"
								title={
									<>
										<FontAwesomeIcon className="mx-2" icon={faMoneyCheck} />
										{"Cheques"}
									</>
								}
								className="p-3"
							>
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
										{reports.checks.map((check, key) => (
											<tr key={key}>
												<td>{check.client}</td>
												<td>{formatMoney(check.amount, 2, ",", ".", check.currency === "USD" ? "$" : "Bs.")}</td>
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

export default Finances;
