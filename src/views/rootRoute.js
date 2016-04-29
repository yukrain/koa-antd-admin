import AppView from './App';
//默认显示帮助文档
import Dashboard from './Dashboard';



export default function rootRoute(store) {
    return {
        path: '/',
        component: AppView,
        indexRoute: {component: Dashboard},
        childRoutes: [
            require('./Help'),
            require('./About')
        ],
        onEnter: function (nextState, replaceState, callback) {
            // 需要做权限控制的时候开启
            // const isLoggedIn = !!store.getState().auth.authenticated
            // if (!isLoggedIn) {
            //   replaceState(null, '/login')
            // }
            //console.log('enter');
            //console.log( store.getState() )
            //console.log( nextState )
            callback()
        }
    };
}

