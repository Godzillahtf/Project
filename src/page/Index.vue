<template>
  <div id="index">
    <Header></Header>
    <el-row class="tac">
      <el-col :span="6">
        <el-menu class="el-menu-vertical-demo" @select="changePage">
          <el-menu-item index="Live">
            <i class="iconfont icon-shexiangtou"></i>
            <span slot="title">实时预览</span>
          </el-menu-item>
          <el-menu-item index="Smart">
            <i class="iconfont icon-shexiangtou"></i>
            <span slot="title">智能识别</span>
          </el-menu-item>
          <el-menu-item index="LocalSite">
            <i class="iconfont icon-shexiangtou"></i>
            <span slot="title">本地配置</span>
          </el-menu-item>
          <el-submenu index="siteSystem">
            <template slot="title">
              <i class="iconfont icon-set"></i>
              <span slot="title">系统配置</span>
            </template>
            <el-menu-item index="SystemSite">系统设置</el-menu-item>
            <el-menu-item index="SystemMaintain">系统维护</el-menu-item>
            <el-menu-item index="SafetyManagement">安全管理</el-menu-item>
            <el-menu-item index="UserManagement">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="siteInternet">
            <template slot="title">
              <i class="iconfont icon-set"></i>
              <span slot="title">网络配置</span>
            </template>
            <el-menu-item index="BasicSite">基本配置</el-menu-item>
            <el-menu-item index="AdvancedSite">高级配置</el-menu-item>
          </el-submenu>
          <el-menu-item index="VideoAideo">
            <i class="iconfont icon-shexiangtou"></i>
            <span slot="title">视音频</span>
          </el-menu-item>
          <el-menu-item index="Images">
            <i class="iconfont icon-shexiangtou"></i>
            <span slot="title">图像</span>
          </el-menu-item>
          <el-menu-item index="Storage">
            <i class="iconfont icon-shexiangtou"></i>
            <span slot="title">存储</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="15">
        <component v-bind:is="componentName"></component>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/Header";
import Live from "../components/Live";
import Smart from "../components/Smart";
import LocalSite from "../components/LocalSite";
import SafetyManagement from "../components/SafetyManagement";
import VideoAideo from "../components/VideoAideo";
import UserManagement from "../components/UserManagement";
import SystemSite from "../components/SystemSite";
import SystemMaintain from "../components/SystemMaintain";
import Storage from "../components/Storage";
import Images from "../components/image";
import BasicSite from "../components/BasicSite";
import AdvancedSite from "../components/AdvancedSite";

export default {
  name: "index",
  components: {
    Header,
    Live,
    Smart,
    LocalSite,
    SafetyManagement,
    VideoAideo,
    UserManagement,
    SystemSite,
    SystemMaintain,
    Storage,
    Images,
    BasicSite,
    AdvancedSite
  },
  data() {
    return {
      componentName: "Live"
    };
  },
  methods: {
    changePage: function(index, indexPath) {
      this.componentName = index;
      console.log(this.componentName);
    },
    created() {}
  },
  mounted() {}
};
</script>

<style>
@import "../assets/icon/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
</style>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
}
</style>
