import React, { useEffect } from "react";
import { Container, Alert } from "react-bootstrap";

import { connect } from "react-redux";
import Navbar from "../Navbar";
import { deleteNotification } from "../../ducks/notifications";
import { getAccountList } from "../../ducks/accounts";
import { useNotifications } from "../../context/notification";

export const GlobalContext = React.createContext();

const BasicLayout = ({ children, listAccounts }) => {
	const notifications = useNotifications();
	useEffect(() => {
		listAccounts();
	}, [listAccounts]);
	return (
		<>
			<Navbar />
			<Container fluid className="p-5">
				{JSON.stringify(notifications)}
				{children}
				<Notification />
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
	listAccounts: () => dispatch(getAccountList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
