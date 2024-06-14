import axios from "../../axios";
// import axios from "axios";
import {
    AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR
} from "../types";

import {login, logout} from "../../utils/auth";
import {setAlert} from './alert';
// import {useNavigate} from "react-router-dom";


// User Login
export const authLogin = (data, navigate) => async (dispatch) => {
    try {
        // const res = await axios.post('admin/login', data);
        const res = await axios.post('/auth/login', data);
        console.log(res);

        if (res.data.code === 1) {
            let user = { access_token: res.data.access_token, refresh_token: res.data.refresh_token };
            login(user);
            dispatch({ type: AUTH_LOGIN, payload: user });
            navigate("/dashboard"); // Use the navigate function passed from the component
            // navigate("/"); // Use the navigate function passed from the component

            setTimeout(() => {
                dispatch(setAlert('Login Success', 'success'));
            }, 100);
        } else {
            dispatch({ type: AUTH_ERROR, payload: res.data.message });
            dispatch(setAlert(res.data.message, 'warning'));
        }
    } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: err.message });
        dispatch(setAlert(err.message, 'danger'));
    }
};


// User Logout
export const authLogout = () => async (dispatch) => {
    try {
        logout();
        dispatch({type: AUTH_LOGOUT, payload: ''});
        dispatch(setAlert('Logout done', 'success'));
    } catch (err) {
        dispatch({type: AUTH_ERROR, payload: err.message});
        dispatch(setAlert(err.message, 'danger'));
    }
};


