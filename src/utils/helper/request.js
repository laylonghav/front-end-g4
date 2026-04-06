import axios from "axios";
import { store } from "@/store/store";
import { configs } from "../config/configs";

export const request = async (url = "", method = "get", data = {}) => {
  const token = store.getState().token.token;
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  return await axios({
    url: configs.base_url + url,
    method: method,
    data: data,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      console.log("Respone data : ", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      const responeError = error?.response;
      console.log("Response error: ", responeError);
      if (responeError) {
        const status = responeError?.status;
        if (status === 500) {
          console.log("Error external");
        }
      }
      const errors = responeError?.data?.errors;
      return {
        error: true,
        errors: errors,
      };
    });
};
