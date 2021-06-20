<template>
  <div>
    <mt-header title="扫一扫加入班课">
      <router-link to="/class" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="scan">
      <div id="bcid">
        <div style="height: 40%"></div>
        <p class="tip">...载入中...</p>
      </div>
      <footer>
        <mt-button icon="back" @click.native="back()">返回</mt-button>
      </footer>
    </div>
  </div>
</template>

<script>
let scan = null;

export default {
  data() {
    return {
      codeUrl: "",
      timer: null,
    };
  },
  mounted() {
    this.startRecognize();
    this.timer = setInterval(this.startScan, 1000);
  },
  methods: {
    back() {
      scan.close();
      scan.cancel();
      this.$router.go(-1);
    },
    goto(result) {
      // alert(result)
      this.$router.push({ path: "/join", query: { classes_id: result } });
    },
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        that.goto(result);
        that.closeScan();
        // scan = null;
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    },
  },
  watch: {
    $route: "startRecognize",
  },
};
</script>

<style lang="scss">
.scan {
  top: 20%;
  height: 80%;
  #bcid {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 3rem;
    text-align: center;
    color: #fff;
    background: #ccc;
  }
  footer {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
}
</style>
