/**
 * Created by YUK on 16/3/31.
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AppView from '../views/App'
import AboutView from '../views/About'
import HomeView from '../views/Home'
import TableView from '../views/Table'




export default function routes(store) {
    const validate = function (nextState, replaceState, callback) {
        // 需要做权限控制的时候开启
        // const isLoggedIn = !!store.getState().auth.authenticated
        // if (!isLoggedIn) {
        //   replaceState(null, '/login')
        // }
        console.log( store.getState() )
        console.log( nextState )
        callback()
    }

    const logout = function(){
        console.log('logout')
    }


    return (
        <Route>
            <Route path="/" component={AppView} onEnter={validate}>
                <IndexRoute component={HomeView}/>
                <Route path="about" component={AboutView}  />
                <Route path="inbox" component={HomeView} />
                <Route path="table" component={TableView} />
                <Route path="logout" onEnter={logout} />
            </Route>
        </Route>
    );
}