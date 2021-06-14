<template>
  <div>
    <mt-header title="发起签到">
      <router-link to="/classteacherdetail" slot="left">
        <mt-button icon="back">班课详情</mt-button>
      </router-link>
    </mt-header>
    <mt-field label="签到限时：" placeholder="请输入限制时间" v-model="signInfo.time"></mt-field>
    <mt-button type="primary" @click="sign">发起签到</mt-button>
    <mt-cell title="当前经度：">{{this.signInfo.longitude}}°</mt-cell>
    <mt-cell title="当前纬度：">{{this.signInfo.latitude}}°</mt-cell>
    <mt-cell title="历史签到记录"></mt-cell>
    <mt-cell
      v-for="(item,index) in list"
      :key="index"
      :title="index+1 +'  ' + item.userName"
      :value="'签到时间 ' + dateFormat(item.signTime)"
    />
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      list: [],
      signInfo: {
        time: ""
      }
    };
  },
  activated() {
  },
  methods: {

      }
};
</script>

<style>
</style>