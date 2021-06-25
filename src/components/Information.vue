<template>
  <div class="mineCom">
    <mt-header
      style="-webkit-transform: translateZ(0)"
      slot="header"
      class="primary_bg"
      title="班课详情"
      :fixed="true">
      <router-link to="/class" slot="left">
        <mt-button icon="back">我加入的</mt-button>
      </router-link>
    </mt-header>
    <br />
    <br />
    <section class="information">
      <div class="row" style="min-height: 60px">
        <div class="shop_header">
          <img src="..\assets\bankeye.png" alt="">
          <div>
					<span class="fn-14" >工程实践</span>
            <br><br>
					<span class="fn-8">谢晗</span>
            <br>
            <span class="fn-8">2020-2021-2</span>           
          </div>
        </div>
      </div>         
    </section>
    <br>
    <mt-cell title="允许加入">已允许</mt-cell>
    <mt-cell title="班课二维码" :to="`/codetoinfo1/${this.$route.params.courseId}`" is-link></mt-cell>
    <mt-cell></mt-cell>
    <mt-cell title="云教材" label="未设置"></mt-cell>
    <br>
    <mt-cell title="学习要求" label="暂无内容"></mt-cell>
    <br>
    <mt-cell title="教学进度" label="暂无内容"></mt-cell>
    <br>
    <mt-cell title="考试安排" label="暂无内容"></mt-cell>
    <br>
    <br>
    <br>
    <mt-button size="large" type="default" @click="quit">
      <span style="color: red"> 退出班课</span>
      </mt-button>
    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="成员详情">
        <img slot="icon" src="../assets/chengyuan.png" />
        <router-link :to="`/classdetail/${this.$route.params.courseId}`">
          <font size="3">成员</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="活动详情">
        <img slot="icon" src="../assets/huodong.png" />
        <router-link :to="`/activity/${this.$route.params.courseId}`">
          <font size="3">活动</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="班课详情">
        <img slot="icon" src="../assets/xiaoxi.png" />
        <router-link :to="`/information/${this.$route.params.courseId}`">
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
  methods: {
    quit() {
      MessageBox.confirm('',{
        title: '',
        message: '是否退出此班课？',
        confirmButtonText: '退出',
        cancelButtonText: '不退出',
      }).then(action => {
        this.$router.push("/class");
        }).catch(error => {})
    }
  },
};
</script>

<style lang="scss">
.information {
  min-height: 60px;
  .row {
    /* margin-top: 90px; */
    align-items: center;
    min-height: 20px;
    display: flex;
    justify-content: space-between; // border-bottom: .5px solid #e5e5e5;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.11);
    .shop_header {
      display: flex;
      align-items: center;
      .shop_text {
        width: calc(100% - 130px);
        h2 {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis; // overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          img {
            height: 10px;
            width: 15px; // top: -5px;
            margin: 5px;
          }
        }
      }
      img {
        height: 82px;
        margin: 10px;
      }
    }
    .fn-c-memo-light {
      font-size: 0.9rem;
      font-weight: 300;
    }
    .fn-13 {
      font-size: 0.8rem;
      font-weight: 320;
    }
    .fn-15 {
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
    }
    .order_state {
      flex: 0.6; // flex: 0 0 100px;
      display: flex;
      align-items: center;
    }
  }
}
</style>