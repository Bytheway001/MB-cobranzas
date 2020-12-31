import Axios from "axios";
import React, { useContext, useState, useMemo } from "react";
import { API } from "../utils/utils";

export const UsersContext = React.createContext();
export function UsersProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);

	const createTransfer = async (values) => {
		try {
			const res = await Axios.post(API + "/transfers", values);
			return res.data;
		} catch (err) {
			return err.response;
		}
	};
	const userActions = {
		createTransfer: (values) => createTransfer(values),
		setUser,
		setAuthenticated,
	};

	const value = useMemo(
		() => ({
			user,
			authenticated,
			userActions,
		}),
		[user, authenticated, userActions]
	);
	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export const useUser = () => {
	const context = useContext(UsersContext);
	return context;
};
