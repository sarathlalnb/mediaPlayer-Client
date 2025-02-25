import axios from "axios";
import baseURL from "./baseURL";

const commonAPI = async (httpMethod, endpoint, requestBody) => {
  const requestConfig = {
    method: httpMethod,
    url: baseURL + endpoint,
    data: requestBody,
  };
  return await axios(requestConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonAPI
