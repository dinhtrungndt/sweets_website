import AxiosInstance from "../../helper/AxiosInstance";
export const CreateDevice = async (device) => {
  const body = {
    deviceid: device,
  };
  try {
    const response = await AxiosInstance().post(
      "loginQRCode/add-loginQRCode",
      body
    );
    return response;
  } catch (error) {
    console.log("CreateDevice: ", error);
    return error;
  }
};
export const getDevice = async () => {
  try {
    const response = await AxiosInstance().get("loginQRCode/get-loginQRCode");
    return response;
  } catch (error) {
    console.log("getDevice: ", error);
    return error;
  }
};
export const UpdateDevice = async (iduser, deviceid) => {
  const body = {
    iduser: iduser,
    deviceid: deviceid,
  };
  try {
    const response = await AxiosInstance().put(
      "loginQRCode/update-loginQRCode",
      body
    );
    // console.log('>>>>>>>>>> axios iduser : ', iduser);
    // console.log('>>>>>>>>>> axios deviceid : ', deviceid);
    return response;
  } catch (error) {
    console.log("UpdateDevice: ", error);
    return error;
  }
};
