<template>
  <div>
    <mt-header title="个人信息">
      <router-link to="/userinfo" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>      
    </mt-header>
    <div class="infoDiv">
      <mt-field label="旧密码" placeholder="请输入当前密码" type="password" v-model="editForm.prepassword"></mt-field>
      <mt-field label="新密码" placeholder="请输入修改后的密码" type="password" v-model="editForm.password1"></mt-field>
      <mt-field
        label="确认新密码"
        placeholder="请再次输入修改后的密码"
        type="password"
        v-model="editForm.password2"
      ></mt-field>
    </div>
    <mt-button type="primary" @click.native="editPassword" size="large">确定</mt-button>
  </div>
</template>

<script>
import { Cell } from "mint-ui";
import moment from "moment";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      editForm: {
        prepassword: "123456",
        password1: "123456",
        password2: "123456"
      }
    };
  },
  methods: {
  }
};
</script>

<style lang='scss'>
	$hei: 65px;
	.mineCom {
		.content-list {
			.mint-cell-value {
				span {
					font-size: 13px;
				}
			}
		}
		.content {
			.content-tabs {
				// align-items: center;
				// min-height: $hei;
				display: flex;
				background-color: white;
				div {
					padding: 12px 0px;
					text-align: center; // display: flex;
					// align-items: center;
					// height: $hei;
					text-align: center;
					border-right: 1px solid rgb(229, 229, 229);
					flex: 1;
					h3 {
						font-size: 20px;
						color: rgb(244, 180, 21);
					}
					&:last-child {
						border-right: none;
					}
				}
			}
			.header {
				min-height: 80px;
				width: 100%;
				display: flex;
				align-items: center;
				.left {
					flex: 0.5;
					text-align: left;
					img {
						width: 50px;
						height: 50px;
						margin-left: 20px;
						border-radius: 50%;
					}
				}
				.title {
					flex: 1;
					color: white;
				}
				.right {
					flex: 0.5;
					text-align: right;
					img {
						width: 16px;
						margin-right: 20px;
					}
				}
			}
		}
	}
.infoDiv {
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10%;
  border: 1px solid #96c2f1;
  background: #eff7ff;
  border-radius: 5px;
}
</style>