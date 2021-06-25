<template>
  <div class="mineCom">
    <mt-header
      style="-webkit-transform: translateZ(0)"
      slot="header"
      class="primary_bg"
      title="活动"
      color="black"
      :fixed="true">
      <router-link to="/classteacher" slot="left">
        <mt-button icon="back">我创建的</mt-button>
      </router-link>
    </mt-header>
    <br />
    <br />
    <div>
      <mt-cell title="第一周项目活动" label="已结束" is-link>
        <font style="color: green" size="3">10经验</font>
      </mt-cell>
      <mt-cell title="第二周项目活动" label="已结束" is-link>
        <font style="color: green" size="3">15经验</font>
      </mt-cell>
      <mt-cell title="第三周项目活动" label="已超时" is-link>
        <font style="color: red" size="3">5经验</font>
      </mt-cell>
      <mt-cell title="第四周项目活动" label="已超时" is-link>
        <font style="color: red" size="3">7经验</font>
      </mt-cell>
      <mt-cell title="第五周项目活动" label="已超时" is-link>
        <font style="color: red" size="3">20经验</font>
      </mt-cell>
      <mt-cell title="第六周项目活动" label="已超时" is-link>
        <font style="color: red" size="3">10经验</font>
      </mt-cell>
      <mt-cell title="第七周项目活动" label="正在进行" is-link>
        <font size="3"></font>
      </mt-cell>
    </div>

    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="成员">
        <img slot="icon" src="../assets/chengyuan.png" />
        <router-link :to="`/classteacherdetail/${this.$route.params.courseId}`">
          <font size="3">成员</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="活动">
        <img slot="icon" src="../assets/huodong.png" />
        <router-link :to="`/addedactivity/${this.$route.params.courseId}`">
          <font size="3">添加活动</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="详情">
        <img slot="icon" src="../assets/xiaoxi.png" />
        <router-link :to="`/informationteacher/${this.$route.params.courseId}`">
          <font size="3">详情</font>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Cell } from "mint-ui";
import Cookies from "js-cookie";
import Axios from "axios";
import moment from "moment";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      selected: "",
    };
  },
};
</script>

<style scoped lang="scss"></style>
