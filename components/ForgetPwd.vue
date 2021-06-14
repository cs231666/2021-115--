<template>
  <div class="loginContainer">
    <div class="registerInner">
      <div class="register_header">忘记密码</div>
      <div class="register_content">
        <form @submit="register">
          <!-- 短信登录 -->
          <div>
						<section class="register_message">
							<input type="tel" maxlength="11" placeholder="手机号" v-model="forgetForm.phone" />
							<button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{forgetForm.computeTime>0 ? `(${forgetForm.computeTime}s)已发送` : '获取验证码'}}</button>
						</section>
            <section class="register_verification">
              <input type="tel" maxlength="4" placeholder="验证码" v-model="forgetForm.code">
            </section>
            <section class="register_verification">
							<input type="text" maxlength="16" placeholder="密码" v-if="forgetForm.showPwd1" v-model="forgetForm.password1" />
							<input type="password" maxlength="16" placeholder="密码" v-else v-model="forgetForm.password1" />
							<section class="switch_button" :class="forgetForm.showPwd1 ? 'on' : 'off'" @click="forgetForm.showPwd1 = !forgetForm.showPwd1">
								<section class="switch_circle" :class="{right : forgetForm.showPwd1}"></section>
								<section class="switch_text">{{forgetForm.showPwd1 ? 'abc' : '....'}}</section>
							</section>              
            </section>
						<section class="register_verification">
							<input type="text" maxlength="16" placeholder="重复密码" v-if="forgetForm.showPwd2" v-model="forgetForm.password2" />
							<input type="password" maxlength="16" placeholder="重复密码" v-else v-model="forgetForm.password2" />
							<section class="switch_button" :class="forgetForm.showPwd2 ? 'on' : 'off'" @click="forgetForm.showPwd2 = !forgetForm.showPwd2">
								<section class="switch_circle" :class="{right : forgetForm.showPwd2}"></section>
								<section class="switch_text">{{forgetForm.showPwd2 ? 'abc' : '....'}}</section>
							</section>
						</section>
          </div>
          <button class="register_submit" @click="register_submit">确定修改</button>
        </form>
      </div>
    </div>
    <div class="login">已有账号？<router-link to='/login'><a>立即登录</a></router-link></div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "ForgetPwd",
  data() {
    return {
      forgetForm: {
        code: '',
        phone: '',
        computeTime: 0,
        timer: null,
        showPwd1: false,
        showPwd2: false,
        password1: '',
        password2: '',
        user: false
      }
    };
  },
		computed: {
			rightPhone() {
				//利用正则对手机号匹配
				return /^1[3456789]\d{9}$/.test(this.forgetForm.phone);
			}
		},  
  methods: {
    register_submit(){
        this.$router.push("/login");
      //this.register();
    },
    getCode() {
      if (!this.forgetForm.computeTime) {
        this.forgetForm.computeTime = 60;
        this.forgetForm.timer = setInterval(() => {
          this.forgetForm.computeTime--;
          if (this.forgetForm.computeTime <= 0) {
            clearInterval(this.forgetForm.timer)
          }
        }, 1000);
        // 短信倒计开始时即请求服务器
        msg({phone:this.forgetForm.phone}).then(res=>{
          this.$message.success("短信已发送");
        })
      }
    },
    async toRegister() {
      if (this.forgetForm.password1 == this.forgetForm.password2) {
        var qs = require("qs");
        let postForm = {
          username: this.forgetForm.username,
          password: this.forgetForm.password1,
          mobile: this.forgetForm.mobile
        };
        const { data: res } = await this.$axios.post(
          "/user/create",
          qs.stringify(postForm)
        );
        console.log(res);
        MessageBox("提示", "注册成功，登陆！");
        this.$router.push("/login");
      } else {
        console.log("密码不同");
        MessageBox("提示", "两次输入的密码需相同");
      }
    },
    register() {
    //   uni.showLoading({
    //       title: '正在注册...'
    //   });
      if(this.forgetForm.phone.length==0||this.forgetForm.code.length==0||this.forgetForm.password1.length==0||this.forgetForm.password2.length==0){
        uni.hideLoading();
        this.$message.error('信息填写不完整');
        return false;
      }
      //短信验证
      var phonereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!phonereg.test(this.forgetForm.phone)||this.forgetForm.phone.length!=11) {
        uni.hideLoading();
        this.$message.error('手机号不正确');
        return false;
      } 
      if (!/^\d{4}$/.test(this.forgetForm.code)) {
        uni.hideLoading();
        this.$message.error('验证码是4位纯数字');
        return false;
      }
      //用户名和密码验证
      if(this.forgetForm.password1.length<8||this.forgetForm.password1.length>16){
        uni.hideLoading();
        this.$message.error('密码必须是8-16位数字和字母');
        return false;
      }
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.forgetForm.password1)) {
        uni.hideLoading();
        this.$message.error('密码必须包含数字、字母');
        return false;
      }
      if(this.forgetForm.password1!=this.forgetForm.password2){
        uni.hideLoading();
        this.$message.error("两次输入的密码不一致");
        return false;
      }
      // 注册新用户
      var params = {
          phone:this.phone,
          code:this.code,
          pwd:this.pwd,
          pwd1:this.pwd1,
          name:this.name
        };

    //   reg(params).then(res=>{
    //     if(res.code==200){
    //       uni.hideLoading();
    //       this.$message.success("注册成功，请登录")
    //       this.$router.push("../login/login");
    //     } else {
    //       uni.hideLoading();
    //       this.$message.error(res.msg);
    //       return false;
    //     }
    //   });
    }
  }
};
</script>

<style>
	.registerContainer {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.loginContainer {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.registerInner {
		width: 80%;
		margin: 0 auto;
		padding-top: 60px;
	}
	.login{
		font-size: 14px;
		color: #999;
		position:fixed;
		bottom:20px; 
		width: 100%;
		text-align: center;
	}
  .login a {
		text-decoration: none;
		color: #0faeff;
	}
	.registerInner .register_header .register_logo {
		color: #0faeff;
		font-weight: bolder;
		font-size: 40px;
		text-align: center;
	}

	.register_header .register_header_title {
		text-align: center;
		padding-top: 40px;
	}

	.register_header_title a {
		text-decoration: none;
		font-size: 14px;
		color: #333;
		padding-bottom: 4px;
	}

	.register_header_title a:first-child {
		margin-right: 40px;
	}
  .isStudent {
		width: 100%;
		height: 100%;
    color: #333;
    margin-left:100rpx;
  }
	.register_header_title a.on {
		color: #0faeff;
		font-weight: bolder;
		border-bottom: 2px solid #0faeff;
	}

	.register_content form div.on {
		display: block;
	}

	.register_content form input {
		width: 100%;
		height: 100%;
		border: 1px solid #ddd;
		border-radius: 4px;
		outline: none;
		padding-left: 10px;
		box-sizing: border-box;

	}

	.register_content form input:focus {
		border: 1px solid #0faeff;
	}

	.user_message {
		position: relative;
		margin-top: 16px;
		height: 48px;
		font-size: 14px;
		background: #fff;
	}

	.register_message {
		position: relative;
		margin-top: 16px;
		height: 48px;
		font-size: 14px;
		background: #fff;
	}

	.register_message .get_verification {
		position: absolute;
		top: 50%;
		right: 10px;
		transform: translateY(-50%);
		border: none;
		color: #ccc;
		background: transparent;
		font-size: 14px;
	}

	.register_message .get_verification.right_phone {
		color: #000;
	}

	.register_hint {
		text-align: center;
		color: #999;
		margin-top: 12px;
		font-size: 14px;
		line-height: 20px;
	}

	.register_hint a {
		text-decoration: none;
		color: #0faeff;
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

	.register_submit {
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
	.register_hint {
		color: #999;
		margin-top: 12px;
		font-size: 14px;
		line-height: 20px;
	}
	
	register_hint a {
		text-decoration: none;
		color: #0faeff;
	}
a {
  text-decoration: none;
  color: black;
}
.router-link-active {
  text-decoration: none;
}
.getyzm{
	display: flex;
	font-size: 5px;
}
</style>

 
 
 