import Vue from "vue";
import Router from "vue-router";
import Login from "@/page/Login";
import Index from "@/page/Index";
import Site from "@/page/Site";

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
      path: "/site",
      name: "Site",
      component: Site
    }
  ]
});
