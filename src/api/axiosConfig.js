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

// Update baseURL to match your No-IP dynamic DNS hostname and API route
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Use your No-IP hostname
  withCredentials: true, // Enables cookies for CSRF
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken'),
  },
});

export default axiosInstance;
