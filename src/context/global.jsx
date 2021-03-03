import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { API } from "../utils/utils";

export const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
	const [agents, setAgents] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [collectors, setCollectors] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [categories, setCategories] = useState({ egresos: {}, ingresos: {} });
	const getAgents = async () => {
		const res = await Axios.get(API + "/agents");
		if (res.data.data) {
			setAgents(res.data.data);
		}
		return res;
	};

	const getAccounts = async () => {
		const res = await Axios.get(API + "/accounts");
		if (res.data.data) {
			setAccounts(res.data.data);
		}
		return res;
	};
	const getCollectors = async () => {
		const res = await Axios.get(API + "/collectors");
		if (res.data.data) {
			setCollectors(res.data.data);
		}
		return res;
	};
	const getCompanies = async () => {
		const res = await Axios.get(API + "/companies");
		if (res.data.data) {
			setCompanies(res.data.data);
		}
		return res;
	};

	const getCategories = async () => {
		const res = await Axios.get(API + "/categories");
		if (res.data.data) {
			setCategories(res.data.data);
		}
		return res;
	};

	const globalActions = useMemo(
		() => ({
			getAgents: () => getAgents(),
			getAccounts: () => getAccounts(),
			getCollectors: () => getCollectors(),
			getCompanies: () => getCompanies(),
			getCategories: () => getCategories(),
		}),
		[]
	);

	const value = useMemo(
		() => ({
			agents,
			globalActions,
			accounts,
			collectors,
			companies,
			categories,
		}),
		[agents, accounts, collectors, companies, globalActions, categories]
	);
	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
