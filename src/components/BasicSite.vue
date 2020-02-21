<template>
  <div id="basicSite">
    <el-tabs v-model="activeName">
      <el-tab-pane label="DDNS" name="first">
        <DDNSSite />
      </el-tab-pane>
      <el-tab-pane label="节点" name="second">
        <PortSite />
      </el-tab-pane>
      <el-tab-pane label="PPPoE" name="third">
        <PPPoESite />
      </el-tab-pane>
      <el-tab-pane label="TCP/IP" name="fourth">
        <TCPIPSite />
      </el-tab-pane>
      <el-tab-pane label="节点映射" name="fifth">
        <PortMapping />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DDNSSite from "./SitePage/BasicSite/DDNSSite";
import PortSite from "./SitePage/BasicSite/PortSite";
import PPPoESite from "./SitePage/BasicSite/PPPoESite";
import TCPIPSite from "./SitePage/BasicSite/TCP-IPSite";
import PortMapping from "./SitePage/BasicSite/PortMapping";
export default {
  name: "basicSite",
  components: {
    DDNSSite,
    PortSite,
    PPPoESite,
    PortMapping,
    TCPIPSite
  },
  data() {
    return { activeName: "first" };
  }
};
</script>
<style scoped>
#basicSite {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>