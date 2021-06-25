<template>
  <div class="mineCom">
    <mt-header style="-webkit-transform: translateZ(0)" slot="header" class="primary_bg" title="班课详情" color="black" :fixed="true">
      <router-link to="/classteacher" slot="left">
        <mt-button icon="back">我创建的</mt-button>
      </router-link>
    </mt-header>
    <br />
    <br />
    <section class="information">
      <div class="row" style="min-height: 60px">
        <div class="shop_header">
          <img src="..\assets\bankeyemian.png" alt="">
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
    <mt-cell title="班课号">123456</mt-cell>
    <mt-cell title="班课二维码" :to="`/codetoinfo/${this.$route.params.courseId}`" is-link></mt-cell>
    <mt-cell></mt-cell>
    <mt-cell title="选择班课是否允许加入状态:"></mt-cell>
    <mt-radio  v-model="information.IsJoin" align="right" :options="[{label: '允许加入', value: '1'}, {label: '不允许加入', value: '0'}]"></mt-radio>
    <mt-cell></mt-cell>
    <mt-cell title="班课结束后将不可恢复，且无法创建活动，但仍可以查看以发布的资源和结束的活动等"></mt-cell>
    <mt-button size="large" type="danger" @click="confirm" :disabled = "isdisabled1">结束班课</mt-button>
    <br>
    <mt-button size="large" type="danger" @click="deleteclass" :disabled = "isdisabled">删除班课</mt-button>
    <mt-cell>注意：只有已结束的班课可以被删除且不可恢复</mt-cell>
    <mt-tabbar :selected.sync="selected">
      <mt-tab-item id="成员">
        <img slot="icon" src="../assets/chengyuan.png" />
        <router-link :to="`/classteacherdetail/${this.$route.params.courseId}`">
          <font size="3">成员</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="活动">
        <img slot="icon" src="../assets/huodong.png" />
        <router-link :to="`/addedactivity/${this.$route.params.courseId}`">
          <font size="3">活动</font>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="详情">
        <img slot="icon" src="../assets/xiaoxi.png" />
        <router-link :to="`/informationteacher/${this.$route.params.courseId}`">
          <font size="3">详情</font>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { getCourseByCode,updateClass,deleteClass } from "@/api/course.js";
export default {
  data() {
    return {
        selected: "",
        isdisabled: true,
        isdisabled1: false,
        information: {
            IsJoin: "允许加入",
            IsEnd: false, //是否结束班课，false表示未结束，true表示结束
        },
    };
  },
  activated(){
    this.getClassInfo();
  },
  deactivated(){
    this.editClassInfo();
  },
  methods: {
    cancel() {},
    confirm() {
      MessageBox.confirm('',{
        title: '',
        message: '是否结束此班课？',
        confirmButtonText: '结束',
        cancelButtonText: '不结束',
      }).then(action => {
          this.isdisabled1 = true;
          this.isdisabled = false;
        }).catch(error => {})
    },
    deleteclass() {
      MessageBox.confirm('',{
        title: '',
        message: '是否删除此班课？',
        confirmButtonText: '删除',
        cancelButtonText: '不删除',
      }).then(action => {
          deleteClass(this.$route.params.courseId).then(res =>{
            if(res.data.code != 200){
                MessageBox.alert(response.data.msg,"提示").then(action => {
                  this.$router.push("/classteacher");
                });
              }
            else{
              MessageBox.alert("删除成功","提示").then(action => {
                this.$router.push("/classteacher");
              });
            }
          })
          this.$router.push("/classteacher");
        }).catch(error => {})
    },
    getClassInfo(){
      this.classes_id = this.$route.params.courseId;
      getCourseByCode(this.$route.params.courseId).then(res => {
        console.log(res.data.obj.status);
        console.log(res.data.obj.isEnd);
        if(res.data.obj.isEnd==1){
          this.isdisabled1 = true ;
          this.isdisabled = false;
          this.information.IsJoin = "0";
        }
        else{
          this.information.IsJoin = res.data.obj.status + '';
        }
      })
    },
    editClassInfo(){
      let classInfo = {
        courseCode: this.$route.params.courseId,
        isEnd:this.isdisabled1?1:0 ,
        status: parseInt(this.information.IsJoin)
      }
      updateClass(classInfo).then(res => {
        console.log(classInfo);
        console.log(res);
      })
    }
  }
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

