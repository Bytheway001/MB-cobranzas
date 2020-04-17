import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import './assets/scss/overrides.scss'
import './assets/scss/application.scss'
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './ducks/root';
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BasicLayout from './components/Layouts/Basic';
import Home from './components/Screens/Home';
import  Dashboard  from './components/Screens/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, compose(applyMiddleware(thunk), reduxDevTools));
if(localStorage.getItem('user')){
  store.dispatch({type:'LOGIN_SUCCEEDED',payload:JSON.parse(localStorage.getItem('user'))})
}
const App = props => {
  
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login' component={Home} />
           <PrivateRoute exact path='/' component={AppRoutes}/> 
        </Switch>
      </Router>
    </Provider>
  );
}

const AppRoutes=props=>(
  <BasicLayout>
   <Switch>
      <Route path='/' component={Dashboard}/>
   </Switch>
  </BasicLayout>
)

export default App;
