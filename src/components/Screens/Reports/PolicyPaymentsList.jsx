import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";

export const PolicyPaymentsList = ({ payments, setCorrection }) => {
	const { ExportCSVButton } = CSVExport;
	const columns = [
		{ dataField: "id", text: "Ref" },
		{ dataField: "payment_date", text: "Fecha de pago" },
		{ dataField: "policy.client.first_name", text: "Cliente" },
		{ dataField: "policy.plan.company.name", text: "Aseguradora" },
		{ dataField: "amount", text: "Cantidad" },
		{ dataField: "currency", text: "Moneda" },
		{ dataField: "account.name", text: "Cuenta" },
		{ dataField: "policy_status", text: "Status" },
		{
			dataField: "none",
			text: "Acciones",
			formatter: (cell, row) => (
				<Button
					size="sm"
					onClick={() => setCorrection({ type: "policy_payments", row: row, user_id: row.user_id, user: row.user })}
				>
					<FontAwesomeIcon style={{ cursor: "pointer" }} icon={faBan} color="red" />
				</Button>
			),
		},
	];
	return (
		<ToolkitProvider keyField="id" data={payments.filter((x) => !x.corrected_with)} columns={columns} exportCSV>
			{(props) => {
				return (
					<>
						<ExportCSVButton className="btn btn-primary btn-sm my-2" {...props.csvProps}>
							Descargar CSV!!
						</ExportCSVButton>
						<BootstrapTable
							{...props.baseProps}
							striped
							hover
							bootstrap4={true}
							rowStyle={{ fontSize: "0.9em" }}
							condensed
							filter={filterFactory()}
						/>
					</>
				);
			}}
		</ToolkitProvider>
	);
};
