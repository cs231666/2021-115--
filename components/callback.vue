<template>
  <div class="container">
    <!-- <img src="../../assets/image/success.png" width="300px" /> -->
    <h1>授权成功，正在跳转...</h1>
    <h3>若长时间未跳转，请刷新</h3>
  </div>
</template>

<script>
import { thirdLogin } from "@/api/login.js";
export default {
  
  created() {
    console.log("创建页面");
    console.log(this.$route.query);
   //  thirdLogin(this.$route.query).then((res) => {
   //    console.log("res", res);
   //    console.log("跳转到首页");
	  
   //  });
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  border: none;
}
</style>