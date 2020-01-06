<template>
  <div id="systemSite">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <BasicMessage />
      </el-tab-pane>
      <el-tab-pane label="时间设置" name="second">
        <TimeSite />
      </el-tab-pane>
      <el-tab-pane label="夏令时" name="third">
        <XiaShiLing />
      </el-tab-pane>
      <el-tab-pane label="RS-232" name="fourth">
        <Rs232 />
      </el-tab-pane>
      <el-tab-pane label="设备" name="fifth">
        <Equipment />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BasicMessage from "./SitePage/SystemSite/BasicMessage";
import Equipment from "./SitePage/SystemSite/Equipment";
import Rs232 from "./SitePage/SystemSite/RS-232";
import TimeSite from "./SitePage/SystemSite/TimeSite";
import XiaShiLing from "./SitePage/SystemSite/XiaShiLing";

export default {
  name: "systemSite",
  components: {
    BasicMessage,
    Equipment,
    Rs232,
    TimeSite,
    XiaShiLing
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
<style scoped>
#systemSite {
  position: relative;
  padding: 50px;
  bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>