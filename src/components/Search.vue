<template>
  <div class="mineCom">
    <mt-header
      style="-webkit-transform: translateZ(0)"
      slot="header"
      class="primary_bg"
      title="发现"
      color="black"
      :fixed="true"
    >
    </mt-header>
    <br />
    <br />
    <mt-cell title="课程圈" is-link>
      <img slot="icon" src="../assets/faxian.png" width="24" height="24" />
    </mt-cell>
    <mt-cell title="云教材" is-link>
      <img slot="icon" src="../assets/banke.png" width="24" height="24" />
    </mt-cell>
    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="班课">
        <img slot="icon" src="../assets/banke.png" />
        <router-link to="/class">
          <font size="3">班课</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="../assets/faxian.png" />
        <router-link to="/search">
          <font size="3">发现</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/wode.png" />
        <router-link to="/userinfo">
          <font size="3">我的</font>
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
