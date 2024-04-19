import AxiosInstance from "../../helper/AxiosInstance";

export const register = async (
  name,
  email,
  password,
  gender,
  date,
  avatar,
  coverImage
) => {
  try {
    const response = await AxiosInstance().post(
      "/users/post-register",
      name,
      email,
      password,
      gender,
      date,
      avatar,
      coverImage
    );
    return response;
  } catch (error) {
    console.log("register: ", error);
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
    };
    const response = await AxiosInstance().post("/users/post-login", body);

    return response;
  } catch (error) {
    console.log("register: ", error);
    return error;
  }
};
