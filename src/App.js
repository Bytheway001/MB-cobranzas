import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "./assets/scss/overrides.scss";
import "./assets/scss/application.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./App.css";
import BasicLayout from "./components/Layouts/Basic";
import Home from "./components/Screens/Home";
import PrivateRoute from "./components/PrivateRoute";
import NewPayment from "./components/Screens/Payments/New";
import Reports from "./components/Screens/Reports/Reports";
import { BulkPayments } from "./components/Screens/Payments/Bulk";
import { RCC } from "./components/Screens/Reports/components/RCC";
import NewExpense from "./components/Screens/Expenses/New";

import PaymentsReport from "./components/Screens/Reports/Payments";
import NewTransfer from "./components/Screens/Transfers/New";
import { ChecksCollection } from "./components/Screens/Transfers/Checks";
import Finances from "./components/Screens/Reports/Finances";
import OtherPayment from "./components/Screens/Payments/Other";
import PolicyPaymentPage from "./components/Screens/Expenses/PolicyPaymentPage";
import { Renovaciones } from "./components/Screens/Reports/Renovaciones";
import Collector from "./Views/Collector";
import GeneralReport from "./Views/GeneralReport";
import { NotificationProvider } from "./context/notification";
import { ClientProvider } from "./context/clients";
import { GlobalProvider } from "./context/global";
import { UsersProvider } from "./context/User";

const App = () => {
	return (
		<UsersProvider>
			<Router>
				<Switch>
					<Route path="/login" component={Home} />
					<PrivateRoute path="/" comp={AppRoutes} />
				</Switch>
			</Router>
		</UsersProvider>
	);
};

const maintenance = false;

const AppRoutes = () => (
	<GlobalProvider>
		<ClientProvider>
			<NotificationProvider>
				<BasicLayout>
					{!maintenance ? (
						<Fragment>
							<PrivateRoute exact path="/" comp={Collector} />
							<Route exact path="/payments/new" component={NewPayment} />
							<Route exact path="/reports" component={Reports} />
							<Route exact path="/reports/rcc" component={RCC} />
							<Route exact path="/reports/general" component={GeneralReport} />
							<Route exact path="/reports/payments" component={PaymentsReport} />
							<Route exact path="/payments/bulk" component={BulkPayments} />

							<Route exact path="/expenses/new" component={NewExpense} />
							<Route exact path="/transfers/new" component={NewTransfer} />
							<Route exact path="/checks/collect" component={ChecksCollection} />
							<Route exact path="/reports/finances" component={Finances} />
							<Route exact path="/reports/finances/:id" component={Finances} />
							<Route exact path="/policy/pay" component={PolicyPaymentPage}></Route>
							<Route exact path="/other_incomes" component={OtherPayment} />
							<Route exact path="/test" component={Renovaciones} />
						</Fragment>
					) : (
						<Route path="/" component={Maintenance} />
					)}
				</BasicLayout>
			</NotificationProvider>
		</ClientProvider>
	</GlobalProvider>
);

const Maintenance = () => <div>EN MANTENIMIENTO</div>;

export default App;
