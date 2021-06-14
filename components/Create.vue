
  <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <mt-button @click.native="sheetVisible = true" type="large" style="height: 100px;" >
      <img src="..\assets\fengmian.png" height="100" width="90" slot="icon">
    </mt-button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>  -->
<!-- 班课页面，对应我加入的，面向学生 -->
<template>
    <div slot="content">
    <mt-header style="-webkit-transform: translateZ(0)" slot="header" title="创建班课" color="white" class="primary_bg" :fixed="true">
      <router-link to="/class" slot="left">
        <mt-button icon="back" @click="currentTags = {}">返回</mt-button>
      </router-link>
    </mt-header>  
    <br /><br />
    <section>
      <div>
        <mt-button @click.native="sheetVisible = true" size="large" slot="right" type="large" style="height: 100px;">
          <img src="..\assets\fengmian.png" height="100" width="90" slot="icon">
        </mt-button>
        <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>      
      </div>      
    </section>
    <br />
    <section>
      <div  class="create">
        <mt-field label="班课名称" placeholder="请输入班课名" v-model="classes.classedName"></mt-field>
        <mt-popup v-model="pickerVisible" position="bottom" size="large">
            <div class="picker-toolbar">
                <span class="mint-datetime-cancel" @click='cancel'>取消</span>
                <span class="mint-datetime-confirm" @click='confirm'>确定</span>
            </div>
            <mt-picker ref='pickerObj' :slots="slots" @change="onValuesChange" valueKey="name"></mt-picker>
            <mt-picker ref='pickerObj1' :slots="slots1" valueKey="name"></mt-picker>
        </mt-popup>
        <mt-field label="学校" placeholder="请输入所在授课学校名" v-model="classes.school"></mt-field>
        <mt-field label="学院" placeholder="请输入所在授课学院名" v-model="classes.department"></mt-field>
        <mt-field label="班级" placeholder="请输入所在授课班级名称" v-model="classes.grade"></mt-field>

        <div class="select" @click="popupVisible = true">
          <mt-cell title="学期" is-link>
            <span> {{currentTags.length?currentTags: '2020-2021-2'}}</span>
          </mt-cell>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" size="large">
          <mt-picker style="width: 375px;" :slots="slots10"  :visible-item-count="5" :show-toolbar="true"  ref="picker" value-key="cName">
              <mt-button style="width: 375px;" @click="handleConfirm" class="sure">确认</mt-button>
          </mt-picker>
        </mt-popup>

        <mt-field label="教师" v-model="classes.teacher_name" disabled></mt-field>
        <mt-field label="教师Id" v-model="classes.teacher_id" disabled></mt-field>
      </div>  
    </section>
    <mt-button type="primary" @click.native="createClass" size="large">创建班课</mt-button>
  </div>
</template>

<script>
var scan = null;
import Axios from "axios";
export default {
  data() {
    return {
      popupVisible: false,
      pickerVisible: false,
      classes: {
        classedName: "",
        school: "",
        department: "",
        grade: "",
        teacher_name: "池之标",
        teacher_id: '9738',

      },
      currentTags: {},
      sheetVisible: false,
      actions: [],
      codeUrl: "",
      slots10: [
        {
          flex: 1,
          values: ['2020-2021-2', '2021-2022-1', '2021-2022-2', '2022-2023-1', '2022-2023-2'],
          className: 'slot1',
        },
      ],
    slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          defaultIndex:0,
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2',
          textAlign: 'right'
        }
    ],
    slots1:[
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          defaultIndex:1,
          className: 'slot3',
          textAlign: 'center'
        }
    ]


    };
  },
  // activated() {
  //   this.getClassInfo();
  // },
  created() {
    this.currentTags = {};
  },
  methods: {
    createClass() {
      this.create();
    },
  onValuesChange(picker,values){
      if(values[0] && values[0].userlist != undefined){
          this.slots1[0].values = [];
          for(var key in values[0].userlist) {
              this.slots1[0].values.push(values[0].userlist[key]);
          }
      }
  },
    handleConfirm () {
      this.currentTags = this.$refs.picker.getValues()[0]
      this.popupVisible = false
    },
    async create() {
      this.currentTags = {};
      this.$router.push("/classteacher");
    }
  },

  //其中创建班课功能要先判断是否拥有创建班课权限，没有的话提示‘你没有创建班课权限，请联系管理员’，参照云班课里面的提示
  mounted() {
    this.actions = [
      {
        name: "拍照",
      },
      {
        name: "从相册选择",
      },
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
