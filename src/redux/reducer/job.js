import { ADD_JOBS, GET_JOBS, REMOVE_JOB, UPDATE_JOBS } from "../types";

const initialState = { list: [], single: null };

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_JOBS:
            return { ...state, list: payload };

        case ADD_JOBS:
            return {
                ...state,
                list: [payload, ...state.list],
            };

        case UPDATE_JOBS:
            return {
                ...state,
                list: state.list.map((item) =>
                    item.id === payload.id ? payload : item
                ),
            };

        case REMOVE_JOB:
            return {
                ...state,
                list: state.list.map((item) =>
                    item.id === payload.id ? payload : item
                ),
            };


        default:
            return state;
    }
};

export default reducer;