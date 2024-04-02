import AxiosInstance from "../../helper/AxiosInstance";
export const CreateDevice = async (device) => {
  try {
    const response = await AxiosInstance().post('loginQRCode/add-loginQRCode', device);
    return response;
  } catch (error) {
    console.log('CreateDevice: ', error);
    return error;
  }
}
export const getDevice = async () => {
  try {
    const response = await AxiosInstance().get('loginQRCode/get-loginQRCode');
    return response;
  } catch (error) {
    console.log('getDevice: ', error);
    return error;
  }
}