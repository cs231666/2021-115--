<template>
  <div>
    <mt-header title="我的"></mt-header>
    <mt-tabbar fixed>
      <mt-tab-item id="班课">
        <img slot="icon" src="../assets/cangku.png" />
        <router-link to="/class">班课</router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/yonghu.png" />
        <router-link to="/userinfo">我的</router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script
  type="text/javascript"
  src="http://api.map.baidu.com/api?v=2.0&ak=zGlA3g9mzyYBtg83gRRzlbPXCd1ryDdh"
></script>
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
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style scoped>
.infoDiv {
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10%;
  border: 1px solid #96c2f1;
  background: #eff7ff;
  border-radius: 5px;
}
</style>
