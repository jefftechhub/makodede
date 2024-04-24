import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.makodede.com",
});

export default axiosInstance;
