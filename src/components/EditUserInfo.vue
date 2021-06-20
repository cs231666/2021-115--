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
            <img src="..\assets\header.jpg" alt="">
          </div>
					<div >
						<h3 class="fn-14">刘德华</h3>
						<span class="fn-9">13771162599</span>
					</div>
					<div class="right">
						<img src="..\assets\icon\right-w.png" alt="">
					</div>
        </section>
      </section>
      <br>
      <mt-field label="姓名" class="fn-14" placeholder="请输入您的姓名" v-model="editUserForm.UserName"></mt-field>
      <mt-field label="昵称" class="fn-14" placeholder="请输入您的昵称" v-model="editUserForm.NserName"></mt-field>
      <div class="select" @click="popupVisible = true">
        <mt-cell title="出 生 年 月" is-link>
          <span> {{currentTags.length?currentTags: '1980年'}}</span>
        </mt-cell>
      </div>
      <mt-popup v-model="popupVisible" position="bottom" size="large">
        <mt-picker style="width: 375px;" :slots="slots"  :visible-item-count="5" :show-toolbar="true" ref="picker" value-key="cName">
            <mt-button style="width: 375px;" @click="handleConfirm" class="sure">确认</mt-button>
        </mt-picker>
      </mt-popup>
      <br>
      <mt-cell title="选 择 性 别">
      </mt-cell>
      <mt-radio  v-model="editUserForm.sex" align="right" :options="['男','女']"></mt-radio> 
      <br>
      <mt-cell title="选 择 身 份">
      </mt-cell>
      <mt-radio  v-model="editUserForm.Identity" align="right" :options="['我是老师','我是学生','其他']"></mt-radio> 
      <br>
      <mt-field label="学号/工号" class="fn-14" placeholder="请输入您的学号或者工号" v-model="editUserForm.Idnum"></mt-field>
    </div> 
    <mt-button type="primary" @click.native="edituserinfo" size="large">确定</mt-button>
  </div>

</template>

<script>
import { Cell } from "mint-ui";
import moment from "moment";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
      editUserForm: {
        UserName: "",
        NserName: "",
        sex: "",
        Idnum: "",
        Identity: "",
      },
      currentTags: {},
      slots: [
        {
          flex: 1,
          values: ['1980年', '1981年', '1982年', '1983年', '1984年', '1985年', '1986年', '1987年', '1988年', '1989年', '1990年', '1991年', '1992年', '1993年', '1994年', '1995年', '1996年', '1997年', '1998年', '1999年', '2000年', '2001年', '2002年', '2003年', '2004年', '2005年', '2006年', '2007年', '2008年', '2009年', '2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年'],
          className: 'slot1',
        },
      ],
    };
  },
  methods: {
    edituserinfo(){

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