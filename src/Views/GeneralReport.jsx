import { faBuilding, faCashRegister, faDownload, faMoneyBill, faQuestion } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import React, { useState } from "react";
import { Row, Col, Modal, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { SmartCard } from "../components/library/SmartCard";
import { Thumbnail } from "../components/Thumbnail";
import AccountsOptions from "../options/accounts";
import { downloadXls } from "../utils/donwloadXls";
import { API } from "../utils/utils";

const GeneralReport = () => {
	const [reportType, setReportType] = useState("");
	return (
		<Row>
			<Col sm={12}>
				<SmartCard title="Reportes">
					<Row>
						<Col sm={3}>
							<Thumbnail title="Reporte de Caja" onClick={() => setReportType("cash")} icon={faCashRegister} />
						</Col>
						<Col sm={3}>
							<Thumbnail title="Reporte de Cobranzas" onClick={() => setReportType("payments")} icon={faMoneyBill} />
						</Col>
						<Col sm={3}>
							<Thumbnail title="Reporte de General" onClick={() => setReportType("main")} icon={faBuilding} />
						</Col>
						<Col sm={3}>
							<Thumbnail title="Reporte de Financiamientos" onClick={() => setReportType("financed")} icon={faQuestion} />
						</Col>
					</Row>
					<ModalReport reportType={reportType} setReportType={setReportType} />
				</SmartCard>
			</Col>
		</Row>
	);
};
const months = [
	{ value: "01", label: "Enero" },
	{ value: "02", label: "Febrero" },
	{ value: "03", label: "Marzo" },
	{ value: "04", label: "Abril" },
	{ value: "05", label: "Mayo" },
	{ value: "06", label: "Junio" },
	{ value: "07", label: "Julio" },
	{ value: "08", label: "Agosto" },
	{ value: "09", label: "Septiembre" },
	{ value: "10", label: "Octubre" },
	{ value: "11", label: "Noviembre" },
	{ value: "12", label: "Diciembre" },
];

const ModalReport = ({ reportType, setReportType }) => {
	const [report, setReport] = useState(null);
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [account, setAccount] = useState("");
	const getReport = () => {
		setReport(null);
		let url = API + "/exports/" + reportType;
		if (reportType === "cash") {
			url += "/" + account;
		}
		url += `?year=${year}&month=${month}`;
		Axios.get(url).then((res) => {
			setReport(res.data.data);
		});
	};
	return (
		<>
			<Modal show={reportType !== ""} onHide={() => setReportType("")}>
				<Modal.Header closeButton>Seleccionar Periodo</Modal.Header>
				<Modal.Body>
					<Row>
						{reportType === "cash" && (
							<Col sm={12}>
								<FormGroup>
									<FormLabel>Seleccione Caja</FormLabel>
									<FormControl as="select" onChange={({ target }) => setAccount(target.value)}>
										<AccountsOptions />
									</FormControl>
								</FormGroup>
							</Col>
						)}
						<Col sm={6}>
							<FormGroup>
								<FormLabel>Mes</FormLabel>
								<FormControl as="select" onChange={({ target }) => setMonth(target.value)}>
									<option value="">Seleccione...</option>
									{months.map((month, key) => (
										<option key={key} value={month.value}>
											{month.label}
										</option>
									))}
								</FormControl>
							</FormGroup>
						</Col>
						<Col sm={6}>
							<FormGroup>
								<FormLabel>Año</FormLabel>
								<FormControl as="select" onChange={({ target }) => setYear(target.value)}>
									<option value="">Seleccione...</option>
									{["2020", "2021", "2022"].map((month, key) => (
										<option key={key} value={month}>
											{month}
										</option>
									))}
								</FormControl>
							</FormGroup>
						</Col>
						<Col sm={12}>
							<Button onClick={() => getReport()} block>
								Generar Reporte
							</Button>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							{report && (
								<Thumbnail
									title="Descargar Reporte"
									onClick={() => downloadXls(report.file, report.filename)}
									icon={faDownload}
								>
									Descargar Report
								</Thumbnail>
							)}
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default GeneralReport;
