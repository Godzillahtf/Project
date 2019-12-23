import Vue from "vue";
import Router from "vue-router";
import Login from "@/page/Login";
import Index from "@/page/Index";
import LocalSite from "@/components/LocalSite";
import SystemSite from "@/components/SystemSite";
import Header from "@/components/Header";
import HeadMenu from "@/components/HeadMenu";
import SystemMaintain from "@/components/SystemMaintain";
import SafetyManagement from "@/components/SafetyManagement";
import UserManagement from "@/components/UserManagement";

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
      path: "/header",
      name: "Header",
      component: Header
    },
    {
      path: "/localsite",
      name: "Localsite",
      component: LocalSite
    },
    {
      path: "/systemsite",
      name: "SystemSite",
      component: SystemSite
    },
    {
      path: "/systemmaintain",
      name: "SystemMaintain",
      component: SystemMaintain
    },
    {
      path: "/safetymanagement",
      name: "SafetyManagement",
      component: SafetyManagement
    },
    {
      path: "/usermanagement",
      name: "UserManagement",
      component: UserManagement
    },
    {
      path: "/headmenu",
      name: "HeadMenu",
      component: HeadMenu
    }
  ]
});
