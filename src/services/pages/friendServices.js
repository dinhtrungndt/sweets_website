import AxiosInstance from "../../helper/AxiosInstance";

// lấy danh sách bạn bè theo idUsers
export const getFriendByIdUsers = async (idUsers) => {
  try {
    const res = await AxiosInstance().get(`/friend/friends/${idUsers}`);
    // console.log("get post >>>>>>>>>>>>>>> Service getFriendByIdUsers 8 ", res);
    return res;
  } catch (error) {
    console.error(" >>>>>>>>> Error getFriendByIdUsers: 11 s", error);
    throw error;
  }
};
