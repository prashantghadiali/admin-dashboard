import axios from '../../axios';
import { ADD_CLIENTS, GET_CLIENTS, REMOVE_CLIENT, UPDATE_CLIENTS } from '../types';
import { setAlert } from './alert';


export const getClients = () => async (dispatch) => {
    try {
        const res = await axios.get("/v1/client/all");
        console.log("clients data",res.data);
        if (res.data.code === 1) {
            dispatch({type: GET_CLIENTS, payload: res.data.data});
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const createClient = (formData) => async (dispatch) => {
    try {
      const res = await axios.post("/v1/client/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("form data :", formData);
      
      if (res.data.code === 1) {
        dispatch({ type: ADD_CLIENTS, payload: res.data.data });
        dispatch(setAlert(res.data.message, 'success'));
      } else {
        dispatch(setAlert(res.data.message, "warning"));
      }
    } catch (err) {
      dispatch(setAlert(err.message, "danger"));
    }
  };

export const updateClient = (formData) => async (dispatch) => {
    try {
        const res = await axios.post(`/v1/client/update`, formData);
        console.log("update req. data :", formData);
        if (res.data.code === 1) {
            dispatch({type: UPDATE_CLIENTS, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};

export const removeClient = (id) => async (dispatch) => {
    try {
        const res = await axios.post(`/v1/client/delete/${id}`);
        if (res.data.code === 1) {
            dispatch({type: REMOVE_CLIENT, payload: res.data.data});
            dispatch(setAlert(res.data.message, 'success'));
        } else {
            dispatch(setAlert(res.data.message, "warning"));
        }
    } catch (err) {
        dispatch(setAlert(err.message, "danger"));
    }
};
