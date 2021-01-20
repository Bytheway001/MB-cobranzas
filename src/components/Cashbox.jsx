import React, { useState, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { Extracto } from "./Screens/Reports/components/Extracto";
import Axios from "axios";
import { API, formatMoney } from "../utils/utils";
import { CurrencyChange } from "../Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useGlobal } from "../context/global";

export const CashBox = ({ usd, bob, id }) => {
	const { globalActions } = useGlobal();
	const [modalData, setModalData] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const fillModal = (e, id) => {
		Axios.get(API + "/movements/" + id).then((res) => {
			setModalData(res.data.data);
			setModalShow(true);
		});
	};
	return (
		<Fragment>
			<Extracto show={modalShow} setShow={setModalShow} data={modalData} text="Ver Movimientos" />
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
							<Button onClick={(e) => fillModal(e, id)} block size="sm">
								Ver Movimientos
							</Button>
						</th>
						<th>
							<CurrencyChange />
						</th>
					</tr>
				</tfoot>
			</Table>
		</Fragment>
	);
};
