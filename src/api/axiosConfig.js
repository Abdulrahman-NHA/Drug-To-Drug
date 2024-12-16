import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || "https://ddrug-intteraction-e80de02fc9c1.herokuapp.com";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
