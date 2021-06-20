<template>
  <div class="mineCom">
    <mt-header
      style="-webkit-transform: translateZ(0)"
      slot="header"
      class="primary_bg"
      title="消息"
      color="black"
      :fixed="true"
    >
    </mt-header>
    <br />
    <br />
    <mt-cell title="班课通知" is-link>
      <img slot="icon" src="../assets/faxian.png" width="24" height="24" />
    </mt-cell>
    <mt-cell title="到云消息" is-link>
      <img slot="icon" src="../assets/banke.png" width="24" height="24" />
    </mt-cell>
    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="成员">
        <img slot="icon" src="../assets/chengyuan.png" />
        <router-link to="/classdetail">
          <font size="3">成员</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="活动">
        <img slot="icon" src="../assets/huodong.png" />
        <router-link to="/activity">
          <font size="3">活动</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="消息">
        <img slot="icon" src="../assets/xiaoxi.png" />
        <router-link to="/information">
          <font size="3">消息</font>
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
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
