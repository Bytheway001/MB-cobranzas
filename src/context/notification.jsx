import React, { useContext, useState, useMemo } from "react";

export const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([]);

	const addNotification = (type, message) => {
		setNotifications([...notifications, { type, message }]);
	};

	const deleteNotification = (index) => {
		notifications.splice(index, 1);
		setNotifications([...notifications]);
	};

	const value = useMemo(
		() => ({
			notifications,
			addNotification,
			deleteNotification,
		}),
		[notifications]
	);

	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	return context;
};
