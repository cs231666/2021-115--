import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Class from "@/components/Class";
import ClassTeacher from "@/components/ClassTeacher";
import Create from "@/components/Create";
import Search from "@/components/Search";
import Join from "@/components/Join";
import Classdetail from "@/components/Classdetail";
import ClassTeacherdetail from "@/components/ClassTeacherdetail";
import Signed from "@/components/Signed";
import Activity from "@/components/Activity";
import Information from "@/components/Information";
import SignedTeacher from "@/components/SignedTeacher";
import Login from "@/components/Login";
import EditPassword from "@/components/EditPassword";
import EditUserInfo from "@/components/EditUserInfo";
import Code from "@/components/Code";
import CodeTeacher from "@/components/CodeTeacher";
import UserInfo from "@/components/UserInfo";
import ForgetPwd from "@/components/ForgetPwd";
import Cookies from "js-cookie";
import cookie from "../util/cookie";
import Scan from "@/components/Scan";
import Register from "@/components/Register"
import IdentityInfo from "@/components/IdentityInfo";
import callback from "@/components/callback"
Vue.use(cookie);
Vue.use(Router);
Vue.use(Cookies);
const router = new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/class",
      name: "Class",
      component: Class
    },
    {
      path: "/information",
      name: "Information",
      component: Information
    },
    {
      path: "/activity",
      name: "Activity",
      component: Activity
    },
    {
      path: "/edituserinfo",
      name: "EditUserInfo",
      component: EditUserInfo
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/classteacher",
      name: "ClassTeacher",
      component: ClassTeacher
    },
	{
	  path: "/callback",
	  name: "callback",
	  component: callback
	},
    {
      path: "/create",
      name: "Create",
      component: Create
    },
    {
      path: "/join",
      name: "Join",
      component: Join
    },
    {
      path: "/classdetail",
      name: "Classdetail",
      component: Classdetail,
      meta: { keepAlive: true }
    },
    {
      path: "/classteacherdetail",
      name: "ClassTeacherdetail",
      component: ClassTeacherdetail
    },
    {
      path: "/signed",
      name: "Signed",
      component: Signed
    },
    {
      path: "/signedTeacher",
      name: "SignedTeacher",
      component: SignedTeacher
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/editpassword",
      name: "EditPassword",
      component: EditPassword
    },
    {
      path: "/code",
      name: "Code",
      component: Code
    },
    {
      path: "/codeteacher",
      name: "CodeTeacher",
      component: CodeTeacher
    },
    {
      path: "/userinfo",
      name: "UserInfo",
      component: UserInfo
    },
	{
	  path: "/dashboard",
	  name: "UserInfo",
	  component: UserInfo
	},
    {
      path: "/scan",
      name: "Scan",
      component: Scan
    },
    {
      path: "/register",	
      name: "Register",
      component: Register
    },
    {
      path: "/forgetPwd",	
      name: "ForgetPwd",
      component: ForgetPwd
    },
    {
      path: "/identityinfo",	
      name: "IdentityInfo",
      component: IdentityInfo
    },    

  ]
});
router.beforeEach((to, from, next) => { // 路由拦截器
	console.log(to.path)
	if ((to.path === "/login")||(to.path === "/register")||(to.path === "/callback")) return next();
	const tokenStr = window.localStorage.getItem("token");
	if (!tokenStr) return next("/login");
	if ((to.path === "/")&&(!tokenStr)) return next("/userinfo");
	next();
});
export default router;
