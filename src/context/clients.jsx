import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { CLIENT_RESOURCE } from "../utils/endpoints";
import { API } from "../utils/utils";
export const ClientContext = React.createContext();

export const useClients = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
	const [clients, setClients] = useState([]);
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(false);
	const getClientList = (query = null) => {
		setLoading(true);
		let string = CLIENT_RESOURCE;
		if (query) {
			if (query === "financed") {
				string += "?f=true";
			} else {
				string += "?q=" + query;
			}
		}
		Axios.get(string)
			.then((res) => {
				setClients(res.data.data);
				setLoading(false);
			})
			.catch(() => {
				setClients([]);
				setLoading(false);
			});
	};

	const selectClient = (clientArr) => {
		if (clientArr[0]) {
			Axios.get(`${CLIENT_RESOURCE}/${clientArr[0].id}`).then((res) => {
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
		let res = null;
		if (!data.id) {
			res = await Axios.post(CLIENT_RESOURCE, data);
			clients.push(res.data.data);
		} else {
			res = await Axios.put(`${CLIENT_RESOURCE}/${data.id}`, data);
			let index = clients.findIndex((x) => x.id === data.id);
			clients[index] = res.data.data;
		}
		setClients([...clients]);
		setEditing(res.data.data);
		return res.data;
	};
	const createPolicy = async (policy) => {
		let res;
		if (policy.id) {
			let data = (({ plan_id, policy_number, premium, frequency, renovation_date, effective_date, option, comment }) => ({
				plan_id,
				policy_number,
				premium,
				frequency,
				renovation_date,
				effective_date,
				option,
				comment,
			}))(policy);
			res = await Axios.put(API + "/policies/" + policy.id, data);
			let index = editing.policies.findIndex((x) => x.id === policy.id);
			editing.policies[index] = { ...res.data.data, selected: true };
		} else {
			res = await Axios.post(API + "/policies", policy);
			editing.policies.push({ ...res.data.data, selected: true });
		}
		setEditing({ ...editing });
		return res.data;
	};

	const createPayment = async (payment) => {
		const res = await Axios.post(API + "/payments", payment);
		return res.data;
	};

	const createRenovation = async (renovation) => {
		const res = await Axios.post(API + "/policies/" + renovation.policy_id + "/renew", renovation);
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
