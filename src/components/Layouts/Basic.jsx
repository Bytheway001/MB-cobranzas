import React, { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import Navbar from "../Navbar";
import { useNotifications } from "../../context/notification";
import { useGlobal } from "../../context/global";
export const GlobalContext = React.createContext();

function responser(err) {
	if (err.response) {
		console.log(err.response);
		return err.response.statusText;
	} else if (err.request) {
		return JSON.stringify(err);
	} else {
		return err.message;
	}
}
const BasicLayout = ({ children }) => {
	const { notifications, deleteNotification, addNotification } = useNotifications();
	const { globalActions } = useGlobal();

	useEffect(() => {
		globalActions.getCategories();
		globalActions
			.getAgents()
			.then()
			.catch((x) => {
				addNotification("secondary", "Agents Error: " + responser(x));
			});
		globalActions
			.getAccounts()
			.then()
			.catch((x) => {
				addNotification("warning", "Accounts Error: " + responser(x));
			});
		globalActions
			.getCollectors()
			.then()
			.catch((x) => {
				addNotification("info", "Collectors Error: " + responser(x));
			});
		globalActions
			.getCompanies()
			.then()
			.catch((x) => {
				addNotification("danger", "Companies Error: " + responser(x));
			});
		// eslint-disable-next-line
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
