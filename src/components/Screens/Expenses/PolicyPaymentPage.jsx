import React, { useEffect, useState } from "react";
import { Row, Card, Col, FormGroup, Table } from "react-bootstrap";
import PaymentPolicyForm from "../../../Forms/PolicyPayment";
import { API, formatMoney, TranslatePaymentMethods } from "../../../utils/utils";
import Axios from "axios";
import { ClientSelector, PolicySelector } from "../../../Controls";
import { useClients } from "../../../context/clients";
import { useGlobal } from "../../../context/global";

const PolicyPaymentsPage = () => {
	const { clients, clientActions, loading, editing } = useClients();
	const { accounts } = useGlobal();
	let [history, setHistory] = useState(null);
	let policy = editing && editing.policies.find((x) => x.selected);
	useEffect(() => {
		if (policy) {
			getPayments(policy);
		}
	}, [policy]);

	const getPayments = (policy) => {
		Axios.get(API + "/policies/" + policy.id + "/history?type=list").then((res) => {
			setHistory(res.data.data);
		});
	};

	return (
		<Row style={{ fontSize: "0.8em" }}>
			<Col sm={3}>
				<Card className="h-100">
					<Card.Header className="bg-primary text-white">Seleccion de Cliente</Card.Header>
					<Card.Body>
						<FormGroup>
							<label>Cliente</label>
							<ClientSelector
								selected={editing}
								onSearch={clientActions.getClients}
								title="Cliente"
								options={clients}
								isLoading={loading}
								onChange={clientActions.select}
							/>
						</FormGroup>
						{editing && (
							<>
								<FormGroup>
									<PolicySelector
										options={editing.policies}
										selected={[]}
										onChange={(val) => clientActions.selectPolicy(val)}
										title="Poliza"
									></PolicySelector>
								</FormGroup>

								{policy && (
									<Table size="sm">
										<tbody>
											<tr>
												<th>Aseguradora</th>
												<td>{policy.company.name}</td>
											</tr>
											<tr>
												<th>Plan</th>
												<td>{policy.plan.name}</td>
											</tr>
											<tr>
												<th># Poliza</th>
												<td>{policy.policy_number}</td>
											</tr>
											<tr>
												<th>Prima</th>
												<td>{formatMoney(policy.premium, 2, ",", ".", "$")}</td>
											</tr>
											<tr>
												<th>Descuentos</th>
												<td>
													{formatMoney(
														policy.totals.discounts.agency +
															policy.totals.discounts.agent +
															policy.totals.discounts.company,
														2,
														",",
														".",
														"$"
													)}
												</td>
											</tr>
											<tr>
												<th>Cobrado</th>
												<td>{formatMoney(policy.totals.collected, 2, ",", ".", "$")}</td>
											</tr>
											<tr>
												<th>Financiado</th>
												<td>{formatMoney(policy.totals.financed, 2, ",", ".", "$")}</td>
											</tr>
											<tr>
												<th>Pagado a la Aseg</th>
												<td>
													{formatMoney(policy.totals.payed - policy.totals.discounts.company, 2, ",", ".", "$")}
												</td>
											</tr>
										</tbody>
									</Table>
								)}
							</>
						)}
					</Card.Body>
				</Card>
			</Col>
			{policy && (
				<>
					<Col sm={3}>
						<Card className="h-100">
							<Card.Header className="bg-primary text-white">Informacion del Pago</Card.Header>
							<Card.Body>
								<PaymentPolicyForm policy={policy} />
							</Card.Body>
						</Card>
					</Col>
					<Col sm={3}>
						<Card className="h-100">
							<Card.Header className="bg-primary text-white">Historial de Pagos</Card.Header>
							<Card.Body>
								{history && (
									<Table size="sm">
										<thead>
											<tr>
												<th>Fecha</th>
												<th>Cuenta</th>
												<th>Monto</th>
											</tr>
										</thead>
										<tbody>
											{history.policy_payments.map((pp, k) => (
												<tr key={k}>
													<td>{new Date(pp.payment_date).toLocaleDateString()}</td>
													<td>
														{accounts.find((x) => x.id === pp.account_id)
															? accounts.find((x) => x.id === pp.account_id).name
															: "Tarjeta Terceros"}
													</td>
													<td>{formatMoney(pp.amount, 2, ".", ",", pp.currency === "USD" ? "$" : "Bs.")}</td>
												</tr>
											))}
										</tbody>
									</Table>
								)}
							</Card.Body>
						</Card>
					</Col>
					<Col sm={3}>
						<Card className="h-100">
							<Card.Header className="bg-primary text-white">Historial de Cobranzas</Card.Header>
							<Card.Body>
								{history && (
									<Table size="sm">
										<thead>
											<tr>
												<th>Fecha</th>
												<th>Tipo</th>
												<th>Monto</th>
											</tr>
										</thead>
										<tbody>
											{history.payments.map((pp, k) => (
												<tr key={k}>
													<td>{new Date(pp.payment_date).toLocaleDateString()}</td>
													<td>{TranslatePaymentMethods[pp.payment_method]}</td>
													<td>{pp.amount}</td>
												</tr>
											))}
										</tbody>
									</Table>
								)}
							</Card.Body>
						</Card>
					</Col>
				</>
			)}
		</Row>
	);
};

export default PolicyPaymentsPage;
