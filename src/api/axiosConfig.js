// src/api/axiosConfig.js

import axios from 'axios';

// Utility function to get CSRF token from cookies
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  },
});

// Optional: Set up Axios interceptors to refresh CSRF token or handle errors

export default axiosInstance;
