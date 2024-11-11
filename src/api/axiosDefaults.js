import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-backend-11522e18c941.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; // images and more
axios.defaults.withCredentials = true; // required for cookies

export const axiosReq = axios.create(); // requests
export const axiosRes = axios.create(); // responses