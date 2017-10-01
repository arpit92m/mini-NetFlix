import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './redux/configureStore';  
import { Provider } from 'react-redux';
import {Map,fromJS} from 'immutable';
import Container from './components/Container';
import Netflix from './components/Netflix';
import './main.scss';
//Root sass file for webpack to compile

//Initialize Store

const store = configureStore();
let a =store;


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={Netflix} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))