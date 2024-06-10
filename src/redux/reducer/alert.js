import {REMOVE_ALERT, SET_ALERT} from "../types";

const initialState = '';

const alert = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return payload;
        case REMOVE_ALERT:
            return '';
        default:
            return state;
    }
};


export default alert;

