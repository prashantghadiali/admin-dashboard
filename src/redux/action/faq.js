import axios from '../../axios';
import { ADD_FAQ, GET_FAQS, UPDATE_FAQ } from '../types';
import { setAlert } from './alert';


export const getFaqs = () => async (dispatch) => {
    try {
        const res = await axios.get("/v1/faq/all");
        console.log(res.data);
        if (res.data.code === 1) {
            dispatch({type: GET_FAQS, payload: res.data.data});
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const createFaq = (formData) => async (dispatch) => {
    try {
        const res = await axios.post("/v1/faq/add", formData);
        if (res.data.code === 1) {
            dispatch({type: ADD_FAQ, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const updateFaq = (id, formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/v1/faq/update/${id}`, formData);
        if (res.data.code === 1) {
            dispatch({type: UPDATE_FAQ, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};
