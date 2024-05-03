import axios from "axios";

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    // baseURL: "https://api.dinhtrungndt.id.vn/",
    baseURL: "https://api.dinhtrungndt.id.vn/",
    // baseURL: "http://192.168.2.209:3001/",
    // baseURL: "http://192.168.0.102:3001/",
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
