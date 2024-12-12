import axios from "axios";

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const axiosInstance = axios.create({
  baseURL: "http://66.118.132.73:8000/api",  // Replace with your No-IP address
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;
