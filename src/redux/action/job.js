import axios from '../../axios';
import { ADD_JOBS, GET_JOBS, REMOVE_JOB, UPDATE_JOBS } from '../types';
import { setAlert } from './alert';


export const getJobs = () => async (dispatch) => {
    try {
        const res = await axios.get("/v1/job/all");
        if (res.data.code === 1) {
            dispatch({type: GET_JOBS, payload: res.data.data});
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const createJob = (formData) => async (dispatch) => {
    try {
        const res = await axios.post("/v1/job/add", formData);
        if (res.data.code === 1) {
            dispatch({type: ADD_JOBS, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const updateJob = (formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/v1/job/update`, formData);
        if (res.data.code === 1) {
            dispatch({type: UPDATE_JOBS, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const removeJob = (id) => async (dispatch) => {
    try {
        const res = await axios.post(`/v1/job/delete/${id}`);
        if (res.data.code === 1) {
            dispatch({type: REMOVE_JOB, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};
