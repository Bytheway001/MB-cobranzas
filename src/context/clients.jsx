import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { API } from "../utils/utils";
export const ClientContext = React.createContext();

export const useClients = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
	const [clients, setClients] = useState([]);
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(false);
	const getClientList = (query = null) => {
		console.log(query);
		setLoading(true);
		let string = "";
		if (!query) {
			string = API + "/clients/list";
		} else {
			if (query === "financed") {
				string = API + "/clients/list?f=true";
			} else {
				string = API + "/clients/list?q=" + query;
			}
		}

		Axios.get(string)
			.then((res) => {
				setClients(res.data.data);
				setLoading(false);
			})
			.catch(() => {
				alert("a");
				setClients([]);
				setLoading(false);
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

	const createClient = async (data) => {
		const res = await Axios.post(API + "/clients/create", data);
		if (!data.id) {
			clients.push(res.data.data);
		} else {
			let index = clients.findIndex((x) => x.id === data.id);
			clients[index] = res.data.data;
		}
		setClients([...clients]);
		setEditing(res.data.data);
		return res.data;
	};
	const createPolicy = async (policy) => {
		const res = await Axios.post(API + "/clients/policies/create", policy);
		if (policy.id) {
			let index = editing.policies.findIndex((x) => x.id === policy.id);
			editing.policies[index] = { ...res.data.data, selected: true };
		} else {
			editing.policies.push({ ...res.data.data, selected: true });
		}
		setEditing({ ...editing });
		return res.data;
	};

	const createPayment = async (payment) => {
		const res = await Axios.post(API + "/payments/create", payment);
		return res.data;
	};

	const createRenovation = async (renovation) => {
		const res = await Axios.post(API + "/renewals", renovation);
		return res.data;
	};

	const clientActions = {
		getClients: (val) => getClientList(val),
		select: (val) => selectClient(val),
		selectPolicy: (val) => selectPolicy(val),
		create: (data) => createClient(data),
		createPolicy: (data) => createPolicy(data),
		createPayment: (data) => createPayment(data),
		createRenovation: (data) => createRenovation(data),
	};

	const value = useMemo(() => {
		return {
			clients,
			editing,
			loading,
			clientActions,
		};
	}, [clients, editing, loading, clientActions]);

	return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};
