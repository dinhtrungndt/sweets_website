import axios from "axios";

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
     baseURL: "https://sweets-nodejs.onrender.com/",
  //  baseURL: "http://192.168.1.73:3001/",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        // Authorization: `Bearer ${""}`,
        Accept: "application/json",
        "Content-Type": contentType,
      };
      return config;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
  );
  return axiosInstance;
};

export default AxiosInstance;
