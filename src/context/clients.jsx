import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { API } from "../utils/utils";
const ClientContext = React.createContext();

export const useClients = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
	const [list, setList] = useState([]);
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(false);

	const getClientList = (query = null) => {
		setLoading(true);
		let string = "";
		if (!query) {
			string = API + "/clients/list";
		} else {
			string = API + "/clients/list?q=" + query;
		}

		Axios.get(string)
			.then((res) => {
				setLoading(false);
				setList(res.data.data);
			})
			.catch(() => {
				alert("a");
				setLoading(false);
				setList([]);
			});
	};

	const selectClient = (clientArr) => {
		if (clientArr[0]) {
			Axios.get(API + "/clients/" + clientArr[0].id).then((res) => {
				setEditing(res.data.data);
			});
		} else {
			setEditing(null);
		}
	};

	const selectPolicy = (policyArr) => {
		let oldState = editing;
		let newState = [];
		if (policyArr[0]) {
			newState = oldState.policies.map((e) => {
				return { ...e, selected: e.id === policyArr[0].id };
			});
		} else {
			newState = oldState.policies.map((e) => {
				return { ...e, selected: false };
			});
		}

		setEditing({ ...editing, policies: newState });
	};

	const value = useMemo(() => {
		return { list, getClientList, editing, setEditing, selectClient, loading, selectPolicy };
	}, [list, editing]);

	return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};
