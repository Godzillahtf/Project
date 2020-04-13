import Vue from "vue";
import Router from "vue-router";
import Login from "@/page/Login";
import Index from "@/page/Index";
import Signup from "@/page/SignUp";
import Password from "@/page/Password";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/index/:name",
      name: "Index",
      component: Index
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/password",
      name: "Password",
      component: Password
    }
  ]
});
