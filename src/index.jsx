import React from 'react'
import ReactDOM from 'react-dom'
import { Router} from 'react-router'
import { Provider } from 'react-redux'
import history from './history'

import configureStore from './store/configureStore'
const store = configureStore();
//import route from './route'

import './index.less';
import './index.css';




const target = document.getElementById('body');


import DevTools from './store/DevTools';

import rootRoute from './routers/rootRoute'

//console.log(rootRoute)
//        <Router history={history} routes={route(store)}/>



ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={rootRoute(store)}/>
    </Provider>, target)
