<template>
  <div id="advancedSite">
    <el-tabs v-model="activeName">
      <el-tab-pane label="802.1x" name="first">
        <x8021 />
      </el-tab-pane>
      <el-tab-pane label="FTP" name="second">
        <FTPSite />
      </el-tab-pane>
      <el-tab-pane label="HTTPS" name="third">
        <HTTPSSite />
      </el-tab-pane>
      <el-tab-pane label="QoS" name="fourth">
        <Qos />
      </el-tab-pane>
      <el-tab-pane label="SNMP" name="fifth">
        <SNMPSite />
      </el-tab-pane>
      <el-tab-pane label="网络服务" name="sixth">
        <InternetService />
      </el-tab-pane>
      <el-tab-pane label="平台访问" name="seventh">
        <PlatFormAccess />
      </el-tab-pane>
      <el-tab-pane label="整合协议" name="righth">
        <IntegrationProtocol />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import x8021 from "./SitePage/AdvancedSite/802.1x";
import FTPSite from "./SitePage/AdvancedSite/FTPSite";
import HTTPSSite from "./SitePage/AdvancedSite/HTTPSSite";
import Qos from "./SitePage/AdvancedSite/Qos";
import SNMPSite from "./SitePage/AdvancedSite/SNMPSite";
import PlatFormAccess from "./SitePage/AdvancedSite/PlatFormAccess";
import InternetService from "./SitePage/AdvancedSite/InternetService";
import IntegrationProtocol from "./SitePage/AdvancedSite/IntegrationProtocol";
export default {
  name: "advancedSite",
  components: {
    x8021,
    FTPSite,
    HTTPSSite,
    Qos,
    SNMPSite,
    PlatFormAccess,
    InternetService,
    IntegrationProtocol
  },
  data() {
    return { activeName: "first" };
  }
};
</script>
<style scoped>
#advancedSite {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>