<template>
  <div class="mineCom">
    <mt-header
      style="-webkit-transform: translateZ(0)"
      slot="header"
      class="primary_bg"
      title="班课详情"
      :fixed="true"
    >
      <router-link to="/class" slot="left">
        <mt-button icon="back">班课</mt-button>
      </router-link>
    </mt-header>
    <br /><br />
    <div slot="content">
      <section class="content has-header">
        <div class="content-tabs">
          <div>
            <h3>1</h3>
            <span>班级排名</span>
          </div>
          <div>
            <h3>0</h3>
            <span>经验值</span>
          </div>
          <div>
            <h3>1</h3>
            <span>班级人数</span>
          </div>
        </div>
      </section>
    </div>
    <div style="margin-top: 50px">
      <router-link
        :to="{ path: '/signed', query: { classes_id: this.classes_id } }"
        slot="left"
      >
        <mt-button style="margin-bottom: 10px; width: 150px" type="primary"
          >进行签到</mt-button
        >
      </router-link>
      <router-link
        :to="{ path: '/code', query: { classes_id: this.classes_id } }"
        slot="right"
      >
        <mt-button
          style="
            margin-bottom: 10px;
            width: 150px;
            background-color: #ffd700;
            color: white;
            float: right;
          "
          >班级二维码</mt-button
        >
      </router-link>
      <!-- 后台传该生该班课的经验值  -->
      <!-- <mt-cell title="当前获得经验值为" :value="experience"></mt-cell> -->
      <!-- 后台传该班课所有人数  -->
      <!-- <mt-cell title="班课ID" :value="classes_id"></mt-cell> -->

      <mt-cell title="成员列表">{{ studentList.length }} 人</mt-cell>
      <!-- 后台传该班课所有人经验与姓名(按经验值倒序排好序再传过来)，通过班课号来搜班课表里数据  -->
      <div slot="content" class="order_content has-header">
        <div
          style="margin-top: 10px; background: white"
          v-for="(item, index) in studentList"
          :key="index"
        >
          <StudentSItem :value="item" :index="index" />
        </div>
      </div>
      <!-- 		<mt-cell
		  v-for="(item,index) in studentList"
		  :key="index"
		  :title="index+1 +'  ' + item.name"
		/> -->
    </div>
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
import moment from "moment";
export default {
  components: {
    StudentSItem: (r) => {
      require.ensure([], () => r(require("./component/StudentSItem.vue"))),
        "StudentSItem";
    },
  },
  data() {
    return {
      classes_id: "1234",
      studentList: [
        { name: "马", studentId: 190327087 },
        { name: "谢", studentId: 190327087 },
        { name: "吴", studentId: 190327087 },
      ],
    };
  },
  // activated() {
  //   this.getClassInfo();
  // },
  methods: {
    selected() {},
  },
};
</script>

<style scoped lang="scss">
.mineCom {
  .content-list {
    .mint-cell-value {
      span {
        font-size: 13px;
      }
    }
  }
  .content {
    .content-tabs {
      // align-items: center;
      // min-height: $hei;
      display: flex;
      background-color: white;
      div {
        padding: 12px 0px;
        text-align: center; // display: flex;
        // align-items: center;
        // height: $hei;
        text-align: center;
        border-right: 1px solid rgb(229, 229, 229);
        flex: 1;
        h3 {
          font-size: 20px;
          color: rgb(244, 180, 21);
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .header {
      min-height: 80px;
      width: 100%;
      display: flex;
      align-items: center;
      .left {
        flex: 0.5;
        text-align: left;
        img {
          width: 50px;
          height: 50px;
          margin-left: 20px;
          margin-top: 40px;
          border-radius: 50%;
        }
      }
      .title {
        flex: 1;
        color: white;
      }
      .right {
        flex: 0.5;
        text-align: right;
        img {
          width: 16px;
          margin-right: 20px;
        }
      }
    }
  }
  .infoDiv {
    margin-top: 10%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 10%;
    border: 1px solid #96c2f1;
    background: #eff7ff;
    border-radius: 5px;
  }
  .UserInfoContainer {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .scroll-content {
    z-index: 0; // -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; // z-index: 1;
    display: block;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    will-change: scroll-position;
    contain: size style layout;
  }
}
</style>
