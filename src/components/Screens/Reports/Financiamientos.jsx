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
								<th>Prima Total</th>
								<th>Descuentos</th>
								<th>Cobrado</th>
								<th>Pagado a la Aseg.</th>
								<th>Financiado</th>
								<th>Pendiente</th>
							</tr>
						</thead>
						<tbody>
							{financed.map((f, i) => {
								let discounts = f.totals.discounts.agent + f.totals.discounts.agency + f.totals.discounts.company;
								return (
									<tr key={i}>
										<td>{f.client.first_name}</td>
										<td>{f.policy_number}</td>
										<td>{formatMoney(f.premium, 2, ",", ".", "$")}</td>
										<td>{formatMoney(discounts, 2, ",", ".", "$")}</td>
										<td>{formatMoney(f.totals.collected, 2, ",", ".", "$")}</td>
										<td>{formatMoney(f.totals.payed, 2, ",", ".", "$")}</td>
										<td>{formatMoney(f.totals.financed, 2, ",", ".", "$")}</td>
										<td>{formatMoney(f.premium - discounts - f.totals.collected, 2, ",", ".", "$")}</td>
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
