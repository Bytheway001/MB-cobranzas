import React, { useContext, useState, useMemo, useCallback } from "react";

export const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([]);
	const addNotification = useCallback(
		(type, message) => {
			setNotifications([...notifications, { type, message }]);
		},
		[notifications]
	);
	const deleteNotification = useCallback(
		(index) => {
			notifications.splice(index, 1);
			setNotifications([...notifications]);
		},
		[notifications]
	);

	const value = useMemo(
		() => ({
			notifications,
			addNotification,
			deleteNotification,
		}),
		[notifications, addNotification, deleteNotification]
	);

	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	return context;
};
