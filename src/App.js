import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import './assets/scss/overrides.scss'
import './assets/scss/application.scss'
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './ducks/root';
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BasicLayout from './components/Layouts/Basic';
import Home from './components/Screens/Home';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Screens/Dashboard/Screen';
import NewClient from './components/Screens/Clients/New';
import NewPayment from './components/Screens/Payments/New';
import ClientProfile from './components/Screens/Clients/Profile';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Reports from './components/Screens/Reports/Reports';
import { BulkPayments } from './components/Screens/Payments/Bulk'
import { RCC } from './components/Screens/Reports/components/RCC';
import NewExpense from './components/Screens/Expenses/New';
import Expenses from './components/Screens/Expenses/Expenses';
import { composeWithDevTools } from 'redux-devtools-extension';
import PaymentsReport from './components/Screens/Reports/Payments';
import GeneralReport from './components/Screens/Reports/GeneralReport';
import NewTransfer from './components/Screens/Transfers/New';
import { ChecksCollection } from './components/Screens/Transfers/Checks';
import Finances from './components/Screens/Reports/Finances';
import { setupInterceptors } from './utils/utils';
import Axios from 'axios';
import { PolicyPaymentsPage } from './components/Screens/Expenses/PolicyPaymentPage';
import { Categories } from './components/Screens/Categories/Page';
import { OtherPayment } from './components/Screens/Payments/Other';
import { Collector } from './components/Screens/Dashboard/Collector';

const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk))
);


if (localStorage.getItem('user')) {
  let parsed = JSON.parse(localStorage.getItem('user'))
  setupInterceptors(parsed.id)
  store.dispatch({ type: 'LOGIN_SUCCEEDED', payload: parsed })
}






const App = props => {
  const user=store.getState().session.user;
  const role=user?user.role:null
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login' component={Home} />
          {
            role && role === 'admin'?
            <PrivateRoute path='/' comp={AppRoutes} />
            :
            <PrivateRoute path='/' comp={CollectorRoutes} />

          }
         
        </Switch>
      </Router>
    </Provider>
  );
}
const maintenance = false;

const AppRoutes = props => (
  <BasicLayout>
    {
      !maintenance ?
      <Fragment>
        <PrivateRoute exact path='/' comp={Dashboard} />
        <Route exact path='/clients/new' component={NewClient} />
        <Route exact path='/clients/profile/:id' component={ClientProfile} />
        <Route exact path='/payments/new' component={NewPayment} />
        <Route exact path='/reports' component={Reports} />
        <Route exact path='/reports/rcc' component={RCC} />
        <Route exact path='/reports/general' component={GeneralReport} />
        <Route exact path='/reports/payments' component={PaymentsReport} />
        <Route exact path='/payments/bulk' component={BulkPayments} />
        <Route exact path='/expenses' component={Expenses} />
        <Route exact path='/expenses/new' component={NewExpense} />
        <Route exact path='/transfers/new' component={NewTransfer} />
        <Route exact path='/checks/collect' component={ChecksCollection} />
        <Route exact path='/reports/finances' component={Finances} />
        <Route exact path='/policy/pay' component={PolicyPaymentsPage}></Route>
        <Route exact path='/categories' component={Categories} />
        <Route exact path='/other_incomes' component={OtherPayment} />
        </Fragment>
      :
      <Route path='/' component={Maintenance}/>
    }

  </BasicLayout>

)

const CollectorRoutes = props => (
  <BasicLayout>
      <Route path="/" component={Collector}/>
  </BasicLayout>
)

const Maintenance = ()=>(
  <div>EN MANTENIMIENTO</div>
)

export default App;
