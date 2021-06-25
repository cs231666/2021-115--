<template>
  <div>
    <mt-header title="班课成员" :fixed="true">
      <router-link to="/classteacher" slot="left">
        <mt-button icon="back">我创建的</mt-button>
      </router-link>
    </mt-header>
    <br><br>
    <mt-cell title="班课人数" :value="studentList.length"></mt-cell>
    <mt-cell title="班课ID" :value="classes_id"></mt-cell>
    <mt-cell title="成员列表">{{ studentList.length }} 人</mt-cell>
      <div slot="content" class="order_content has-header">
        <div
          style="margin-top: 10px; background: white"
          v-for="(item, index) in studentList"
          :key="index"
        >
          <StudentSItem :value="item" :index="index" />
        </div>
      </div>
    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="成员">
        <img slot="icon" src="../assets/chengyuan.png" />
        <router-link :to="`/classteacherdetail/${this.$route.params.courseId}`">
          <font size="3">成员</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="添加活动">
        <img slot="icon" src="../assets/huodong.png" />
        <router-link :to="`/addedactivity/${this.$route.params.courseId}`">
          <font size="3">活动</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="详情">
        <img slot="icon" src="../assets/xiaoxi.png" />
        <router-link :to="`/informationteacher/${this.$route.params.courseId}`">
          <font size="3">班课详情</font>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import {getCourseMember} from "@/api/course.js";
export default {
  components: {
    StudentSItem: (r) => {
      require.ensure([], () => r(require("./component/StudentSItem.vue"))),
        "StudentSItem";
    },
  },
  data() {
    return {
      classes_id: "",
      studentList: [],
      selected: "",
    };
  },
  computed: {
    courseId: function () {
      return this.$route.params.courseId;
    },
  },
  activated() {
    this.getClassInfo();
  },
  methods: {
    getClassInfo(){
      this.classes_id = this.$route.params.courseId;
      getCourseMember(this.$route.params.courseId).then(res => {
        this.studentList = res.data.obj;
      })
    }
  },

};
</script>

<style></style>
