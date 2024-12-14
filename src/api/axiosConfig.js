import axios from 'axios';

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Change this to your local backend URL
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  },
});

export default axiosInstance;
