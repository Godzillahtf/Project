<template>
  <div id="deviceSite">
    <el-tabs v-model="activeName">
      <el-tab-pane label="版本信息" name="first">
        <Version />
      </el-tab-pane>
      <el-tab-pane label="通道信息" name="second">
        <Passage />
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="third">
        <BasicMessage />
      </el-tab-pane>
      <el-tab-pane label="状态信息" name="fourth">
        <Status />
      </el-tab-pane>
      <el-tab-pane label="时间校验" name="fifth">
        <TimeSite />
      </el-tab-pane>
      <el-tab-pane label="夏时令" name="sixth">
        <XiaShiLing />
      </el-tab-pane>
      <el-tab-pane label="设备恢复" name="seventh">
        <RemoveMaintain />
      </el-tab-pane>
      <el-tab-pane label="流量信息" name="eigth">
        <Flow />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BasicMessage from "../components/DeviceSite/BasicMessage";
import Version from "../components/DeviceSite/Version";
import Passage from "../components/DeviceSite/Passage";
import Status from "../components/DeviceSite/Status";
import TimeSite from "../components/DeviceSite/TimeSite";
import XiaShiLing from "../components/DeviceSite/XiaShiLing";
import RemoveMaintain from "../components/DeviceSite/RemoveMaintain";
import Flow from "../components/DeviceSite/Flow";

export default {
  name: "deviceSite",
  components: {
    BasicMessage,
    Version,
    Passage,
    Status,
    TimeSite,
    XiaShiLing,
    RemoveMaintain,
    Flow
  },
  data() {
    return { activeName: "first" };
  }
};
</script>
<style scoped>
#deviceSite {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>