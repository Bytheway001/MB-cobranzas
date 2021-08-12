import React, { useState } from "react";
import { Modal, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { formatMoney } from "../../../../utils/utils";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
export const Extracto = ({ show, setShow, data, onMonthChange, download }) => {
	const [balance] = useState("all");
	let finalData = [];
	if (data) {
		let saldoInicial = { ...data.saldos };
		if (data.movements.length > 0) {
			finalData = data.movements
				.map((row, i) => {
					saldoInicial[row.currency] = saldoInicial[row.currency] + parseFloat(row.debe) - parseFloat(row.haber);
					return {
						index: i + 1,
						date: row.date,
						description: row.description,
						currency: row.currency,
						debe: parseFloat(row.debe).toFixed(2),
						haber: parseFloat(row.haber).toFixed(2),
						saldo_usd: saldoInicial.USD.toFixed(2),
						saldo_bob: saldoInicial.BOB.toFixed(2),
						category: row.category,
					};
				})
				.filter((z) => {
					return (
						balance === "all" ||
						((z.t === "Ingreso" || z.t === "Cobranza") && balance === "in") ||
						((z.t === "Gasto" || z.t === "Pago Poliza") && balance === "out")
					);
				});
			finalData.unshift({
				index: 0,
				date: "--",
				description: "SALDO INICIAL",
				currency: "--",
				debe: "--",
				haber: "--",
				saldo_usd: data.saldos.USD.toFixed(2),
				saldo_bob: data.saldos.BOB.toFixed(2),
				category: "--",
			});
		}
	}

	const columns = [
		{
			dataField: "date",
			text: "Fecha",
			type: "date",
		},
		{
			dataField: "category",
			headerTitle: false,
			text: null,
			filter: selectFilter({
				options: [...new Set(finalData.map((e) => e["category"]))].map((x) => ({ value: x, label: x })),
				className: "form-control-sm",
				placeholder: "Todas las Categorias",
			}),
		},
		{ dataField: "description", text: "Desc." },
		{
			dataField: "currency",
			text: null,
			filter: selectFilter({
				options: [
					{ value: "USD", label: "USD" },
					{ value: "BOB", label: "BOB" },
				],
				className: "form-control-sm",
				placeholder: "Todas las Monedas",
			}),
		},
		{
			dataField: "debe",
			text: "Debe",
			csvFormatter: (cell) => cell.replace(".", ","),
			formatter: (cell, row) => formatMoney(cell, "2", ".", ",", row.currency === "USD" ? "$" : "Bs."),
			style: { textAlign: "right" },
		},
		{
			dataField: "haber",
			text: "Haber",
			csvFormatter: (cell) => cell.replace(".", ","),
			formatter: (cell, row) => formatMoney(cell, "2", ".", ",", row.currency === "USD" ? "$" : "Bs."),
			style: { textAlign: "right" },
		},
		{
			dataField: "saldo_usd",
			text: "Saldo (USD)",
			csvFormatter: (cell) => cell.replace(".", ","),
			formatter: (cell) => formatMoney(cell, 2, ",", ".", "$"),
			style: { textAlign: "right" },
		},
		{
			dataField: "saldo_bob",
			text: "Saldo (BOB)",
			csvFormatter: (cell) => cell.replace(".", ","),
			formatter: (cell) => formatMoney(cell, 2, ",", ".", "Bs."),
			style: { textAlign: "right" },
		},
	];

	const months = [
		{ month: "Ene", val: "01" },
		{ month: "Feb", val: "02" },
		{ month: "Mar", val: "03" },
		{ month: "Abr", val: "04" },
		{ month: "May", val: "05" },
		{ month: "Jun", val: "06" },
		{ month: "Jul", val: "07" },
		{ month: "Ago", val: "08" },
		{ month: "Sep", val: "09" },
		{ month: "Oct", val: "10" },
		{ month: "Nov", val: "11" },
		{ month: "Dic", val: "12" },
	];
	return (
		<>
			<Modal dialogClassName="modal-fs" show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Movimientos De Cuenta</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col sm={4}>
							<ButtonGroup size="sm" className="mb-3">
								<Button className="secondary" disabled>
									Mes:{" "}
								</Button>
								{months.map((month, key) => (
									<Button key={key} onClick={() => onMonthChange(month.val)}>
										{month.month}
									</Button>
								))}
							</ButtonGroup>
						</Col>
					</Row>

					<ToolkitProvider
						keyField="index"
						data={finalData}
						columns={columns}
						exportCSV={{
							fileName: "Movimiento de Caja.csv",
							noAutoBOM: false,
							exportAll: false,
							onlyExportFiltered: true,
							separator: ";",
						}}
					>
						{(props) => {
							return (
								<>
									<Button className="btn btn-primary btn-sm my-2" onClick={download}>
										Descargar Reporte
									</Button>
									<BootstrapTable
										{...props.baseProps}
										striped
										hover
										bootstrap4={true}
										rowStyle={(row) => ({ fontSize: row.index !== 0 ? "0.9em" : "1.3em" })}
										condensed
										filter={filterFactory()}
										rowClasses={(row) => (row.index === 0 ? "bg-primary text-white" : null)}
									/>
								</>
							);
						}}
					</ToolkitProvider>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => setShow(false)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
