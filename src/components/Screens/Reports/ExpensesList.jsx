import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import { ExpenseReceipt } from "../../../Receipts/Expense";
import { listOf } from "../../../utils/utils";

export const ExpensesList = ({ expenses, setCorrection }) => {
	const accounts = [...new Set(expenses.map((e) => e.account.name))].map((x) => ({ value: x, label: x }));
	const categories = [...new Set(expenses.map((e) => e.category.name))].map((x) => ({ value: x, label: x }));

	const currencies = listOf(expenses, "currency");
	const { ExportCSVButton } = CSVExport;

	const columns = [
		{ dataField: "id", text: "Ref", sort: true, headerStyle: { width: 50 } },
		{ dataField: "date", text: "Fecha", headerStyle: { width: 100 }, formatter: (cell) => new Date(cell).toLocaleDateString() },
		{
			dataField: "account.name",
			text: "Cuenta",
			sort: true,
			filter: selectFilter({ options: accounts, className: "form-control-sm", placeholder: "Todas" }),
			headerStyle: { width: 150 },
		},
		{ dataField: "description", text: "Descripcion" },
		{
			dataField: "category.name",
			text: "Categoria",
			filter: selectFilter({ options: categories, className: "form-control-sm", placeholder: "Todas" }),
			headerStyle: { width: 300 },
		},
		{ dataField: "bill_number", text: "# Factura", headerStyle: { width: 100 } },
		{ dataField: "amount", text: "Cantidad", csvType: Number, headerStyle: { width: 150 } },
		{
			dataField: "currency",
			text: "Moneda",
			sort: true,
			filter: selectFilter({ options: currencies, className: "form-control form-control-sm", placeholder: "Todas" }),
			headerStyle: { width: 80 },
		},
		{ dataField: "office", text: "Oficina", export: false, headerStyle: { width: 100 } },
		{
			dataField: "download",
			text: ">",
			formatter: (cell, row) => (
				<>
					{!row.corrected_with && (
						<ButtonGroup size="sm">
							<ExpenseReceipt data={row} user={row.user} modal={true} />
							<Button
								size="sm"
								onClick={() => setCorrection({ type: "expenses", row: row, user_id: row.user_id, user: row.user })}
							>
								<FontAwesomeIcon style={{ cursor: "pointer" }} icon={faBan} color="red" />
							</Button>
						</ButtonGroup>
					)}
				</>
			),
			csvExport: false,
			headerStyle: { width: 80 },
		},
	];

	return (
		<ToolkitProvider
			keyField="id"
			data={expenses.filter((x) => !x.corrected_with && !x.correcting)}
			columns={columns}
			exportCSV={{
				fileName: "Reporte de Gastos.csv",
				noAutoBOM: false,
				exportAll: false,
				onlyExportFiltered: true,
				separator: ";",
			}}
		>
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
