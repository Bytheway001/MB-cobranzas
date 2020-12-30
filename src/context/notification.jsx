import React, { useContext, useState } from "react";
export const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([]);

	const addNotification = (type, message) => {
		setNotifications([...notifications, { type, message }]);
	};

	/*
    function addNotification(type, message) {
        setNotifications([...notifications, { type, message }])
    }
    */

	const value = {
		notifications,
		addNotification,
	};

	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	return context;
};
