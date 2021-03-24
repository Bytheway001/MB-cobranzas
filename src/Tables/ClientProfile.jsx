import React from "react";
import { Table } from "react-bootstrap";
import { formatMoney } from "../utils/utils";
import PaymentForm from "../Forms/Payment";
import PaymentHistory from "../Views/PaymentHistory";
import { Renewal } from "../Forms/Renewal";
import { Badge } from "react-bootstrap";

function returnLabel(value) {
	switch (value) {
		case "Pagada":
			return "success";
		case "Pendiente":
			return "danger";
		case "Cobrada":
			return "primary";
		default:
			return "warning";
	}
}
export const ClientProfile = ({ client }) => {
	const policy = client.policies.find((x) => x.selected);
	if (!policy) {
		return null;
	}
	let discounts = policy.totals.discounts.company + policy.totals.discounts.agency + policy.totals.discounts.agent;
	return (
		<Table size="sm" variant="bordered" style={{ fontSize: "0.9em" }}>
			<thead>
				<tr>
					<th className="bg-primary text-white text-center" colSpan={4}>
						Datos de Poliza
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th className="bg-info text-white">Poliza</th>
					<td>{policy.policy_number}</td>
					<th className="bg-info text-white">F. Renovacion</th>
					<td>{new Date(policy.renovation_date).toLocaleDateString()}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Cliente</th>
					<td>{client.first_name}</td>
					<th className="bg-info text-white">F. Efectiva</th>
					<td>{new Date(policy.effective_date).toLocaleDateString()}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Telefono</th>
					<td>{client.phone}</td>
					<th className="bg-info text-white">Frecuencia</th>
					<td>{policy.frequency}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Aseguradora</th>
					<td>{policy.company.name}</td>
					<th className="bg-info text-white">Agente</th>
					<td>{client.agent.name}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Plan/Opcion</th>
					<td>
						{policy.plan.name} - {formatMoney(policy.option, 2, ".", ",", "$")}
					</td>
					<th className="bg-info text-white">Cobrador</th>
					<td>{client.collector.name}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Prima</th>
					<td>
						{formatMoney(policy.premium, 2, ".", ",", "$")}{" "}
						<span style={{ color: "green" }}>
							({formatMoney(policy.premium - policy.totals.discounts.company, 2, ".", ",", "$")})
						</span>
					</td>
					<th className="bg-info text-white">Cobrado:</th>
					<td>{formatMoney(policy.totals.collected, 2, ".", ",", "$")}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Descuentos</th>
					<td>{formatMoney(discounts, 2, ".", ",", "$")}</td>
					<th className="bg-info text-white">Pagado:</th>
					<td>{formatMoney(policy.totals.payed, 2, ".", ",", "$")}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Email</th>
					<td>{client.email}</td>
					<th className="bg-info text-white">Financiado:</th>
					<td>{formatMoney(policy.totals.financed, 2, ".", ",", "$")}</td>
				</tr>
				<tr>
					<th className="bg-info text-white">Estado de Poliza</th>
					<td>
						<Badge pill variant={returnLabel(policy.status)}>
							{policy.status}
						</Badge>
					</td>
					<th className="bg-info text-white">ID Hubspot</th>
					<th>
						<a href={"https://app.hubspot.com/contacts/4019934/contact/" + client.h_id} target="blank">
							{client.h_id}
						</a>
					</th>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th className="bg-info text-white" style={{ verticalAlign: "middle" }}>
						Acciones:
					</th>
					<td>
						<Renewal pId={policy.id} />
						{policy.status !== "Pagada" ? <PaymentForm policy={policy} /> : null}
					</td>
					<td colSpan={2}>
						<PaymentHistory policy={policy.id} />
					</td>
				</tr>
			</tfoot>
		</Table>
	);
};
