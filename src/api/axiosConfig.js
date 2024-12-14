import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ddrug-interaction-eb3a91a13ab1.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
