import request from "@/util/request";

export function getSchool() {
  return request({
    url: "/org/school",
    method: "get"
  });
}

export function getCollege(data) {
  return request({
    url: `/org/next/${data}`,
    method: "get"
  });
}