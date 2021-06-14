<template>
  <div class="loginContainer">
    <div class="registerInner">
      <div class="register_header">欢迎注册到云鸭</div>
      <div class="register_content">
        <form>
          <!-- 短信登录 -->
          <div>
			<section class="register_message">
				<input type="tel" maxlength="11" placeholder="手机号" v-model="editForm.phone" />
				<button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{editForm.computeTime>0 ? `(${editForm.computeTime}s)已发送` : '获取验证码'}}</button>
			</section>
            <section class="register_verification">
              <input type="tel" maxlength="4" placeholder="验证码" v-model="editForm.code">
            </section>
            <section class="register_verification">
				<input type="text" maxlength="16" placeholder="密码" v-if="editForm.showPwd1" v-model="editForm.password1" />
				<input type="password" maxlength="16" placeholder="密码" v-else v-model="editForm.password1" />
				<section class="switch_button" :class="editForm.showPwd1 ? 'on' : 'off'" @click="editForm.showPwd1 = !editForm.showPwd1">
					<section class="switch_circle" :class="{right : editForm.showPwd1}"></section>
					<section class="switch_text">{{editForm.showPwd1 ? '' : ''}}</section>
				</section>              
            </section>
			<section class="register_verification">
				<input type="text" maxlength="16" placeholder="重复密码" v-if="editForm.showPwd2" v-model="editForm.password2" />
				<input type="password" maxlength="16" placeholder="重复密码" v-else v-model="editForm.password2" />
				<section class="switch_button" :class="editForm.showPwd2 ? 'on' : 'off'" @click="editForm.showPwd2 = !editForm.showPwd2">
					<section class="switch_circle" :class="{right : editForm.showPwd2}"></section>
					<section class="switch_text">{{editForm.showPwd2 ? '' : ''}}</section>
				</section>
			</section>
			<section class="user_message">
              <mt-switch  v-model="editForm.user">如果是老师请点击左侧按钮</mt-switch>
            </section>			
			<section class="register_hint">
				温馨提示：注册即表示您已阅读、理解并同意<br>
				<a href="javascript:;">《用户服务协议》</a>
			</section>
          </div>
          <button class="register_submit" @click="register_submit">注册</button>
        </form>
      </div>
    </div>
    <div class="login">已有账号？<router-link to='/login'><a>立即登录</a></router-link></div>
  </div>
</template>

<script>
import { MessageBox} from "mint-ui";
import { userRegisterByPwd } from "@/api/register.js"
import { getCode } from "@/api/register.js"
export default {
  name: "Register",
  data() {
    return {
      editForm: {
        code: '',//短信
        phone: '',//手机号
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
				return /^1[3456789]\d{9}$/.test(this.editForm.phone);
			}
		},  
  methods: {
    register_submit(){
        this.register();
    },
    async getCode() {
      if (!this.editForm.computeTime) {
        this.editForm.computeTime = 60;
        this.editForm.timer = setInterval(() => {
          this.editForm.computeTime--;
          if (this.editForm.computeTime <= 0) {
            clearInterval(this.editForm.timer)
          }
        }, 1000);
		let data = {
			phone : this.editForm.phone
		}
		getCode(data).then(response => {
		}).catch(err => {
			console.log(error)
		})
      }
    },
    async register() {
      if(this.editForm.phone.length==0||this.editForm.code.length==0||this.editForm.password1.length==0||this.editForm.password2.length==0){
        this.$message.error('信息填写不完整');
        return false;
      }
      //短信验证
      var phonereg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!phonereg.test(this.editForm.phone)||this.editForm.phone.length!=11) {
        this.$message.error('手机号不正确');
        return false;
      } 
      if (!/^\d{4}$/.test(this.editForm.code)) {
        this.$message.error('验证码是4位纯数字');
        return false;
      }
      //用户名和密码验证
      if(this.editForm.password1.length<8||this.editForm.password1.length>16){
        this.$message.error('密码必须是8-16位数字和字母');
        return false;
      }
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(this.editForm.password1)) {
        this.$message.error('密码必须包含数字、字母');
        return false;
      }
      if(this.editForm.password1!=this.editForm.password2){
        this.$message.error("两次输入的密码不一致");
        return false;
      }
      // 注册新用户
      let userInfo = {
		  "code" : this.editForm.code,
		  "password" : this.editForm.password1,
		  "role" : this.editForm.user?1:0,
		  "username" : this.editForm.phone
	  }

	  userRegisterByPwd(userInfo).then(response => {
		  if(response.data.code != 200){
			  console.log(response);
			  this.$message.error(response.data.msg);
			  return false;
		  }
		  else{
			  this.$message.success("注册成功，请登录");
			  this.$router.push("/login")
		  }
	  })
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
		margin-top: 15px;
		height: 25px;
		font-size: 18px;
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
		margin-top: 25px;
		text-align: center;
		color: #999;
		margin-top: 12px;
		font-size: 14px;
		line-height: 20px;
	}

	.register_hint a {
		height: 48px;
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

 
 
 