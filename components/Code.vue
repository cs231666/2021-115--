<template>
  <div>
    <mt-header title="班课信息">
      <router-link to="/classdetail" slot="left">
        <mt-button icon="back">班课详情</mt-button>
      </router-link>
    </mt-header>
    <!-- 显示班课信息的详细界面，通过班课号获得详细信息
    <mt-cell title="课程名" :value='class_name'></mt-cell>
    <mt-cell title="学校" :value='school'></mt-cell>
    <mt-cell title="学院" :value='college'></mt-cell>
    <mt-cell title="描述" :value='description'></mt-cell>-->
    <!-- 二维码 -->
    <div class="qrcode" ref="qrCodeUrl"></div>
    <mt-cell title="扫一扫加入云班课！"></mt-cell>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {

    };
  },

  methods: {
    creatQrCode() {
        console.log(this.$route.query.classes_id)
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "fanjfajkfnajk", 
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  mounted() {
    this.creatQrCode();
  }
};
</script>

<style scoped>
.qrcode {
  /* margin-right: 10%; */
  /* border: 1px solid #96c2f1; */
  position: absolute;
  top:30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mint-cell{
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>