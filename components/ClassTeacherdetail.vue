<template>
  <div>
    <mt-header title="班课详情">
      <router-link to="/class" slot="left">
        <mt-button icon="back">班课</mt-button>
      </router-link>
    </mt-header>
    <router-link :to="{path:'/signedteacher',query:{classes_id:this.classes_id}}" slot="left">
      <mt-button>发起签到</mt-button>
    </router-link>
    <router-link :to="{path:'/code',query:{classes_id:this.classes_id}}" slot="right">
      <mt-button>班级二维码</mt-button>
    </router-link>
    <!-- 后台传该生该班课的经验值  -->
    <!-- <mt-cell title="当前获得经验值为" :value="experience"></mt-cell> -->
    <!-- 后台传该班课所有人数  -->
    <mt-cell title="班课人数" :value="studentList.length"></mt-cell>
    <mt-cell title="班课ID" :value="classes_id"></mt-cell>
    <mt-cell title="成员列表"></mt-cell>
    <!-- 后台传该班课所有人经验与姓名(按经验值倒序排好序再传过来)，通过班课号来搜班课表里数据  -->
    <mt-cell
      v-for="(item,index) in studentList"
      :key="index"
      :title="index+1 +'  ' + item.name"
    />
        <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="成员">
        <img slot="icon" src="../assets/chengyuan.png" />
        <router-link to="/classteacherdetail">
        <font size="3">成员</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="添加活动">
        <img slot="icon" src="../assets/huodong.png" />
        <router-link to="/activity">
        <font size="3">添加活动</font>
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
export default {
  data() {
    return {
      classes_id: "",
      studentList: []
    };
  },
  // activated() {
  //   this.getClassInfo();
  // },
  methods: {
  }
};
</script>

<style>
</style>