import request from "@/util/request";

export function joinCourse(data) {
  return request({
    url: "/course/picByCourseCode",
    method: "post",
    data,
  });
}

export function createCourse(data) {
  return request({
    url: "/course/",
    method: "post",
    data,
  });
}

export function getJoinedCourse(data) {
  return request({
    url: `/course/${data}`,
    method: "get",
  });
}

export function getCourseByCode(data) {
  return request({
    url: `/course/getByCourseCode/${data}`,
    method: "post",
  });
}

export function getCreatedCourse(data) {
  return request({
    url: `/course/createby/${data}`,
    method: "get",
  });
}


