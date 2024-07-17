import {combineReducers} from "redux";
import alert from './alert';
import faqs from "./faq";
import jobs from "./job";
import client from "./client"


const appReducer = combineReducers({
    alert,
    faqs,
    jobs,
    client
})

const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;