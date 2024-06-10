import axios from "axios";
import {GLOBAL} from "./Global/global";

const baseURL = GLOBAL.REACT_APP_API_URL

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (["admin/login"].includes(config.url)) {
            config.headers["x-access-token"] = "essential";
        } else if (["refresh/access"].includes(config.url)) {
            config.headers["x-access-token"] = "refresh";
        } else {
            const accessToken = JSON.parse(localStorage.getItem('auth'))?.access_token;
            if (accessToken) {
                // config.headers['Authorization'] = `Bearer ${accessToken}`;
                config.headers["x-access-token"] = accessToken;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If refresh token is expired, log the user out
        if (
            error.response.status === 401 &&
            originalRequest.url === `refresh/access`
        ) {
            localStorage.removeItem("auth");
            window.location.reload();
            return Promise.reject(error);
        }

        // Access Token was expired
        console.log({LL: originalRequest.url});
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== `admin/login`
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = JSON.parse(localStorage.getItem('auth'))?.refresh_token;
                const res = await axiosInstance.post(`refresh/access`, {
                    token: refreshToken,
                });

                let auth = JSON.parse(localStorage.getItem('auth'));
                auth = {...auth, access_token: res.data.access_token};
                localStorage.setItem("auth", JSON.stringify(auth));
                axiosInstance.defaults.headers.common["x-access-token"] = res.data.access_token;

                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
