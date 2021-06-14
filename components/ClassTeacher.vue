
<!-- 班课页面，对应我创建的，面向教师，绝大部分与class相同，改完class后复制一样的就行 -->
<template>
  <div>
    <mt-header style="-webkit-transform: translateZ(0)" slot="header" color="white" class="primary_bg" :fixed="true">
      <router-link to="/class" slot="left">
        <font size = "4" color = "black">我加入的&nbsp;&nbsp;&nbsp;&nbsp;</font> 
      </router-link>
      <router-link to="/classteacher" slot="left">
        <font size="4" color="white">&nbsp;我创建的</font>
      </router-link>
      <mt-button @click.native="sheetVisible = true" size="large" slot="right">
        <font size="6" color="black">+</font>
      </mt-button>
    </mt-header> 
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <section>
    <div class="order_content has-header" style="margin-top: 50px;">
      <mt-search style="height: 50px;" v-model="searchValue" placeholder="搜索我创建的班课"></mt-search>
      <div style="margin-top:10px;background:white" v-for="(item,index) in list" :key="index">
        <OrderItemTeacher :value="item" />
      </div>
    </div>
    </section>
    <!-- <div class="infoDiv" v-for="item in classInfo" :key="item.id">
      <router-link :to="{path:'/classteacherdetail',query:{classes_id:item.classesId}}" slot="left">
        <mt-cell title="课程名">{{item.classesName}}</mt-cell>
        <mt-cell title="学校">{{item.school}}</mt-cell>
        <mt-cell title="专业">{{item.department}}</mt-cell>
      </router-link>
    </div> -->

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
export default {
	components: {
	  OrderItemTeacher: r => { require.ensure([], () => r(require('./component/OrderItemTeacher'))), "OrderItemTeacher" }
	},
  data() {
    return {
    searchValue: '',
		list: [
		  {
		    title: "工程实践",
		    img: require('../assets/img/order/1.jpeg'),
		    color: "rgb(255, 151, 0)"
		  }, {
		    title: "高级计算机视觉",
		    img: require('../assets/img/order/2.jpeg'),
		    color: "rgb(245, 120, 93)"
		  }, {
		    title: "模式识别",
		    img: require('../assets/img/order/3.png'),
		    color: "rgb(27, 169, 225)"
		  }, {
		    title: "软件体系结构",
		    img: require('../assets/img/order/4.png'),
		    color: "rgb(245, 120, 93)"
		  }, {
		    title: "高级机器学习",
		    img: require('../assets/img/order/5.png'),
		    color: "rgb(245, 120, 93)"
		  }
    ],
      classInfo: [],
      sheetVisible: false,
      actions: [],
      selected: ""
    };
  },
  // activated() {
  //   this.getClassInfo();
  // },
  methods: {
    create() {
      this.$router.push("/create");
    },

    join() {
      this.$router.push("/join");
    },
     scan(){
      this.$router.push("/scan")
    },
  },

  mounted() {
    this.actions = [
      {
        name: "创建班课",
        method: this.create
      },
      {
        name: "使用班课号加入班课",
        method: this.join
      },
      {
        name: "扫一扫加入班课",
        method: this.scan
      }
    ];
  }
};
</script>

<style>
.infoDiv {
  margin-top: 1%;
  /* margin-left: 5%; */
  /* margin-right: 10%; */
  border: 1px solid #96c2f1;
  background: #eff7ff;
}
</style>