<template>
  <div>
    <!-- 如果班课号存在于课程中，需要判断课程表中的用户id是否与自己的id相同，相同返回‘你不能加入自己创建的班课’ -->
    <mt-header title="加入班课">
      <router-link to="/class" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-field
      label="班课号"
      placeholder="请输入班课号"
      type="class_id"
      v-model="class_id"
    ></mt-field>
    <mt-button type="primary" @click.native="joinClass" size="large"
      >加入班课</mt-button
    >
  </div>
</template>

<script>
import { joinCourse, getCourseByCode } from "@/api/course.js";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      class_id: "",
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  deactivated(){
    this.class_id = "";
  },
  methods: {
    async getUserInfo() {
      if (this.$route.query.classes_id) {
        this.class_id = this.$route.query.classes_id;
      }
    },

    async joinClass() {
      let courseInfo = {
        userId: localStorage.getItem("id"),
        courseCode: this.class_id,
      };
      getCourseByCode(this.class_id).then((res) => {
        console.log(res);
        if (res.data.code != 200){
          MessageBox.alert(res.data.msg,"提示").then(action => {
            this.$router.push("/class")
          });
        }
        else {
          const className = res.data.obj.className;
          const courseName = res.data.obj.courseName;
          const org = res.data.obj.org;
          const teacher = res.data.obj.teacher;
          const term = res.data.obj.term;
          const message = `班级名称：${className}<br>课程名称：${courseName}<br>学校：${org}<br>教师：${teacher}<br>学期：${term}`;
          MessageBox({
            title: "提示",
            message: message,
            confirmButtonText: "加入",
          }).then(action => {
            joinCourse(courseInfo).then(response =>{
              if(response.data.code != 200){
                MessageBox.alert(response.data.msg,"提示").then(action => {
                  this.$router.push("/class")
                });
              }
              else{
                this.$router.push("/class");
              }
            })
          })
        }
      });
    },
  },
};
</script>

<style></style>
