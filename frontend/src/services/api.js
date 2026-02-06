import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-1-as8i.onrender.com/api",
});

export default api;
