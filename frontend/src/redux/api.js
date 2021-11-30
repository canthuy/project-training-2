import axios from "axios";

const getDeviceData = () => {
  return axios.get("http://localhost:3002/device_summary");
};

export {getDeviceData}
  