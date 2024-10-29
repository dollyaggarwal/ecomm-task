// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set this to your backend URL in the .env.local file
  withCredentials: true, // To send cookies with the request
});

export default api;
