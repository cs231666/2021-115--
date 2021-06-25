<template>
    <div>
        <mt-header title="签到中" :fixed="true">
          <!-- <router-link to="/classteacher" slot="left"> -->
          <mt-button icon="back" @click="BackToClass" slot="left">返回</mt-button>
          <!-- </router-link> -->
        </mt-header>
        <br>
        <br>
       <div class="mineCom">
            <section class="content has-header">
              <div class="content-tabs">
                <div>
                  <h3>{{signed}}</h3>
                  <span>已签到人数</span>
                </div>
                <div>
                  <h3>{{unsigned}}</h3>
                  <span>未签到人数</span>
                </div>
              </div>          
            </section>
       </div>
        <br>
        <br>
       <div class="mineCom">
            <section class="content has-header">
              <div class="content-tabs">
                <div>
                  <h2 class="red">{{ minutes }}分{{ second }}秒</h2>
                  <span style="color:red">签到倒计时</span>
                </div>
              </div>
            </section>
       </div>
    
      <mt-tabbar>
        <mt-button @click="MessageConfirm" type="default" size="large" >
          <font size="4">结束签到</font>
        </mt-button>
      </mt-tabbar>
    </div>
</template>
<script>
import{MessageBox} from 'mint-ui';
import{ hasSignIn } from "@/api/signin.js";
export default {
  data() {
    return {
      signed:0,  //已签到人数
      unsigned:0, //未签到人数
      minutes: 0, //分
      seconds: 0, //秒
    };
  },
  activated(){
    this.getTime()
  },
  methods: {
    getTime(){
      console.log(this.$route.params.minute);
      console.log(this.$route.params.second);
      this.minutes = this.$route.params.minute;
      this.seconds = this.$route.params.second
    },
    MessageConfirm() {
      MessageBox.confirm('',{
        title: '',
        message: '是否结束并完成签到？',
        confirmButtonText: '结束',
        cancelButtonText: '继续',
      }).then(action => {
          this.$router.push("/signedresult")
        }).catch(error => {})
    },
    BackToClass(){  
      hasSignIn(this.$route.params.courseId).then(res => {
        console.log(res)
        if(res.data.code == 200){
          MessageBox('提示','目前有正在进行的签到，请结束该签到后退出');
        }
        else if(res.data.code == 500){
          this.$router.push("/classteacher")
        }
      });
    },
    // 倒计时
    num(n) {
      // 倒计时结束重新刷新页面
      return n;
    },
    // 倒计时
    timer() {
      var _this = this;
      var time = window.setInterval(function () {

        if (_this.minutes === 0 && _this.seconds === 0) {
          _this.minutes = 0;
          _this.seconds = 0;
        } else if(_this.seconds === 0 && _this.minutes !== 0){
          _this.seconds = 59;
          _this.minutes -= 1;
        } else {
          _this.seconds -= 1;
        }
        if(_this.minutes === -1 && _this.seconds === 59) {
          _this.$router.push("/signedresult")
        }
      }, 1000);
    },
  },
  mounted() {
    // 倒计时
    this.timer();
  },
  watch: {
    // 倒计时
    second: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    // 倒计时
    minute: {
      handler(newVal) {
        this.num(newVal);
      },
    },
  },
  computed: {
    // 倒计时
    second: function () {
      return this.num(this.seconds);
    },
    minute: function () {
      return this.num(this.minutes);
    },
  },
};
</script>

<style scoped lang="scss">
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
      display: flex;
      background-color: white;
      div {
        padding: 12px 0px;
        text-align: center; // display: flex;
        text-align: center;
        border-right: 1px solid rgb(229, 229, 229);
        flex: 1;
        h3 {
          font-size: 22px;
          color: rgb(0, 0, 0);
        }
        h4 {
          font-size: 22px;
          color: rgb(10, 10, 10);
        }        
        h2 {
          font-size: 25px;
          color: rgb(0, 0, 0);
        }
        span {
          font-size: 22px;
          color: rgb(0, 0, 0);
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
</style>
