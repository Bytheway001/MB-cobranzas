import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { API } from "../utils/utils";
const GlobalContext = React.createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
	const [agents, setAgents] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [collectors, setCollectors] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [categories, setCategories] = useState([]);
	const getAgents = () => {
		Axios.get(API + "/agents")
			.then((res) => {
				setAgents(res.data.data);
			})
			.catch(() => {
				alert("Error on Getting agents");
			});
	};
	const getAccounts = () => {
		Axios.get(API + "/accounts")
			.then((res) => {
				setAccounts(res.data.data);
			})
			.catch(() => {
				alert("Error on Getting Accounts");
			});
	};
	const getCollectors = () => {
		Axios.get(API + "/collectors")
			.then((res) => {
				setCollectors(res.data.data);
			})
			.catch(() => alert("Error on getting Collectors"));
	};
	const getCompanies = () => {
		Axios.get(API + "/companies").then((res) => {
			setCompanies(res.data.data);
		});
	};

	const getCategories = () => {
		Axios.get(API + "/categories").then((res) => {
			setCategories(res.data.data);
		});
	};

	const globalActions = {
		getAgents: () => getAgents(),
		getAccounts: () => getAccounts(),
		getCollectors: () => getCollectors(),
		getCompanies: () => getCompanies(),
		getCategories: () => getCategories(),
	};

	const value = useMemo(
		() => ({
			agents,
			globalActions,
			accounts,
			collectors,
			companies,
			categories,
		}),
		[agents, accounts, collectors, companies]
	);
	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
