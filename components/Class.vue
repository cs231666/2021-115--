<!-- 班课页面，对应我加入的，面向学生 -->
<template>
    <div slot="content">
    <mt-header style="-webkit-transform: translateZ(0)" slot="header" color="white" class="primary_bg" :fixed="true">
      <router-link to="/class" slot="left">
        <font size = "4" color = "white">我加入的&nbsp;&nbsp;&nbsp;&nbsp;</font> 
      </router-link>
      <router-link to="/classteacher" slot="left">
        <font size="4" color="black">&nbsp;我创建的</font>
      </router-link>
      <mt-button @click.native="sheetVisible = true" size="large" slot="right">
        <font size="6" color="black">+</font>
      </mt-button>
    </mt-header> 
  <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  <section>
    <div class="order_content has-header" style="margin-top: 50px;">
      <mt-search style="height: 50px;" v-model="searchValue" placeholder="搜索我加入的班课"></mt-search>
      <div style="margin-top:10px;background:white" v-for="(item,index) in list" :key="index">
        <OrderItem :value="item" />
      </div>
    </div>
  </section>

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
var scan = null;
import Axios from "axios";
export default {
	components: {
	  OrderItem: r => { require.ensure([], () => r(require('./component/OrderItem'))), "OrderItem" }
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
      codeUrl: "",
      selected: ""
    };
  },
  // activated() {
  //   this.getClassInfo();
  // },
  methods: {
    showSearch() {
      this.$store.commit("POP_STATUS_S", true);
    },
    async getClassInfo() {
      const { data: res } = await this.$axios.get(
        "/app/class/getCurrentusertClass"
      );
      this.classInfo = res.data;
      console.log(this.classInfo);
    },
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
  //其中创建班课功能要先判断是否拥有创建班课权限，没有的话提示‘你没有创建班课权限，请联系管理员’，参照云班课里面的提示
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

<style lang='scss'>
@import '../assets/css/vars.css';
.mainHome {
  .ivu-affix {
    z-index: 2;
  }
  .mint-swipe-indicators {
    .mint-swipe-indicator {
      width: 10px;
      height: 2px;
      border-radius: 1px;
      opacity: 1;
      background: gray;
    }
    .is-active {
      background: black;
    }
  }
  font-weight: 200;
  .youhui {
    width: 100%; // background: url('static/img/common/youhui.png');
    // padding: 0px 10px;
    img {
      width: calc(100% - 20px);
      margin-left: 10px;
    }
  }
  .col_item {
    min-height: 80px;
    text-align: center;
    div {
      padding-top: 5px;
      display: flex;
      justify-content: center;
      img {
        width: 4.5rem;
        height: 4.5rem;
        display: block;
      }
    }
    span {
      text-align: center;
      color: rgb(102, 102, 102);
    }
  }
  .scrllX {
    justify-content: left !important;
    position: absolute;
    z-index: 1;
    height: 50px;
    a {
      text-align: left;
      font-family: -webkit-body;
      color: white;
      margin-right: 2rem;
    }
  }
  .search {
    position: sticky;
    top: 0px;
    ::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 0px;
      left: 0;
      background-image: linear-gradient(
        90deg,
        rgb(0, 170, 255),
        rgb(0, 133, 255)
      );
    }
  }
  .input_box {
    height: 4.5rem;
    text-align: center;
    justify-content: center;
    color: gray;
    .ipt_item {
      color: black;
      text-align: center;
      background: rgb(255, 255, 255);
      width: 100%;
      min-height: 3rem;
      height: 3rem; // line-height: 39px;
      justify-content: center;
      border-radius: 2px;
    }
  }
  .heard_card {
    height: auto;
    color: rgb(255, 255, 255);
    justify-content: space-between;
    padding-bottom: 0px;
    position: relative;
    z-index: 200;
    .index_left {
      align-items: center;
      height: 4rem;
      display: flex;
      -webkit-box-align: center;
      width: 60%;
      padding-top: 10px;
      span {
        font-weight: 600;
        margin: 0 5px;
        max-width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .index_right {
      // width: 40%;
      display: flex;
      align-items: center;
      text-align: right;
      padding-top: 10px;
      img {
        height: 28px;
        margin: 0px 5px 0px 5px;
      }
      div {
        h2,
        p {
          font-size: 1rem;
          margin: 0px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
