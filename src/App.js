/* Libraries Imports */
import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

/* Css Declarations */
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "./assets/scss/overrides.scss";
import "./assets/scss/application.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./App.css";

/* Components Imports */
import BasicLayout from "./components/Layouts/Basic";
import Home from "./components/Screens/Home";
import PrivateRoute from "./components/PrivateRoute";
import NewClient from "./components/Screens/Clients/New";
import NewPayment from "./components/Screens/Payments/New";
import ClientProfile from "./components/Screens/Clients/Profile";
import Reports from "./components/Screens/Reports/Reports";
import { BulkPayments } from "./components/Screens/Payments/Bulk";
import { RCC } from "./components/Screens/Reports/components/RCC";
import NewExpense from "./components/Screens/Expenses/New";
import Expenses from "./components/Screens/Expenses/Expenses";
import PaymentsReport from "./components/Screens/Reports/Payments";
import NewTransfer from "./components/Screens/Transfers/New";
import { ChecksCollection } from "./components/Screens/Transfers/Checks";
import Finances from "./components/Screens/Reports/Finances";
import { Categories } from "./components/Screens/Categories/Page";
import OtherPayment from "./components/Screens/Payments/Other";
import PolicyPaymentPage from "./components/Screens/Expenses/PolicyPaymentPage";
import { Renovaciones } from "./components/Screens/Reports/Renovaciones";
import Collector from "./Views/Collector";
import GeneralReport from "./Views/GeneralReport";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/login" component={Home} />
				<PrivateRoute path="/" comp={AppRoutes} />
			</Switch>
		</Router>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.session.user,
	};
};

const maintenance = false;

const AppRoutes = () => (
	<BasicLayout>
		{!maintenance ? (
			<Fragment>
				<PrivateRoute exact path="/" comp={Collector} />
				<Route exact path="/clients/new" component={NewClient} />
				<Route exact path="/clients/profile/:id" component={ClientProfile} />
				<Route exact path="/payments/new" component={NewPayment} />
				<Route exact path="/reports" component={Reports} />
				<Route exact path="/reports/rcc" component={RCC} />
				<Route exact path="/reports/general" component={GeneralReport} />
				<Route exact path="/reports/payments" component={PaymentsReport} />
				<Route exact path="/payments/bulk" component={BulkPayments} />
				<Route exact path="/expenses" component={Expenses} />
				<Route exact path="/expenses/new" component={NewExpense} />
				<Route exact path="/transfers/new" component={NewTransfer} />
				<Route exact path="/checks/collect" component={ChecksCollection} />
				<Route exact path="/reports/finances" component={Finances} />
				<Route exact path="/reports/finances/:id" component={Finances} />
				<Route exact path="/policy/pay" component={PolicyPaymentPage}></Route>
				<Route exact path="/categories" component={Categories} />
				<Route exact path="/other_incomes" component={OtherPayment} />
				<Route exact path="/test" component={Renovaciones} />
			</Fragment>
		) : (
			<Route path="/" component={Maintenance} />
		)}
	</BasicLayout>
);

const Maintenance = () => <div>EN MANTENIMIENTO</div>;

export default connect(mapStateToProps, null)(App);
