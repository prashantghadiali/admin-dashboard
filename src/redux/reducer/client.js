import { ADD_CLIENTS, GET_CLIENTS, REMOVE_CLIENT, UPDATE_CLIENTS,  } from "../types";

const initialState = { list: [], single: null };

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CLIENTS:
            return { ...state, list: payload };

        case ADD_CLIENTS:
            return {
                ...state,
                list: [payload, ...state.list],
            };

        case UPDATE_CLIENTS:
            return {
                ...state,
                list: state.list.map((item) =>
                    item.id === payload.id ? payload : item
                ),
            };

        case REMOVE_CLIENT:
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