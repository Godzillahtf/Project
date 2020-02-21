<template>
  <div id="systemMaintain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统服务" name="first">
        <SystemService />
      </el-tab-pane>
      <el-tab-pane label="升级维护" name="second">
        <RemoveMaintain />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import RemoveMaintain from "./SitePage/SystemMaintain/RemoveMaintain";
import SystemService from "./SitePage/SystemMaintain/SystemService";
export default {
  name: "systemMaintain",
  components: {
    RemoveMaintain,
    SystemService
  },
  data() {
    return { activeName: "first" };
  }
};
</script>
<style scoped>
#systemMaintain {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>