import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "makodede.vercel.app",
});

export default axiosInstance;
