import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { GLOBAL } from '../Global/global';
import thunk from 'redux-thunk';

const loggerMiddleware = createLogger();
let nodeENV = GLOBAL.REACT_APP_NODE_ENV;

let middleware = [
    thunk
];

if (nodeENV !== 'production') {
    middleware = [...middleware, loggerMiddleware];
}

const composeEnhancers = (nodeENV !== 'production') ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware);

export const store = createStore(
    rootReducer,
    composeEnhancers
);



// import {createStore, applyMiddleware} from 'redux';
// import {createLogger} from 'redux-logger';
// import rootReducer from "./reducer";
// import {composeWithDevTools} from "@redux-devtools/extension";
// import {GLOBAL} from "../Global/global";
// import {thunk} from "redux-thunk";


// const loggerMiddleware = createLogger();
// let nodeENV = GLOBAL.REACT_APP_NODE_ENV

// let middleware = [
//     thunk
// ];

// if (nodeENV !== 'production') {
//     middleware = [...middleware, loggerMiddleware];
// }

// const composeEnhancers = (nodeENV !== 'production') ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware);

// export const store = createStore(
//     rootReducer,
//     composeEnhancers
// );