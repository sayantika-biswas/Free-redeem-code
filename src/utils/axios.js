// src/axios.js
import axios from "axios";

const instance = axios.create({
   baseURL: "http://localhost:5300/api", // replace with your actual API base URL
  // baseURL: "https://api.freeredeemcodedaily.com/api/",
  withCredentials: true, // if you're using cookies
});


instance.interceptors.request.use((config) => {

    const guestId = localStorage.getItem("guestId");
  if (guestId) {
    config.headers["x-guest-id"] = guestId;
  }


  const token = localStorage.getItem("token"); // or wherever you store it
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}); 


export default instance;
