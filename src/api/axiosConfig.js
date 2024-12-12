// src/api/axiosConfig.js

import axios from 'axios';

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const axiosInstance = axios.create({
  baseURL: 'https://ddi-backend.onrender.com/api',  // Ensure this is your backend API URL with /api
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  },
});

export default axiosInstance;
