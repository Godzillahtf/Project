import Vue from "vue";
import Router from "vue-router";
import Login from "@/page/Login";
import Index from "@/page/Index";
import Index1 from "@/page/Index1";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/index1",
      name: "Index1",
      component: Index1
    }
  ]
});
