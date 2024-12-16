import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || "https://ddrug-intteraction-e80de02fc9c1.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL,  // Use baseURL directly
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
