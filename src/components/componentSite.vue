<template>
  <div id="site">
    <el-menu class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#ffffff"
             text-color="#000000"
             active-text-color="#ffd04b">
      <el-menu-item index="LocalSite">本地</el-menu-item>
      <el-submenu index="2">
        <template slot="title">系统</template>
        <el-submenu index="2-1">
          <template slot="title">系统设置</template>
          <el-menu-item index="BasicMessage">基本信息</el-menu-item>
          <el-menu-item index="TimeSite">时间配置</el-menu-item>
          <el-menu-item index="XiaShiLing">夏令时</el-menu-item>
          <el-menu-item index="RS232">RS-232</el-menu-item>
          <el-menu-item index="Equipment">关于设备</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2"> <template slot="title">系统维护</template>
          <el-menu-item index="RemoveMaintain">升级维护</el-menu-item>
          <el-menu-item index="SystemService">系统服务</el-menu-item>
        </el-submenu>
        <el-submenu index="2-3"> <template slot="title">安全管理</template>
          <el-menu-item index="VerificationMethod">认证方式</el-menu-item>
          <el-menu-item index="IPFiltering">IP地址过滤</el-menu-item>
          <el-menu-item index="SafetyService">安全服务</el-menu-item>
        </el-submenu>
        <el-submenu index="2-4">
          <template slot="title">用户管理</template>
          <el-menu-item index="UserManagement">用户管理</el-menu-item>
          <el-menu-item index="UserOnline">在线用户</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">网络</template>
        <el-submenu index="3-1">
          <template slot="title">基本配置</template>
          <el-menu-item index="TCPIPSite">TCP/IP</el-menu-item>
          <el-menu-item index="DDNSSite">DDNS</el-menu-item>
          <el-menu-item index="PPPoESite">PPPoE</el-menu-item>
          <el-menu-item index="PortSite">端口</el-menu-item>
          <el-menu-item index="PortMapping">端口映射</el-menu-item>
        </el-submenu>
        <el-submenu index="3-2"> <template slot="title">高级配置</template>
          <el-menu-item index="SNMPSite">SNMP</el-menu-item>
          <el-menu-item index="FTPSite">FTP</el-menu-item>
          <el-menu-item index="PlatFormAccess">平台接入</el-menu-item>
          <el-menu-item index="HTTPSSite">HTTPS</el-menu-item>
          <el-menu-item index="QoS">QoS</el-menu-item>
          <el-menu-item index="c8021x">802.1x</el-menu-item>
          <el-menu-item index="IntegrationProtocol">集成协议</el-menu-item>
          <el-menu-item index="InternetService">网络服务</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">视音频</template>
        <el-menu-item index="Video">视频</el-menu-item>
        <el-menu-item index="ROI">ROI</el-menu-item>
        <!-- <el-menu-item index="4-3">码流信息叠加</el-menu-item> -->
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">图像</template>
        <el-menu-item index="DisplaySite">显示设置</el-menu-item>
        <el-menu-item index="OSDSite">OSD设置</el-menu-item>
        <el-menu-item index="Obscuration">视频遮盖</el-menu-item>
      </el-submenu>
    </el-menu>
    <component v-bind:is="componentName"></component>
  </div>
</template>
<script >
import LocalSite from "./SitePage/LocalSite";
import c8021x from "./SitePage/AdvancedSite/802.1x";
import FTPSite from "./SitePage/AdvancedSite/FTPSite";
import HTTPSSite from "./SitePage/AdvancedSite/HTTPSSite";
import IntegrationProtocol from "./SitePage/AdvancedSite/IntegrationProtocol";
import InternetService from "./SitePage/AdvancedSite/InternetService";
import PlatFormAccess from "./SitePage/AdvancedSite/PlatFormAccess";
import QoS from "./SitePage/AdvancedSite/QoS";
import SNMPSite from "./SitePage/AdvancedSite/SNMPSite";
import DDNSSite from "./SitePage/BasicSite/DDNSSite";
import PortMapping from "./SitePage/BasicSite/PortMapping";
import PortSite from "./SitePage/BasicSite/PortSite";
import PPPoESite from "./SitePage/BasicSite/PPPoESite";
import TCPIPSite from "./SitePage/BasicSite/TCP-IPSite";
import DisplaySite from "./SitePage/Image/DisplaySite";
import Obscuration from "./SitePage/Image/Obscuration";
import OSDSite from "./SitePage/Image/OSDSite";
import IPFiltering from "./SitePage/SafetyManagement/IPFiltering";
import SafetyService from "./SitePage/SafetyManagement/SafetyService";
import VerificationMethod from "./SitePage/SafetyManagement/VerificationMethod";
import RemoveMaintain from "./SitePage/SystemMaintain/RemoveMaintain";
import SystemService from "./SitePage/SystemMaintain/SystemService";
import BasicMessage from "./SitePage/SystemSite/BasicMessage";
import Equipment from "./SitePage/SystemSite/Equipment";
import RS232 from "./SitePage/SystemSite/RS-232";
import TimeSite from "./SitePage/SystemSite/TimeSite";
import XiaShiLing from "./SitePage/SystemSite/XiaShiLing";
import UserManagement from "./SitePage/UserManagement/UserManagement";
import UserOnline from "./SitePage/UserManagement/UserOnline";
import ROI from "./SitePage/VideoAideo/ROI";
import Video from "./SitePage/VideoAideo/Video";

export default {
  name: 'Site',
  components: {
    LocalSite,
    c8021x,
    FTPSite,
    HTTPSSite,
    IntegrationProtocol,
    InternetService,
    PlatFormAccess,
    QoS,
    SNMPSite,
    DDNSSite,
    PortMapping,
    PortSite,
    PPPoESite,
    TCPIPSite,
    DisplaySite,
    Obscuration,
    OSDSite,
    IPFiltering,
    SafetyService,
    VerificationMethod,
    RemoveMaintain,
    SystemService,
    BasicMessage,
    Equipment,
    RS232,
    TimeSite,
    XiaShiLing,
    UserManagement,
    UserOnline,
    ROI,
    Video
  },
  data () {
    return {
      componentName: "LocalSite"
    }
  },
  methods: {
    handleSelect: function (key, keyPath) {
      componentName = keyPath[keyPath.length - 1];
      console.log(keyPath[keyPath.length - 1]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#site {
  position: relative;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 50px;
}
</style>
