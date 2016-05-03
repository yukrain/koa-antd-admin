import { createStore,compose,applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { persistState } from 'redux-devtools';
import DevTools from './DevTools';

const enhancer = compose(
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

export default function configureStore(initialState) {

    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
