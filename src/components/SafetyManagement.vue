<template>
  <div id="safetyManagement">
    <el-tabs v-model="activeName">
      <el-tab-pane label="安全服务" name="first">
        <SafetyService />
      </el-tab-pane>
      <el-tab-pane label="IP" name="second">
        <IPFiltering />
      </el-tab-pane>
      <el-tab-pane label="验证方法" name="third">
        <VerificationMethod />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import IPFiltering from "./SitePage/SafetyManagement/IPFiltering";
import SafetyService from "./SitePage/SafetyManagement/SafetyService";
import VerificationMethod from "./SitePage/SafetyManagement/VerificationMethod";

export default {
  name: "safetyManagement",
  components: {
    IPFiltering,
    SafetyService,
    VerificationMethod
  },
  data() {
    return { activeName: "first" };
  }
};
</script>
<style scoped>
#safetyManagement {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>