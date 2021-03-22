import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useUser } from "../../../context/User";
import { formatMoney } from "../../../utils/utils";
import { SmartCard } from "../../library/SmartCard";

export const Financiamientos = () => {
	const { financed, userActions } = useUser();

	useEffect(() => {
		userActions.getFinancedPolicies();
	}, [userActions]);
	return (
		<Row>
			<Col sm={12}>
				<SmartCard title="Polizas Financiadas">
					<Table size="sm" style={{ fontSize: "0.8em" }}>
						<thead>
							<tr>
								<th>Cliente</th>
								<th># Poliza</th>
								<th>Compañia</th>
								<th>Monto Financiado</th>
							</tr>
						</thead>
						<tbody>
							{financed.map((f, i) => {
								return (
									<tr key={i}>
										<td>{f.policy.client.first_name}</td>
										<td>{f.policy.policy_number}</td>
										<td>{f.policy.plan.company.name}</td>
										<td>{formatMoney(f.amount, 2, ".", ",", f.currency === "USD" ? "$" : "Bs.")}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</SmartCard>
			</Col>
		</Row>
	);
};
