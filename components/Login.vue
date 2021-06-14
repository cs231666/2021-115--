<template>
	<div class = "loginContainer">
		<div class="imgDiv">
			<img src="..\assets\logo.png" alt class="logo" />
		</div>
		<div class="loginInner">
			<div class = "login_header">
				<div class = "login_header_title">
					<a href="javascript:;" :class="{on:loginForm.loginWay}" @click="loginForm.loginWay=true">密码登录</a>
					<a href="javascript:;" :class="{on:!loginForm.loginWay}" @click="loginForm.loginWay=false">短信登录</a>
				</div>
			</div>
			<!-- //短信登录 -->
			<div class = "login_content">
				<form>
					<div :class="{on: loginForm.loginWay}" class="loginform">
						<section class="login_message">
							<input type="tel" maxlength="11" placeholder="手机号/用户名" v-model="loginForm.phone" />
						</section>
						<section class="login_verification">
							<input type="text" maxlength="16" placeholder="密码" v-if="loginForm.showPwd" v-model="loginForm.password" />
							<input type="password" maxlength="16" placeholder="密码" v-else v-model="loginForm.password" />
							<section class="switch_button" :class="loginForm.showPwd ? 'on' : 'off'" @click="loginForm.showPwd = !loginForm.showPwd">
								<section class="switch_circle" :class="{right : loginForm.showPwd}"></section>
								<section class="switch_text">{{loginForm.showPwd ? '' : ''}}</section>
							</section>
						</section>
						<section class="login_hint">
							温馨提示：登录即表示您已阅读、理解并同意<br>
							<a href="javascript:;">《用户服务协议》</a>
						</section>
					</div>

					<div :class="{on:!loginForm.loginWay}" class="loginform">
						<section class="login_message">
							<input type="tel" maxlength="11" placeholder="手机号" v-model="loginForm.phone" />
							<button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode">{{loginForm.computeTime >0 ? `(${loginForm.computeTime}s)已发送` : '获取验证码'}}</button>
						</section>
						<section class="login_verification">
							<input type="tel" maxlength="4" placeholder="验证码" v-model="loginForm.code">
						</section>
						<section class="login_hint">
							温馨提示：登录即表示您已阅读、理解并同意<br>
							<a href="javascript:;">《用户服务协议》</a>
						</section>
					</div>
					<button class="login_submit" @click="login_submit" > 登录</button>
			  </form>
      		</div>
			<div class="forgetPwd"><router-link to='/forgetPwd'><a>忘记密码</a></router-link></div>
    </div>
		<!-- <span @click="See(url)">外部链接</span> -->
		<!-- <a href="https://github.com/login/oauth/authorize?client_id=c31033a905eac469ce3b&redirect_uri=http://127.0.0.1:8080/callback&scope=user&state=1
">一键登录</a> -->
		<div class="third" @click="loginByGithub">
		      <div class="third-icon">
				  <img src="..\assets\githublogo.png" width="50px" />
		      </div>
		    </div>
		<div class="register">没有账号？<router-link to = '/register'><a>立即注册</a></router-link></div>
	</div>
</template>

<script>
import Cookies from "js-cookie";
import { MessageBox } from "mint-ui";
import {userLogin,userLoginByCode} from "@/api/login"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginWay: true, //true代表短信登陆, false代表密码
        phone: "",//手机号
        code: '',//短信
        //username: "admin",//用户名
        computeTime: 0,//获取验证码读秒
        showPwd: false,
        timer: null,//时间是否超过120s
        password: '',
	
      }
    };
  },
  computed: {
    rightPhone() {
      //利用正则对手机号匹配
      return /^1[3456789]\d{9}$/.test(this.loginForm.phone);
    }
  },  
  methods: {
    login_submit(){
    	this.login();
    },
	loginByGithub() {
	      window.location.href =
	        "https://github.com/login/oauth/authorize?client_id=c31033a905eac469ce3b&redirect_uri=http://119.23.210.155:8080/callback?state=1";
	},
    async getCode() {
      if (!this.loginForm.computeTime) {
        this.loginForm.computeTime = 60;
        this.loginForm.timer = setInterval(() => {
          this.loginForm.computeTime--;
          if (this.loginForm.computeTime <= 0) {
            clearInterval(this.loginForm.timer)
          }
        }, 1000);
        // 短信倒计开始时即请求服务器
        // msg({phone:this.loginForm.phone}).then(res=>{
        //   this.$message.success("短信已发送");
        // })
    	var qs = require("qs");
    	const { data: res } = await this.$axios.post(
    	  `/Sms/${this.loginForm.phone}`,
    	  {},
    	  {
    		  withCredentials: false
    	  }
    	);
    	
      }
    },
    register() {
      this.$router.push("/register");
    },
    async login() {
      //短信登录
      if(!this.loginForm.loginWay) {
        if( this.loginForm.phone.length == 0 || this.loginForm.code.length == 0) {
          this.$message.error('信息填写不完整');
          return false;
        }
        var phonereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if( !phonereg.test(this.loginForm.phone) || this.loginForm.phone.length != 11) {
			console.log(phonereg.test(this.loginForm.phone));
          this.$message.error('手机号格式不正确');
          return false;
        }
        if(!/^\d{4}$/.test(this.loginForm.code)) {
          this.$message.error('验证码是4位纯数字');
          return false;

        }
		let userData = {
				   code:this.loginForm.code,
				   password:"",
				   username:this.loginForm.phone
		}
		userLoginByCode(userData).then(response => {
				  
				  if(response.data.msg == "无此用户"){
					 quickUserIndfo = {
						 code : "",
						 password : "123456",
						 username : this.loginForm.phone
						
					 }
					 userLoginByCode(quickUserIndfo).then(res => {
						 if(res.data.code != 200){
							 this.$message.error(res.data.msg);
							 return false;
						 }
						 else{
							 this.$message.success("快速注册成功");
							 this.$router.push("/userinfo");
						 }
					 })
					}
				  else if(response.data.code!=200){
						console.log("!=200")
						this.$message.error(response.data.msg);
						return false;
					}
				  else{
						// localStorage.setItem("token", res.data.obj.token);
						this.$message.success("登录成功！");
						this.$router.push("/userinfo");
					}
		})
      } else {
        if( this.loginForm.phone.length == 0 || this.loginForm.password.length == 0 ) {
          this.$message.error('信息填写不完整');
          return false;
        }
        if (this.loginForm.phone.length<2 || this.loginForm.phone.length>8) {
          if(this.loginForm.phone.length!=11){
            this.$message.error('手机号填写不正确');
            return false;
          }
        }
        if( this.loginForm.password.length<2 || this.loginForm.password.length>16 ){
          this.$message.error('密码必须是8-16位数字和字母');
          return false;
        }
		let userData = {
				   code:"",
				   password:this.loginForm.password,
				   username:this.loginForm.phone
		}
		userLogin(userData).then(response => {
				  
		  if(response.data.msg == "无此用户"){
			 quickUserIndfo = {
				 code : "",
				 password : "123456",
				 username : this.loginForm.phone
				
			 }
			 userLogin(quickUserIndfo).then(res => {
				 if(res.data.code != 200){
					 this.$message.error(res.data.msg);
					 return false;
				 }
				 else{
					 this.$message.success("快速注册成功");
					 this.$router.push("/userinfo");
				 }
			 })
			}
		  else if(response.data.code!=200){
				console.log("!=200")
				this.$message.error(response.data.msg);
				return false;
			}
		  else{
				localStorage.setItem("token", response.data.obj.token);
				this.$message.success("登录成功！");
				this.$router.push("/userinfo");
			}
		})
      }
	  
	//   var qs = require("qs");   //13599389716
		// this.$axios.post(
		// `/login`,
		//  {
		//    code:this.loginForm.code,
		//    password:this.loginForm.password,
		//    role:0,
		//    username:this.loginForm.phone,
		// },
		// {
		// 		  withCredentials:false
		//  } 
		// ).then(res => {  
		// 	if(res.data.msg=="无此用户"){
		// 	console.log("无此用户")
		// 	var qs = require("qs");
		// 	this.$axios.post(
		// 	`/user`,
		// 	{
		// 		code:this.loginForm.code,
		// 		password:"123456",
		// 		role:0,
		// 		username:this.loginForm.phone
		// 		},
		// 	{
		// 		withCredentials:false
		// 	},  
		// 	).then(res => {
		// 		if(res.data.code!=200){
		// 			this.$message.error(res.data.msg);
		// 			return false;
		// 		}
		// 		else{
		// 			this.$message.success("快速注册成功");
		// 			this.$router.push("/userinfo");
		// 		}
		// 	});	
		// 	}
		// 	else if(res.data.code!=200){
		// 		this.$message.error(res.data.msg);
		// 		return false;
		// 	}
		// 	else{
		// 		localStorage.setItem("token", res.data.obj.token);
		// 		this.$message.success("登录成功！");
		// 		this.$router.push("/userinfo");
		// 	}
		// });
    },
  }
};

</script>

<style scoped>
/* 操作区域的样式*/
	.loginContainer {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.loginInner {
		width: 80%;
		margin: 0 auto;
		padding-top: 60px;
	}
.loginInner .login_header .login_logo {
		color: #0faeff;
		font-weight: bolder;
		font-size: 40px;
		text-align: center;
	}

	.login_header .login_header_title {
		text-align: center;
		padding-top: 40px;
	}
	.register_verification {
		position: relative;
		margin-top: 16px;
		height: 48px;
		font-size: 14px;
		background: #fff;
	}

	.register_verification .switch_button {
		border: 1px solid #ddd;
		width: 30px;
		height: 16px;
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		border-radius: 8px;
		padding: 0 6px;
		line-height: 16px;
		font-size: 12px;
		transition: background-color 0.3s;

	}

	.register_verification .switch_button.on {
		background: #0faeff;
	}

	.register_verification .switch_button.off {
		background: #fff;
	}
	.login_header_title a {
		text-decoration: none;
		font-size: 14px;
		color: #333;
		padding-bottom: 4px;
	}

	.login_header_title a:first-child {
		margin-right: 40px;
	}

	.login_header_title a.on {
		color: #0faeff;
		font-weight: bolder;
		border-bottom: 2px solid #0faeff;
	}

	.login_content form .loginform {
		display: none;
	}
	
	.login_content form .loginform.on {
		display: block;
	}

	.login_content form input {
		width: 100%;
		height: 100%;
		border: 1px solid #ddd;
		border-radius: 4px;
		outline: none;
		padding-left: 10px;
		box-sizing: border-box;

	}

	.login_content form input:focus {
		border: 1px solid #0faeff;
	}

	.login_message {
		position: relative;
		margin-top: 16px;
		height: 48px;
		font-size: 14px;
		background: #fff;
	}

	.login_message .get_verification {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		border: none;
		color: #ccc;
		background: transparent;
		font-size: 14px;
	}

	.login_message .get_verification.right_phone {
		color: #000;
	}

	.login_hint {
		text-align: center;
		color: #999;
		margin-top: 12px;
		font-size: 14px;
		line-height: 20px;
	}

	.login_hint a {
		text-decoration: none;
		color: #0faeff;
	}

	.login_verification {
		position: relative;
		margin-top: 16px;
		height: 48px;
		font-size: 14px;
		background: #fff;
	}

	.login_verification .switch_button {
		border: 1px solid #ddd;
		width: 30px;
		height: 16px;
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		border-radius: 8px;
		padding: 0 6px;
		line-height: 16px;
		font-size: 12px;
		transition: background-color 0.3s;

	}

	.login_verification .switch_button.on {
		background: #0faeff;
	}

	.login_verification .switch_button.off {
		background: #fff;
	}

	.switch_button .switch_circle {
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 50%;
		width: 16px;
		height: 16px;
		position: absolute;
		left: -1px;
		top: -1px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
	}

	.switch_button .switch_circle.right {
		transform: translateX(30px);
	}

	.switch_button .switch_text {
		color: #ddd;
		float: right;
	}

	.login_submit {
		display: block;
		width: 100%;
		height: 42px;
		margin-top: 30px;
		background: #0faeff;
		border-radius: 4px;
		font-size: 16px;
		line-height: 42px;
		color: #fff;
		text-align: center;
		border: none;
	}
	.register{
		font-size: 14px;
		color: #999;
		position:fixed;
		bottom:20px; 
		width: 100%;
		text-align: center;
	}
	.register a {
		text-decoration: none;
		color: #0faeff;
	}
	.forgetPwd{
		text-align: right;
		font-size: 14px;
		padding-top: 15px;
		
	}
	.forgetPwd a{
		text-decoration: none;
		color: #0faeff;
	}
.operateDiv {
  padding-left: 20px;
  padding-right: 20px;
}
/* 输入框边距 */
.myinput {
  margin-top: 30px;
}
/* 上面的线隐藏 */
.mint-cell-wrapper {
  background-image: linear-gradient(180deg, #fff, #fff 0%, transparent 0%);
}
/* 输入框底边框样式 */
.mint-cell-wrapper {
  border-bottom: 1px solid #007bff;
}
.imgDiv {
  padding-top: 20%;
  display: flex;
  justify-content: center;
}
/* 图片样式 */
.logo {
  width: 75%;
  height: 75%;
}
/* 免费注册根样式 */
.registerDiv {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5%;
}
/* 免费注册字体样式*/
.registerDiv span {
  color: #555;
}
/* 同上 */
.mint-button--primary {
  border-radius: 25px;
  height: 48px;
}
.third {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.third-icon {
  width: 50px;
  height: 50px;
  background-color: #000000;
  border-radius: 25px;
  border: #ccc 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>







