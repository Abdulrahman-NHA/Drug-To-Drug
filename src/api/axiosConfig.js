import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://ddrug-interaction-eb3a91a13ab1.herokuapp.com';

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
