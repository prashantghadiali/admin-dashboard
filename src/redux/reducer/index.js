import {combineReducers} from "redux";
import alert from './alert';
import faqs from "./faq";


const appReducer = combineReducers({
    alert,
    faqs
})

const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;