import AxiosInstance from "../../helper/AxiosInstance";

export const getUserByID = async (id) => {
  try {
    const response = await AxiosInstance().get(`/users/get-user/${id}`);
    return response.user;
  } catch (error) {
    console.log("register: ", error);
    return error;
  }
};
