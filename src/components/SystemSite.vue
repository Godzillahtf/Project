<template>
  <div id="systemSite">
    <el-tabs v-model="activeName">
      <el-tab-pane label="RS-232" name="first">
        <Rs232 />
      </el-tab-pane>
      <el-tab-pane label="安全服务" name="second">
        <SafetyService />
      </el-tab-pane>
      <el-tab-pane label="验证方法" name="third">
        <VerificationMethod />
      </el-tab-pane>
      <el-tab-pane label="报警查询" name="fourth">
        <UserOnline />
      </el-tab-pane>
      <el-tab-pane label="设备" name="fifth">
        <Equipment />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Rs232 from "../components/SystemSite/RS-232";
import SafetyService from "../components/SystemSite/SafetyService";
import VerificationMethod from "../components/SystemSite/VerificationMethod";
import UserOnline from "../components/SystemSite/UserOnline";
import Equipment from "../components/SystemSite/Equipment";

export default {
  name: "systemSite",
  components: {
    Rs232,
    SafetyService,
    VerificationMethod,
    UserOnline,
    Equipment
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
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>