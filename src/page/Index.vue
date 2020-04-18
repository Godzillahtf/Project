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
          <el-menu-item index="LocalSite">
            <i class="iconfont icon-bendi"></i>
            <span slot="title">本地配置</span>
          </el-menu-item>
          <el-menu-item index="SystemSite">
            <i class="iconfont icon-shezhi"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
          <el-menu-item index="ArmingSite">
            <i class="iconfont icon-jingbao"></i>
            <span slot="title">布防设置</span>
          </el-menu-item>
          <el-menu-item index="DeviceSite">
            <i class="iconfont icon-shebei"></i>
            <span slot="title">设备配置</span>
          </el-menu-item>
          <el-menu-item index="GroupSite">
            <i class="iconfont icon-fenzu"></i>
            <span slot="title">分组配置</span>
          </el-menu-item>
          <el-menu-item index="CameraControl">
            <i class="iconfont icon-kongzhi"></i>
            <span slot="title">相机控制</span>
          </el-menu-item>
          <el-menu-item index="MapSite">
            <i class="iconfont icon-ditu"></i>
            <span slot="title">地图配置</span>
          </el-menu-item>
          <el-menu-item index="Picture">
            <i class="iconfont icon-tupian"></i>
            <span slot="title">设备抓图</span>
          </el-menu-item>
          <el-menu-item index="User">
            <i class="iconfont icon-yonghu"></i>
            <span slot="title">账户管理</span>
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
import LocalSite from "../components/LocalSite";
import SystemSite from "../components/SystemSite";
import ArmingSite from "../components/ArmingSite";
import DeviceSite from "../components/DeviceSite";
import GroupSite from "../components/GroupSite";
import CameraControl from "../components/CameraControl";
import MapSite from "../components/MapSite";
import Picture from "../components/Picture";
import User from "../components/User";

export default {
  name: "index",
  components: {
    GroupSite,
    CameraControl,
    MapSite,
    DeviceSite,
    ArmingSite,
    SystemSite,
    LocalSite,
    Header,
    Live,
    Picture,
    User
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
/* #index {
  background: url("../assets/123.jpg") center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
  background-repeat: no-repeat;
} */
</style>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 680px;
}
</style>
