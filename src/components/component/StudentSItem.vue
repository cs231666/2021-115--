<template>
  <section class="orderItem">
    <div class="row" style="min-height: 60px">
      <div class="shop_header">
        <div style="margin: 10px; float: left">{{ value.rank }}</div>
         <img src="../../assets/touxiang.png" alt="" />
        <div class="shop_text-2">
          <h2 class="fn-15 fw-2">
            <span> {{ value.realname }}</span>
          </h2>
          <span class="fn-c-memo-light">{{ value.studentId }}</span>
        </div>
        <div style="flex-grow: 1;text-align: end;">
         <span style="font-size: 100%"> {{ value.score }}经验值</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/babel">
export default {
  name: "StudentSItem",
  data() {
    return {
      list: [],
    };
  },
  props: {
    value: Object,
    index: Number,
  },
  components: {},
  methods: {
    hide() {
      this.$store.commit("SHOW_FOOTER", !this.$store.state.common.hasFooter);
    },
  },
};
</script>

<style lang="scss">
.orderItem {
  min-height: 60px;
  .row {
    /* margin-top: 90px; */
    align-items: center;
    min-height: 50px;
    display: flex;
    justify-content: space-between; // border-bottom: .5px solid #e5e5e5;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.11);
    .shop_header {
      flex: 5;
      display: flex;
      align-items: center;
      .shop_text-2 {
        // width: calc(100% - 130px);
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
      flex: 0.6; 
      display: flex;
      align-items: center;
    }
  }
}
</style>
