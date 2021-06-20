import request from "@/util/request";

export function getUserInfo() {
  return request({
    url: "/user/info",
    method: "get",
  });
}
