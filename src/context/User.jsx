import Axios from "axios";
import React, { useContext, useState, useMemo } from "react";
import { API, setupInterceptors } from "../utils/utils";

export const UsersContext = React.createContext();
export function UsersProvider({ children }) {
	const token = localStorage.getItem("user");
	if (token) {
		console.log("there is token");
		setupInterceptors(JSON.parse(token).id);
	}
	const [user, setUser] = useState(token ? JSON.parse(token) : null);
	const [authenticated, setAuthenticated] = useState(token ? true : false);
	const loginUser = (data) => {
		localStorage.setItem("user", data);
		setUser(JSON.parse(data));
	};

	const logoutUser = () => {
		console.log("Logging out");
		localStorage.removeItem("user");
		setUser(null);
	};

	const createTransfer = async (values) => {
		try {
			const res = await Axios.post(API + "/transfers", values);
			return res.data;
		} catch (err) {
			return err.response;
		}
	};

	const createExpense = async (values) => {
		if (window.confirm("Desea registrar este egreso?")) {
			const res = await Axios.post(API + "/expenses", { ...values });
			return res.data.data;
		}
	};
	const createIncome = async (values) => {
		if (window.confirm("Desea registrar este egreso?")) {
			const res = await Axios.post(API + "/income", { ...values });
			return res.data;
		}
	};

	const userRole = (level) => {
		let roles = { staff: 128, collector: 224, admin: 248, master: 255 };
		let userRole = roles[user.role];
		return userRole >= level;
	};

	const createPolicyPayment = () => null;

	const changeCurrency = () => null;
	const collectCheck = () => null;
	const validatePayment = () => null;

	const userActions = {
		createTransfer: (values) => createTransfer(values),
		setUser,
		createExpense,
		loginUser: (user) => loginUser(user),
		logoutUser: () => logoutUser(),
		setAuthenticated: (val) => setAuthenticated(val),
		createPolicyPayment,
		createIncome: (values) => createIncome(values),
		changeCurrency,
		collectCheck,
		validatePayment,
	};

	const value = useMemo(
		() => ({
			user,
			authenticated,
			userActions,
			userRole,
		}),
		[user, authenticated, userActions]
	);
	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export const useUser = () => {
	const context = useContext(UsersContext);
	return context;
};
