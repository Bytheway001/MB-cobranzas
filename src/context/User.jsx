import Axios from "axios";
import React, { useContext, useState } from "react";
import { API, setupInterceptors } from "../utils/utils";

export const UsersContext = React.createContext();
export function UsersProvider({ children }) {
	const token = localStorage.getItem("user");
	if (token) {
		setupInterceptors(JSON.parse(token).id);
	}
	const [user, setUser] = useState(token ? JSON.parse(token) : null);
	const [authenticated, setAuthenticated] = useState(token ? true : false);
	const [reports, setReports] = useState(null);
	const [payments, setPayments] = useState([]);
	const loginUser = (data) => {
		localStorage.setItem("user", data);
		setUser(JSON.parse(data));
	};

	const logoutUser = () => {
		localStorage.removeItem("user");
		setUser(null);
	};
	/* Post Requests */
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
	const createPolicyPayment = async (policy_payment) => {
		const res = await Axios.post(API + "/payments/policy", policy_payment);
		return res.data;
	};

	const validatePayment = async (id) => {
		const res = await Axios.get(API + "/payments/validate/" + id);
		return res.data;
	};

	/* Get Requests */
	const getReports = async (from = null, to = null, id) => {
		if (from && to) {
			const f = new Date(from).toLocaleDateString();
			const t = new Date(to).toLocaleDateString();
			const res = await Axios.get(API + "/reports?f=" + f + "&t=" + t + (id ? "&id=" + id : ""));
			setReports(res.data);
		} else {
			const res = await Axios.get(API + "/reports" + (id ? "?id=" + id : ""));
			setReports(res.data);
		}
	};

	const getPayments = async () => {
		const res = await Axios.get(API + "/payments");
		setPayments(res.data.data);
	};

	/* Functional Actions */

	const userRole = (level) => {
		let roles = { staff: 128, collector: 224, admin: 248, master: 255 };
		let userRole = roles[user.role];
		return userRole >= level;
	};

	const changeCurrency = () => null;
	const collectCheck = () => null;

	const userActions = {
		createTransfer: (values) => createTransfer(values),
		setUser,
		createExpense,
		loginUser: (user) => loginUser(user),
		logoutUser: () => logoutUser(),
		setAuthenticated: (val) => setAuthenticated(val),
		createPolicyPayment: (data) => createPolicyPayment(data),
		createIncome: (values) => createIncome(values),
		getPayments: () => getPayments(),
		changeCurrency,
		collectCheck,
		validatePayment: (id) => validatePayment(id),
		getReports: (from, to, id) => getReports(from, to, id),
	};

	const value = {
		user,
		authenticated,
		userActions,
		userRole,
		reports,
		payments,
	};
	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export const useUser = () => {
	const context = useContext(UsersContext);
	return context;
};
