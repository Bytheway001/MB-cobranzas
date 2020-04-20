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
import Dashboard from './components/Screens/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import NewClient from './components/Screens/Clients/New';
import { NewPayment } from './components/Screens/Payments/New';
import { ClientProfile } from './components/Screens/Clients/Profile';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
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
    <Route exact path='/clients/profile' component={ClientProfile} />
    <Route exact path='/payments/new' component={NewPayment} />
  </BasicLayout>

)

export default App;
