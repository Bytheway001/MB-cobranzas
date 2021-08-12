import React, { useState, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { Extracto } from "./Screens/Reports/components/Extracto";
import Axios from "axios";
import { API, formatMoney } from "../utils/utils";
import { CurrencyChange } from "../Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useGlobal } from "../context/global";
import { downloadXls } from "../utils/donwloadXls";

export const CashBox = ({ usd, bob, account_id }) => {
	const { globalActions, accounts } = useGlobal();
	const [modalData, setModalData] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const [period, setPeriod] = useState(false);

	const download = async () => {
		const res = await Axios.get(API + "/exports/cash/" + account_id + (period ? "?period=" + period : ""));
		downloadXls(res.data.data.file, res.data.data.filename);
	};

	const fillModal = (period) => {
		Axios.get(API + "/reports/movements/" + account_id + (period ? `?period=${period}` : "")).then((res) => {
			setModalData(res.data.data);
			setModalShow(true);
		});
		setPeriod(period);
	};
	return (
		<Fragment>
			<Extracto
				show={modalShow}
				setShow={setModalShow}
				data={modalData}
				download={download}
				onMonthChange={(period) => fillModal(period)}
			/>
			<Table variant="bordered" size="sm">
				<thead>
					<tr>
						<th className="bg-info text-white px-3" colSpan={2}>
							<span>Mi Caja</span>
							<span style={{ float: "right", cursor: "pointer" }} onClick={() => globalActions.getAccounts()}>
								<FontAwesomeIcon icon={faSync} />{" "}
							</span>
						</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th>USD</th>
						<th>BOB</th>
					</tr>
					<tr>
						<th>{formatMoney(usd, 2, ".", ",", "")}</th>
						<th>{formatMoney(bob, 2, ".", ",", "")}</th>
					</tr>
				</tbody>

				<tfoot>
					<tr>
						<th>
							<Button onClick={() => fillModal()} block size="sm">
								Ver Movimientos
							</Button>
						</th>
						<th>
							<CurrencyChange handleAccountRefresh={() => globalActions.getAccounts()} accounts={accounts} />
						</th>
					</tr>
				</tfoot>
			</Table>
		</Fragment>
	);
};
