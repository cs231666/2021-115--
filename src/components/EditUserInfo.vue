<template>
  <div class="mineCom">
    <mt-header style="-webkit-transform: translateZ(0)" slot="header" class="primary_bg" title="修改信息" color="black" :fixed="true">
      <router-link to="/userinfo" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> 
    </mt-header>
    <br />
    <br />
    <div slot="content">
      <section class="content has-header">
        <section class="header primary_bg">
          <div class="left">
            <img src="..\assets\touxiang.png" alt="">
          </div>
					<div >
						<h3 class="fn-14" >{{name}}</h3>
						<span class="fn-9">{{phone}}</span>
					</div>
					<div class="right">
						<img src="..\assets\icon\right-w.png" alt="">
					</div>
        </section>
      </section>
      <br>
      <mt-field label="姓名" class="fn-14" placeholder="请输入您的姓名" v-model="editUserForm.UserName"></mt-field>
      <div class="select" @click="popupVisible = true">
        <mt-cell title="出生年份" is-link>
          <span> {{currentTags.length?currentTags: '1980年'}}</span>
        </mt-cell>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" size="large">
        <mt-picker style="width: 375px;" :slots="slots"  :visible-item-count="5" :show-toolbar="true" ref="picker" value-key="cName">
            <mt-button style="width: 375px;" @click="handleConfirm" class="sure">确认</mt-button>
        </mt-picker>
      </mt-popup>
      <mt-cell title="选择性别">
      </mt-cell>
      <mt-radio  v-model="editUserForm.sex" align="right" :options="['男','女']"></mt-radio> 
      <div class="select" @click="pickerVisible = true">
        <mt-cell title="学校院系" is-link>
          <span>
            {{
              currentTags1.length
                ? currentTags1 + currentTags2
                : "请选择院系"
            }}</span
          >
        </mt-cell>
      </div>
      <mt-popup
        style="width: 375px"
        v-model="pickerVisible"
        position="bottom"
        size="large"
      >
        <div class="picker-toolbar">
          <span @click="cancel">取消</span>
          <span class="mint-datetime-confirm" @click="confirm">确定</span>
        </div>
        <mt-picker
          style="width: 180px; float: left"
          ref="pickerObj"
          :slots="slots1"
          @change="onValuesChange"
          valueKey="name"
        ></mt-picker>
        <mt-picker
          style="width: 180px; float: right"
          ref="pickerObj1"
          :slots="slots2"
          valueKey="name"
        ></mt-picker>
      </mt-popup>
     
      <mt-cell title="选择身份">
      </mt-cell>
      <mt-radio  v-model="editUserForm.Identity" align="right" :options="[{label: '我是学生', value: '0'}, {label: '我是老师', value: '1'}]"></mt-radio> 
      <mt-field label="学号/工号" class="fn-14" placeholder="请输入您的学号或者工号" v-model="editUserForm.Idnum"></mt-field>
      <br>
    </div> 
    <mt-button type="primary" @click.native="edituserinfo" size="large">确定</mt-button>
  </div>

</template>

<script>
import { MessageBox } from "mint-ui";
import { getSchool ,getCollege} from "@/api/school.js";
import {updateUserInfo,getUserInfo} from "@/api/user.js"
export default {
  data() {
    return {
      phone: "",
      name: "",
      school:"",
      schools:[],
      schoolId: 0,
      pickerVisible: false,
      popupVisible: false,
      editUserForm: {
        UserName: "",
        sex: "",
        Idnum: "",
        Identity: "",
      },
      currentTags: {},
      currentTags1: {},
      currentTags2: {},
      slots: [
        {
          flex: 1,
          values: ['1980年', '1981年', '1982年', '1983年', '1984年', '1985年', '1986年', '1987年', '1988年', '1989年', '1990年', '1991年', '1992年', '1993年', '1994年', '1995年', '1996年', '1997年', '1998年', '1999年', '2000年', '2001年', '2002年', '2003年', '2004年', '2005年', '2006年', '2007年', '2008年', '2009年', '2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年'],
          className: 'slot1',
        },
      ],
      slots1: [
        {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: "slot1",
          textAlign: "left",
        },
        {
          divider: true,
          content: "-",
          className: "slot2",
          textAlign: "center",
        },
      ],
      slots2: [
        {
          flex: 1,
          values: [
           
          ],
          defaultIndex: 1,
          className: "slot3",
          textAlign: "right",
        },
      ],
    };
  },
  activated(){
    this.getInfo();
    this.getSchool();
  },
  deactivated(){
    this.editUserForm.UserName = "";
    this.editUserForm.sex = "";
    this.editUserForm.Idnum = "";
    this.editUserForm.Identity = "";
    this.name = "";
    this.phone = "";
    this.currentTags = "";
    this.currentTags1 = "";
    this.currentTags2 = "";
  },
  methods: {
    cancel() {},
    confirm() {
      this.currentTags1 = this.$refs.pickerObj.getValues()[0] + " ";
      this.currentTags2 = this.$refs.pickerObj1.getValues()[0];
      this.pickerVisible = false;
    },
    onValuesChange(picker, values) {
      this.school = picker.getSlotValue(0);
      this.getCollege();
        if (values[0] && values[0].userlist != undefined) {
          this.slots1[0].values = [];
          for (var key in values[0].userlist) {
            this.slots1[0].values.push(values[0].userlist[key]);
          }
        }
    },
    getInfo(){
      this.phone = this.$route.params.phone;
      this.name = localStorage.getItem("realname");
      getUserInfo().then((res) => {
        if (res.data.code != 200) {
          MessageBox("提示", "获取用户列表失败");
        } else {
          console.log("success")
          console.log(res);
          let org = res.data.obj.org.split(' ')
          this.currentTags = res.data.obj.birthday + "年";
          this.editUserForm.UserName = res.data.obj.realname;
          this.editUserForm.sex = res.data.obj.sex;
          this.editUserForm.Idnum = res.data.obj.studentId;
          console.log(org[0]);
          console.log(org[1]);
          this.currentTags1 = org[0];
          this.currentTags2 = org[1]?org[1]:"";
          this.editUserForm.Identity = res.data.obj.role+"";
        }
      });
    },
    async getSchool(){
      getSchool().then(response => {
        this.schools = response.data.obj;
        this.slots1[0].values = this.schools.map(item => item.name);
        
      })
    },
    async getCollege(){
      for(var i = 0;i<this.schools.length;i++){
        if(this.school == this.schools[i].name){
          this.schoolId  = this.schools[i].detailId;
        }
      }
      getCollege(this.schoolId).then(res => {
        this.slots2[0].values = res.data.obj.map(item => item.name);
      })
	  },


    edituserinfo(){
      if(this.editUserForm.UserName == ""){
        MessageBox("提示", "姓名不能为空");
      }
      else if(this.editUserForm.Identity == ""){
        MessageBox("提示", "学工号不能为空");
      }
      console.log("院系信息");
      console.log(this.currentTags1+this.currentTags2);
      let userInfo = {
        birthday: this.currentTags.substr(0,this.currentTags.length - 1),
        org: this.currentTags1+this.currentTags2,
        realname: this.editUserForm.UserName,
        role: parseInt(this.editUserForm.Identity),
        sex: this.editUserForm.sex,
        studentId: this.editUserForm.Idnum
      }
      updateUserInfo(userInfo).then(res => {
        if(res.data.code!=200){
          MessageBox("提示", res.data.msg);
        }
        else{
          MessageBox.alert("更新成功！","提示").then(action => {
            this.$router.push("/userinfo")
          });
        }
      })


    },
    handleConfirm () {
      this.currentTags = this.$refs.picker.getValues()[0]
      this.popupVisible = false
    },
  }
};
</script>

<style lang='scss'>
$hei: 65px;
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
                text-align: center;
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
</style>