<template>
  <div id="index">
    <Header></Header>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             @select="changePage">
      <el-menu-item index="live">
        <i class="iconfont icon-shexiangtou"></i>
        <span slot="title">实时预览</span>
      </el-menu-item>
      <el-menu-item index="smart">
        <i class="iconfont icon-shexiangtou"></i>
        <span slot="title">智能识别</span>
      </el-menu-item>
      <el-menu-item index="smart">
        <i class="iconfont icon-shexiangtou"></i>
        <span slot="title">本地配置</span>
      </el-menu-item>
      <el-submenu index="site">
        <template slot="title">
          <i class="iconfont icon-set"></i>
          <span slot="title">系统配置</span>
        </template>
        <el-menu-item index="1-3">系统设置</el-menu-item>
        <el-menu-item index="1-3">系统维护</el-menu-item>
        <el-menu-item index="1-3">安全管理</el-menu-item>
        <el-menu-item index="1-3">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="site1">
        <template slot="title">
          <i class="iconfont icon-set"></i>
          <span slot="title">网络配置</span>
        </template>
        <el-menu-item index="1-3">基本配置</el-menu-item>
        <el-menu-item index="1-3">高级配置</el-menu-item>
      </el-submenu>
      <el-menu-item index="smart">
        <i class="iconfont icon-shexiangtou"></i>
        <span slot="title">视音频</span>
      </el-menu-item>
      <el-menu-item index="smart">
        <i class="iconfont icon-shexiangtou"></i>
        <span slot="title">图像</span>
      </el-menu-item>
      <el-menu-item index="smart">
        <i class="iconfont icon-shexiangtou"></i>
        <span slot="title">存储</span>
      </el-menu-item>
    </el-menu>
    <component v-bind:is="componentName"></component>
  </div>
</template>

<script >
import Header from "../components/Header";
import componentlive from "../components/componentLive";
import componentsmart from "../components/componentSmart";
import componentsite from '../components/componentSite';
export default {
  name: "index",
  components: {
    Header,
    componentlive,
    componentsmart,
    componentsite
  },
  data () {
    return {
      componentName: "componentlive"
    }  },
  methods: {
    changePage: function (index, indexPath) {
      this.componentName = "component" + index;
      console.log(this.componentName);
    },
    created () { }
  },
  mounted () { }
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
