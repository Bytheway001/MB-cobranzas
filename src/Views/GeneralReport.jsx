import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

import { Row, Col, Table } from "react-bootstrap";
import { SmartCard } from "../components/library/SmartCard";
import { API, formatMoney } from "../utils/utils";

const GeneralReport = () => {
	const [report, setReport] = useState(null);
	const LookReports = (from = null, to = null) => {
		if (from && to) {
			const f = new Date(from).toLocaleDateString();
			const t = new Date(to).toLocaleDateString();
			Axios.get(API + "/reports?f=" + f + "&t=" + t).then((res) => {
				setReport(res.data);
			});
		} else {
			Axios.get(API + "/reports").then((res) => {
				setReport(res.data);
			});
		}
	};

	useEffect(() => {
		LookReports();
	}, []);

	const getGyPCobranzas = () => {
		let result = { BOB: 0, USD: 0 };
		if (report) {
			report.payments.forEach((p) => {
				result[p.currency] = result[p.currency] + p.amount;
			});
		}

		return result;
	};
	const getGyPIngresos = () => {
		let result = {};
		let Totales = { BOB: 0, USD: 0 };
		if (report) {
			report.incomes.forEach((inc) => {
				if (!result[inc.category.name]) {
					result[inc.category.name] = { BOB: 0, USD: 0 };
				}
				result[inc.category.name][inc.currency] = result[inc.category.name][inc.currency] + inc.amount;
				Totales[inc.currency] = Totales[inc.currency] + inc.amount;
			});
		}
		return { ...result, Totales: Totales };
	};

	const getGyPPolicyPayments = () => {
		let result = 0;
		if (report) {
			report.policy_payments.forEach((pp) => {
				result = result + pp.amount;
			});
		}
		return result;
	};

	const getGyPExpenses = () => {
		let result = {};
		let Totales = { BOB: 0, USD: 0 };
		if (report) {
			report.expenses.forEach((inc) => {
				if (!result[inc.category.name]) {
					result[inc.category.name] = { BOB: 0, USD: 0 };
				}
				result[inc.category.name][inc.currency] = result[inc.category.name][inc.currency] + inc.amount;
				Totales[inc.currency] = Totales[inc.currency] + inc.amount;
			});
		}
		return { ...result, Totales: Totales };
	};
	var ingresos = getGyPIngresos();
	var cobranzas = getGyPCobranzas();
	var policyPayments = getGyPPolicyPayments();
	var gastos = getGyPExpenses();
	ingresos.Totales.BOB += cobranzas.BOB;
	ingresos.Totales.USD += cobranzas.USD;
	gastos.Totales.USD += policyPayments;

	return (
		<Row>
			<Col sm={12}>
				<h1 className="text-center">Estado de GyP</h1>
			</Col>
			<Col sm={6}>
				<SmartCard title="Ingresos">
					<Table size="sm" variant="bordered">
						<thead>
							<tr>
								<th style={{ width: "50%" }}>--</th>
								<th className="text-right">USD</th>
								<th className="text-right">BOB</th>
							</tr>
							<tr>
								<th>Cobranzas Realizadas</th>
								<td className="text-right">{formatMoney(cobranzas.USD, 2, ".", ",", "$ ")}</td>
								<td className="text-right">{formatMoney(cobranzas.BOB, 2, ".", ",", "Bs. ")}</td>
							</tr>

							{Object.keys(ingresos).map((obj, key) => (
								<tr key={key}>
									<th>{obj}</th>
									<td className="text-right">{formatMoney(ingresos[obj].USD, 2, ".", ".", "$ ")}</td>
									<td className="text-right">{formatMoney(ingresos[obj].BOB, 2, ".", ".", "Bs. ")}</td>
								</tr>
							))}
						</thead>
					</Table>
				</SmartCard>
			</Col>
			<Col sm={6}>
				<SmartCard title="Egresos">
					<Table size="sm" variant="bordered">
						<thead>
							<tr>
								<th style={{ width: "50%" }}>--</th>
								<th className="text-right">USD</th>
								<th className="text-right">BOB</th>
							</tr>
							<tr>
								<th>Pago de Polizas</th>
								<td className="text-right">{formatMoney(policyPayments, 2, ".", ",", "$ ")}</td>
								<td className="text-right">{0}</td>
							</tr>

							{Object.keys(gastos).map((obj, key) => (
								<tr key={key}>
									<th>{obj}</th>

									<td className="text-right">{formatMoney(gastos[obj].USD, 2, ".", ".", "$ ")}</td>
									<td className="text-right">{formatMoney(gastos[obj].BOB, 2, ".", ".", "Bs. ")}</td>
								</tr>
							))}
						</thead>
					</Table>
				</SmartCard>
			</Col>
		</Row>
	);
};

export default GeneralReport;
