import React, { useEffect, useState } from "react";
import { Row, Card, Col, FormGroup, Table } from "react-bootstrap";
import PaymentPolicyForm from "../../../Forms/PolicyPayment";
import { API, formatMoney } from "../../../utils/utils";
import Axios from "axios";
import { ClientSelector, PolicySelector } from "../../../Controls";
import { useClients } from "../../../context/clients";

const PolicyPaymentsPage = () => {
	const { clients, clientActions, loading, editing } = useClients();
	let [history, setHistory] = useState(null);
	let policy = editing && editing.policies.find((x) => x.selected);

	useEffect(() => {
		if (policy) {
			getPayments(policy);
		}
	}, [policy]);
	const getPayments = (policy) => {
		Axios.get(API + "/payments/policy/" + policy.id).then((res) => {
			setHistory(res.data.data);
		});
	};

	return (
		<Row>
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
												<th>{policy.company.name}</th>
											</tr>
											<tr>
												<th>Plan</th>
												<th>{policy.plan.name}</th>
											</tr>
											<tr>
												<th># Poliza</th>
												<th>{policy.policy_number}</th>
											</tr>
											<tr>
												<th>Prima</th>
												<th>{formatMoney(policy.premium, 2, ",", ".", "$")}</th>
											</tr>
											<tr>
												<th>Cobrado</th>
												<th>{formatMoney(policy.totals.collected, 2, ",", ".", "$")}</th>
											</tr>
											<tr>
												<th>Financiado</th>
												<th>{formatMoney(policy.totals.financed, 2, ",", ".", "$")}</th>
											</tr>
											<tr>
												<th>Pagado a la Aseg</th>
												<th>{formatMoney(policy.totals.payed, 2, ",", ".", "$")}</th>
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
										<tbody>
											<tr>
												<th>Fecha</th>
												<th>Tipo</th>
												<th>Monto</th>
											</tr>
											{history.policy_payments.map((hist, k) => (
												<tr key={k}>
													<td>{hist.payment_date}</td>
													<td>{hist.payment_type}</td>
													<td>
														{hist.amount} {hist.currency}
													</td>
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
										<tbody>
											<tr>
												<th>Fecha</th>
												<th>Tipo</th>
												<th>Monto</th>
											</tr>
											{history.payments.map((hist, k) => (
												<tr key={k}>
													<td>{hist.payment_date}</td>
													<td>{hist.payment_type}</td>
													<td>
														{hist.amount} {hist.currency}
													</td>
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
