import React, { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import Navbar from "../Navbar";
import { useNotifications } from "../../context/notification";
import { useGlobal } from "../../context/global";
export const GlobalContext = React.createContext();

const BasicLayout = ({ children }) => {
	const { notifications, deleteNotification } = useNotifications();
	const { globalActions } = useGlobal();

	useEffect(() => {
		globalActions.getCategories();
		globalActions.getAgents();
		globalActions.getAccounts();
		globalActions.getCollectors();
		globalActions.getCompanies();
	}, [globalActions]);

	return (
		<>
			<Navbar />
			<Container fluid className="p-5">
				{children}

				<div className="notification-wrapper">
					{notifications.length > 0 &&
						notifications.map((not, index) => {
							return (
								<Notification
									index={index}
									key={index}
									deleteNotification={() => deleteNotification(index)}
									type={not.type}
								>
									{not.message}
								</Notification>
							);
						})}
				</div>
			</Container>
		</>
	);
};

const Notification = ({ children, type, deleteNotification, index }) => (
	<Alert dismissible onClose={() => deleteNotification(index)} variant={type} className="notification">
		{children}
	</Alert>
);

export default BasicLayout;
