import service from "./api";


export const login = (params) => {
  return serviceAxios({
    url: "/registration/login",
    method: "post",
    params,
  });
};