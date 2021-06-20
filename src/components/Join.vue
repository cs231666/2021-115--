<template>
  <div>
    <!-- 传输班课号给后台，先通过班课号查询一次课程表，如果没有重复的后台返回‘该班课号无效’，有重复的再查询班课表，通过班课号和用户id查询是否存在数据，存在就返回‘已加入该班课，请勿重复加入’，没有的话就返回‘加入班课成功’并将信息存入班课表中，将经验置0 -->
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
  methods: {
    async getUserInfo() {
      console.log(this.$route.query.classes_id);
      // alert("班课ID:"+this.$route.query.classes_id)

      this.class_id = this.$route.query.classes_id;
    },

    async joinClass() {
      console.log(this.class_id);
      let courseInfo = {
        userId: localStorage.getItem("id"),
        courseCode: this.class_id,
      };

      console.log(courseInfo);
      joinCourse(courseInfo).then((res) => {
        if (res.data.code != 200) MessageBox("提示", res.data.msg);
        else {
          getCourseByCode(this.class_id).then((response) => {
            console.log(response);
            const className = response.data.obj.className;
            const courseName = response.data.obj.courseName;
            const org = response.data.obj.org;
            const teacher = response.data.obj.teacher;
            const term = response.data.obj.term;
            const message = `班级名称：${className}<br>课程名称：${courseName}<br>学校：${org}<br>教师：${teacher}<br>学期：${term}`;
            MessageBox({
              title: "提示",
              message: message,
              confirmButtonText: "加入",
            });
          });
        }
      });
    },
  },
};
</script>

<style></style>
