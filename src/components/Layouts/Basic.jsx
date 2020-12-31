import React, { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import Navbar from "../Navbar";
import { deleteNotification } from "../../ducks/notifications";
import { useNotifications } from "../../context/notification";
import { useGlobal } from "../../context/global";
export const GlobalContext = React.createContext();

const BasicLayout = ({ children }) => {
	const { notifications, deleteNotification } = useNotifications();
	const { globalActions } = useGlobal();

	useEffect(() => {
		globalActions.getAgents();
		globalActions.getAccounts();
		globalActions.getCollectors();
		globalActions.getCompanies();
	}, []);
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

const mapStateToProps = (state) => ({
	user: state.session.user,
});
const mapDispatchToProps = (dispatch) => ({
	deleteNotification: (index) => dispatch(deleteNotification(index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
