import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import App from './components/app';
// import reducer from './reducers'
// import saga from './sagas'
import initNavlist from './config.json'


const history = createHistory()

console.log(initNavlist)
// let sagaMiddleware = createSagaMiddleware()
let store = createStore(combineReducers({ navlist: (state = [], action) => state, router: routerReducer }), { navlist: initNavlist }, applyMiddleware(routerMiddleware(history)));
// let store = createStore(reducer, { navlist: initNavlist });
// sagaMiddleware.run(saga)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)