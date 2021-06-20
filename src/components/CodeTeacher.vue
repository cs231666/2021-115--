<template>
  <div>
    <!-- 与code界面一致，只是返回/classteacherdeatil界面-->
    <mt-header title="班课信息">
      <router-link to="/classteacherdetail" slot="left">
        <mt-button icon="back">班课详情</mt-button>
      </router-link>
    </mt-header>
    <mt-cell title="课程名" :value="class_name"></mt-cell>
    <mt-cell title="学校" :value="school"></mt-cell>
    <mt-cell title="学院" :value="college"></mt-cell>
    <mt-cell title="描述" :value="description"></mt-cell>
    <div class="qrcode" ref="qrCodeUrl"></div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      class_name: "软件工程",
      school: "福州大学",
      college: "数学与计算机学院",
      description: "教授软件开发技术",
    };
  },

  methods: {
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "/join/511523", // 需要转换为二维码的内容
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
  },
  mounted() {
    this.creatQrCode();
  },
};
</script>

<style></style>
