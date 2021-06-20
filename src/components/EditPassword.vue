<template>
  <div>
    <mt-header title="个人信息" :fixed="true">
      <router-link to="/userinfo" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <br />
    <br />
    <div class="infoDiv">
      <mt-field
        label="旧密码"
        placeholder="请输入当前密码"
        type="password"
        v-model="editForm.prepassword"
      ></mt-field>
      <mt-field
        label="新密码"
        placeholder="请输入修改后的密码"
        type="password"
        v-model="editForm.password1"
      ></mt-field>
      <mt-field
        label="确认新密码"
        placeholder="请再次输入修改后的密码"
        type="password"
        v-model="editForm.password2"
      ></mt-field>
    </div>
    <mt-button type="primary" @click.native="editPassword" size="large"
      >确定</mt-button
    >
  </div>
</template>

<script>
import { Cell } from "mint-ui";
import moment from "moment";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      editForm: {
        prepassword: "",
        password1: "",
        password2: "",
      },
    };
  },
  methods: {
    editPassword() {
      this.edit();
    },
    async edit() {
      this.password1 = "";
      this.$router.push("/userinfo");
    },
  },
};
</script>

<style>
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
