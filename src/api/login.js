import request from "@/util/request";

export function userLogin(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function userLoginByCode(data) {
  return request({
    url: "/loginbycode",
    method: "post",
    data,
  });
}

export function thirdLogin(params) {
  return request({
    url: "/callback",
    method: "post",
    params,
  });
}
