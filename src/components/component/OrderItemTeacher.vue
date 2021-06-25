<template>
  <section class="orderItemTeacher">
    <div class="row" style="min-height: 60px">
      <div class="shop_header">
        <img src="../../assets/class.png" alt="" />
        <div class="shop_text">
          <router-link :to="`/classteacherdetail/${value.courseCode}`">
            <h2 class="fn-15 fw-2">
              <span> {{ value.courseName }}</span>
            </h2>
            <span class="fn-c-memo-light"
              >{{ value.teacher }} {{ value.term }} {{ value.courseCode}}</span
            >
          </router-link>
        </div>
        <div class="row fw-2" style="justify-content: flex-end">
          <mt-button
            @click="sheetVisible = true"
            class="fw-4"
            style="margin-right: 10px; height: 30px; width: 85px"
            plain
            size="small"
            type="primary"
            >发起签到</mt-button>
	    	</div>	
          <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible"
          ></mt-actionsheet>
        <mt-popup style="width:375px" v-model="popupVisible" position="bottom" size="large">
          <div class="picker-toolbar">
          <mt-button class="mint-datetime-cancel" size="small" type="default" @click="cancel">
            取消
          </mt-button>
          <mt-button class="mint-datetime-confirm" size="small" type="default" @click="confirm" slot="right">
            确认
          </mt-button>
          </div>
          <mt-picker style="width:180px; float:left;" ref='pickerObj' :slots="slots" @change="onValuesChange" valueKey="name"></mt-picker>
          <mt-picker style="width:180px; float:right;" ref='pickerObj1' :slots="slots1" valueKey="name"></mt-picker>          
        </mt-popup>
      </div>
    </div>
  </section>
</template>

<script type="text/babel">
import { xianshi } from "@/api/signin.js"
import StudentSignedVue from '../StudentSigned.vue';
export default {
  name: "OrderItem",
  data() {
    return {
      latitude:0,
      longitude:0,
      popupVisible: false,
      list: [],
      currentTags1: {},
      currentTags2: {},
      actions: [{
        name: '一键签到',
        method : this.yiJian
      },
      {
        name: '限时签到',
        method : this.openPicker
      }],
      sheetVisible: false,
      slots: [
          {
            flex: 1,
            values: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
            defaultIndex:0,
            className: 'slot1',
          },
           {
            flex: 1,
            divider: true,
            content: '分',
            className: 'slot4',
          },
          {
            textAlign: 'center',
            divider: true,
            content: '-',
            className: 'slot5',
          },

      ],
      slots1:[
          {
            flex: 3,
            values: [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
            defaultIndex:1,
            className: 'slot3',
          },
           {
            flex: 3,
            divider: true,
            content: '秒',
            className: 'slot2',
          }          
      ]
    }
  },
  props: {
    value: Object,
  },
  components: {},
  created(){
    this.getLocation();
  },
  methods: {
    cancel() {
      this.popupVisible = false;
    },
    getLocation(){
      var onSuccess = (position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      };
      navigator.geolocation.getCurrentPosition(onSuccess);
    },
    confirm() {
      this.currentTags1 = this.$refs.pickerObj.getValues()[0] + " "
      this.currentTags2 = this.$refs.pickerObj1.getValues()[0]
      this.popupVisible = false; 
      let signData = {
          courseCode: this.value.courseCode,
          latitude: this.latitude,
          longitude: this.longitude,
          minutes: parseInt(this.currentTags1),
          second: parseInt(this.currentTags2),
      }
      console.log(signData);
      xianshi(signData).then(res => {
        console.log(res);
      })
      this.$router.push({ name: "XianShi", params: { minute: this.currentTags1, second:this.currentTags2, courseId:this.value.courseCode } });
    },
    onValuesChange(picker,values){
        if(values[0] && values[0].userlist != undefined){
            this.slots1[0].values = [];
            for(var key in values[0].userlist) {
                this.slots1[0].values.push(values[0].userlist[key]);
            }
        }
    },
    openPicker: function() {
      this.popupVisible = true;
    },
    actionSheet: function() {
      this.sheetVisible = true;
    },
    yiJian: function() {
      this.$router.push("/yijian")
    },
    
    
    hide() {
      this.$store.commit("SHOW_FOOTER", !this.$store.state.common.hasFooter);
    },
  },
};
</script>

<style lang="scss">
.orderItemTeacher {
  min-height: 60px;
  .row {
    /* margin-top: 90px; */
    align-items: center;
    min-height: 50px;
    display: flex;
    justify-content: space-between; // border-bottom: .5px solid #e5e5e5;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.11);
    .shop_header {
      flex: 2;
      display: flex;
      align-items: center;
      .shop_text {
        width: calc(100% - 103px);
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        h2 {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis; // overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
         
          img {
            height: 15px;
            width: 15px;
            margin: 5px;
          }
        }
      }
      img {
        height: 40px;
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
