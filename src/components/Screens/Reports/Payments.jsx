import React, { useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { formatMoney, TranslatePaymentMethods } from "../../../utils/utils";
import BootstrapTable from "react-bootstrap-table-next";
import { useUser } from "../../../context/User";

import { useNotifications } from "../../../context/notification";

const PaymentsReport = () => {
	const { payments, userActions } = useUser();
	const { addNotification } = useNotifications();

	useEffect(() => {
		userActions.getPayments();
	}, [userActions]);

	const validatePayment = (id) => {
		if (window.confirm("Seguro que desea validar esta cobranza?")) {
			userActions.validatePayment(id).then((res) => {
				addNotification("success", res.data);
				userActions.getPayments();
			});
		}
	};

	const columns = [
		{ dataField: "id", text: "#Ref", style: { textAlign: "center", verticalAlign: "middle" }, headerStyle: { width: 40 }, sort: true },
		{
			dataField: "payment_date",
			text: "Fecha",
			style: {
				textAlign: "center",
				verticalAlign: "middle",
			},
			headerStyle: { width: 80 },
			formatter: (cell) => new Date(cell).toLocaleDateString(),
		},
		{
			dataField: "policy.plan.company.name",
			sort: true,
			text: "Aseguradora",
			style: {
				textAlign: "center",
				verticalAlign: "middle",
			},
		},
		{ dataField: "policy.client.first_name", text: "Cliente", style: { textAlign: "center", verticalAlign: "middle" } },
		{
			dataField: "planoption",
			text: "Plan",
			formatter: (cell, row) => `${row.policy.plan.name}-${formatMoney(row.policy.option)}`,
			style: { textAlign: "center", verticalAlign: "middle" },
		},
		{ dataField: "currency", text: "Moneda", style: { textAlign: "center", verticalAlign: "middle" } },
		{
			dataField: "amount",
			text: "Monto",
			formatter: (cell) => formatMoney(cell, "2", ".", ",", " "),
			style: { textAlign: "right", verticalAlign: "middle" },
		},
		{
			dataField: "company_discount",
			text: "D. Aseg",
			formatter: (cell) => formatMoney(cell, "2", ".", ",", " "),
			style: { textAlign: "right", verticalAlign: "middle" },
		},
		{
			dataField: "agency_discount",
			text: "D. Agencia",
			formatter: (cell) => formatMoney(cell, "2", ".", ",", " "),
			style: { textAlign: "right", verticalAlign: "middle" },
		},
		{
			dataField: "agent_discount",
			text: "D. Agente",
			formatter: (cell) => formatMoney(cell, "2", ".", ",", " "),
			style: { textAlign: "right", verticalAlign: "middle" },
		},
		{
			dataField: "processed",
			text: "Procesado?",
			formatter: (cell, row) => {
				return cell === 0 ? (
					<Button block size="sm" variant="success" onClick={() => validatePayment(row.id)}>
						Validar
					</Button>
				) : (
					"SI"
				);
			},
		},
		{ dataField: "payment_method", text: "Metodo", formatter: (cell) => TranslatePaymentMethods[cell] },
		{ dataField: "account.name", text: "Cuenta Receptora", formatter: (cell) => (cell === null ? "N/A" : cell) },
	];

	return (
		<Row>
			<Col sm={12}>
				<Card>
					<Card.Header className="bg-primary text-white">Validacion de Cobranzas</Card.Header>
					<Card.Body>
						<BootstrapTable
							classes="table-sm table-striped"
							keyField="id"
							columns={columns}
							data={payments.filter((x) => !x.corrected_with)}
						/>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default PaymentsReport;
