import { ADD_FAQ, GET_FAQ, GET_FAQS, UPDATE_FAQ } from "../types";

const initialState = { list: [], single: null };

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_FAQS:
            return { ...state, list: payload };

        case ADD_FAQ:
            return {
                ...state,
                list: [payload, ...state.list],
            };

        case UPDATE_FAQ:
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
