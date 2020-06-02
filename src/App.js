import React from 'react';
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
import Dashboard from './components/Screens/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import NewClient from './components/Screens/Clients/New';
import  NewPayment  from './components/Screens/Payments/New';
import ClientProfile from './components/Screens/Clients/Profile';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Reports from './components/Screens/Reports/Reports';
import {BulkPayments} from './components/Screens/Payments/Bulk'
import { RCC } from './components/Screens/Reports/components/RCC';
import NewExpense from './components/Screens/Expenses/New';
import Expenses from './components/Screens/Expenses/Expenses';
import {composeWithDevTools} from 'redux-devtools-extension';
import PaymentsReport from './components/Screens/Reports/Payments';
import GeneralReport from './components/Screens/Reports/GeneralReport';
import NewTransfer from './components/Screens/Transfers/New';
import { ChecksCollection } from './components/Screens/Transfers/Checks';

const store = createStore(rootReducer, 
  composeWithDevTools(
  applyMiddleware(thunk))
  );
if (localStorage.getItem('user')) {
  store.dispatch({ type: 'LOGIN_SUCCEEDED', payload: JSON.parse(localStorage.getItem('user')) })
}
const App = props => {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login' component={Home} />
          <PrivateRoute path='/' comp={AppRoutes} />
        </Switch>
      </Router>
    </Provider>
  );
}

const AppRoutes = props => (
  <BasicLayout>
    <PrivateRoute exact path='/' comp={Dashboard} />
    <Route exact path='/clients/new' component={NewClient} />
    <Route exact path='/clients/profile/:id' component={ClientProfile} />
    <Route exact path='/payments/new' component={NewPayment} />
    <Route exact path='/reports' component={Reports} />
    <Route exact path='/reports/rcc' component={RCC} />
    <Route exact path='/reports/general' component={GeneralReport}/>
    <Route exact path='/reports/payments' component={PaymentsReport}/>
    <Route exact path='/payments/bulk' component={BulkPayments}/>
    <Route exact path='/expenses' component={Expenses}/>
    <Route exact path='/expenses/new' component={NewExpense}/>
    <Route exact path='/transfers/new' component={NewTransfer}/>
    <Route exact path='/checks/collect' component={ChecksCollection}/>
  </BasicLayout>

)

export default App;
