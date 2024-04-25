import AxiosInstance from "../../helper/AxiosInstance";

export const GetMessageSR = async (idSender, idReceiver) => {
  try {
    const res = await AxiosInstance().get(
      `/message/get-message/list/${idSender}/${idReceiver}`
    );
    return res;
  } catch (error) {
    console.log("getListUser error", error);
    return error;
  }
};
