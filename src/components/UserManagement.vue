<template>
  <div id="userManagement">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <UserManagement />
      </el-tab-pane>
      <el-tab-pane label="在线用户" name="second">
        <UserOnline />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import UserManagement from "./SitePage/UserManagement/UserManagement";
import UserOnline from "./SitePage/UserManagement/UserOnline";
export default {
  name: "userManagement",
  components: {
    UserManagement,
    UserOnline
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
<style scoped>
#userManagement {
  position: relative;
  padding: 50px;
  bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>