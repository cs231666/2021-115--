<template>
  <section class="orderItemTeacher">
    <div class="row" style="min-height: 60px">
      <div class="shop_header">
        <img :src="value.img" alt="" />
        <div class="shop_text">
          <router-link :to="`/classteacherdetail/${value.courseCode}`">
            <h2 class="fn-15 fw-2">
              <span> {{ value.courseName }}</span>
              <img src="../../assets/img/right.png" alt="" />
            </h2>
            <span class="fn-c-memo-light"
              >{{ value.teacher }} {{ value.term }} {{ value.courseCode}}</span
            >
          </router-link>
        </div>
        <div class="row fw-2" style="justify-content: flex-end">
          <mt-button
            class="fw-4"
            style="margin-right: 10px; height: 30px; width: 60px"
            plain
            size="small"
            type="primary"
            @click="signIn"
            >签到</mt-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/babel">
import { Toast } from "mint-ui";
export default {
  name: "OrderItem",
  data() {
    return {
      list: [],
    };
  },
  props: {
    value: Object,
  },
  components: {},
  methods: {
    signIn() {
      Toast({
        message: "签到成功",
        position: "middle",
        duration: 5000,
      });
    },
    hide() {
      this.$store.commit("SHOW_FOOTER", !this.$store.state.common.hasFooter);
    },
  },
};
</script>

<style lang="scss">
.orderItemTeacher {
  min-height: 120px;
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
          // &::after {
          /* //   background-image: url('../../../../static/img/icon/right.png'); */
          //   content: "";
          //   display: block;
          //   height: 15px;
          //   width: 15px;
          //   position: absolute;
          //   right: -24px;
          //   top: 4px;
          //   background-size: 15px 15px;
          // }
          img {
            height: 15px;
            width: 15px; // top: -5px;
            // right: -15px;
            // position: absolute;
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
