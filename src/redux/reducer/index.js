import {combineReducers} from "redux";
import alert from './alert';
import faqs from "./faq";
import jobs from "./job";


const appReducer = combineReducers({
    alert,
    faqs,
    jobs
})

const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;