import React, { Component } from 'react';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './Reducers';

import {Route,Switch} from 'react-router';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware, ConnectedRouter} from 'react-router-redux';

import Home from './Pages/Home';
import DetailPage from './Pages/DetailPage';

import './App.css';


const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose; // used for debugging purposes
const history = createHistory(); 
const store = createStore(
  reducers,   
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  ); // create the redux store with the necessary enhancers

/** 
 * Top Level Container for the app
 * In charge of managing routing and redux storage
*/
class App extends Component {
  render() {
    return (      
      <Provider store={store}>  
        <ConnectedRouter history={history}>
          <Switch> 
            <Route name="home" exact path="/" component={Home}/>                 
            <Route name="details" path="/details/:type/:index/:year/:month/:day/:dir" component={DetailPage}/>              
          </Switch>
        </ConnectedRouter>      
      </Provider>            
    );
  }
}

export default App;
