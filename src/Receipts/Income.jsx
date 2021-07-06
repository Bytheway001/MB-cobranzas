import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Document, Page, Text, View, PDFViewer, Image } from "@react-pdf/renderer";
import { Fila, Columna, Field } from "./components/Components";
import Barras from "../assets/Barras2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { formatMoney } from "../utils/utils";
const styles = {
	page: {
		flexDirection: "column",
		padding: 50,
	},
	row: {
		margin: 10,
		padding: 10,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	h1: {
		textAlign: "center",
		backgroundColor: "#0747A6",
		width: "100%",
		color: "white",
		padding: 10,
	},
	content: {
		borderColor: "black",
		borderWidth: 1,
		borderStyle: "solid",
		width: "100%",
		backgroundColor: "#A1A1A1",
	},
	col: {
		marginBottom: 10,
	},
	smText: {
		fontSize: 12,
	},
};

export const IncomeReceipt = ({ user, data, modal }) => {
	const [show, setShow] = useState(false);
	const jsx = (
		<PDFViewer width="100%" height={800}>
			<Document>
				<Page size="LETTER" style={styles.page} orientation="portrait">
					<Fila style={{ height: 60 }}>
						<Columna style={{ flex: 3 }}>
							<Image src={Barras} style={{ width: "20mm" }} />
						</Columna>
						<Columna style={{ flex: 1, paddingHorizontal: 10, alignItems: "flex-end" }}>
							<View style={{ width: "20mm" }}>
								<Image
									src={
										"https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=https://cobranzas.megabrokerslatam.com/expense/" +
										data.id +
										"&uname=" +
										user
									}
									allowDangerousPaths
								/>
							</View>
						</Columna>
					</Fila>
					<Fila style={{ marginTop: 10 }}>
						<Columna style={{ width: "100%", textAlign: "center", padding: 10 }}>
							<Text style={{ color: "#0747A6", textDecoration: "underline" }}>Comprobante de Ingreso</Text>
						</Columna>
					</Fila>
					<Fila style={{ marginTop: 10, padding: 5, borderColor: "#A1A1A1", borderWidth: 3, borderStyle: "solid" }}>
						<Columna style={{ width: "50%" }}>
							<Field style={{ flexDirection: "row", justifyContent: "space-between" }} label="# Ingreso" text={data.id} />
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between" }}
								label="Fecha:"
								text={new Date(data.date).toLocaleDateString()}
							/>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between" }}
								label="Monto:"
								text={formatMoney(data.amount, 2, ",", ".", data.currency === "BOB" ? "Bs." : "$")}
							/>
							<Field style={{ flexDirection: "row", justifyContent: "space-between" }} label="Operador:" text={user.name} />

							<Field
								style={{ flexDirection: "row", justifyContent: "space-between" }}
								label="Cuenta Pagadora:"
								text={data.account.name}
							/>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between" }}
								label="Categoria:"
								text={data.category.name}
							/>
							<Field
								style={{ flexDirection: "column", justifyContent: "space-between" }}
								label="Descripcion:"
								text={data.description}
							/>
						</Columna>
						<Columna style={{ width: "45%", marginLeft: "5%" }}>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between" }}
								label="Firma Operador"
								text="___________________"
							/>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}
								label="Aclaracion"
								text="___________________"
							/>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}
								label="Recibido Conforme"
								text="___________________"
							/>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}
								label="Aclaracion"
								text="___________________"
							/>
							<Field
								style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}
								label="Observaciones"
								text=""
							/>
						</Columna>
					</Fila>
				</Page>
			</Document>
		</PDFViewer>
	);
	if (modal) {
		return (
			<>
				<Button onClick={() => setShow(true)}>
					<FontAwesomeIcon title="Ver Comprobante" icon={faSave} color="white" />
				</Button>

				<Modal size="xl" show={show} onHide={() => setShow(false)} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>Cliente</Modal.Title>
					</Modal.Header>
					<Modal.Body>{jsx}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShow(false)}>
							Close
						</Button>
						<Button form="client_form" type="submit" variant="primary">
							Actualizar
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	} else {
		return jsx;
	}
};
