import axios from "axios";
// import { Message } from 'element-ui'
// import store from '@/store'

const service = axios.create({
  baseURL: "http://106.15.176.97:8080/", // url = base url + request url
  timeout: 5000,
  withCredentials: false,
});

service.interceptors.request.use(
  (config) => {
    let token = window.localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status == 403) {
      //   Message.error('您无权访问当前页面')
      this.$router.replace({
        path: "/login",
      });
    }
    console.log("11111", response);
    return response;
  },
  (error) => {
    console.log("err" + error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          //   Message.error('您未登录或登录已过期，请登录后重试')
          //   this.$store.commit('token/REMOVE_TOKEN')
          localStorage.setItem("token", res.data.obj.token);
      }
      return Promise.reject(error);
    }
  }
);

export default service;
