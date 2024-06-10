import {combineReducers} from "redux";
import alert from './alert';


const appReducer = combineReducers({
    alert
})

const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer;