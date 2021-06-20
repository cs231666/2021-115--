<template>
  <div>
    <mt-header title="进行签到">
      <router-link to="/classdetail" slot="left">
        <mt-button icon="back">班课详情</mt-button>
      </router-link>
    </mt-header>
    <br />
    <!-- 需要把定位信息传给后台 -->
    <!-- 1.老师没有发起签到，传回‘老师未发起签到，请稍后再试’ 2.老师发起了签到，距离超过设定距离，‘与老师距离过远，签到失败’ ，3.老师发起了签到，距离在设定范围内,查询场次记录表没有该场次签到，存入数据库中,并将班课表中该班课对应的该生经验值加上老师设定的经验值,‘签到成功’ 4.老师发起了签到，距离在设定范围内,查询场次记录表存在该场次签到‘已成功签到，请勿重复签到’-->
    <mt-button type="primary" @click="sign">参与签到</mt-button>
    <mt-cell title="当前经度：">{{ this.signInfo.longitude }}°</mt-cell>
    <mt-cell title="当前纬度：">{{ this.signInfo.latitude }}°</mt-cell>
    <mt-cell title="历史签到记录"></mt-cell>
    <mt-cell
      v-for="(item, index) in list"
      :key="index"
      :title="index + 1 + '  ' + item.userName"
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
      signInfo: {},
    };
  },
  activated() {
    this.getPosition();
    this.getSignInfo();
    // this.getUserInfo();
    this.getHisSigned();
  },
  methods: {},
};
</script>

<style></style>
