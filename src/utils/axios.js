import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://makodede.com",
});

export default axiosInstance;
