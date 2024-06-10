import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
} from "../types";

import { isLogin, getLoginData } from "../../utils/auth";

const initialState = {
  login: isLogin() ? true : false,
  // user: isLogin() ? getLoginData().user : null,
  access_token: isLogin() ? getLoginData().access_token : null,
  refresh_token: isLogin() ? getLoginData().refresh_token : null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN:
      const {access_token, refresh_token} = payload;
      return {
        ...state,
        access_token,
        refresh_token,
        login: true,
        error: null,
      };

    case AUTH_LOGOUT:
      return { ...state, login: false, access_token: null, refresh_token: null, error: null };

    case AUTH_ERROR:
      return { ...state, login: false, error: payload };

    default:
      return state;
  }
}
