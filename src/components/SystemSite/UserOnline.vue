<template>
  <div id="userOnline">
    <el-form label-position="left" label-width="80px">
      <el-table style="width:100%" :data="tableData" class="table">
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="username" label="用户名" width="150"></el-table-column>
        <el-table-column fixed prop="usertype" label="用户类型" width="150"></el-table-column>
        <el-table-column fixed prop="IPaddress" label="IP地址" width="150"></el-table-column>
        <el-table-column fixed prop="usertime" label="用户操作时间" width="150"></el-table-column>
      </el-table>
      <el-button size="mini">刷新</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "userOnline",
  data() {
    return {
      tableData: [
        {
          username: "admin1",
          usertype: "管理员",
          password: "123456",
          IPaddress: "192.168.1",
          usertime: "111"
        },
        {
          username: "admin2",
          usertype: "管理员",
          password: "123456",
          IPaddress: "192.168.3",
          usertime: "111"
        },
        {
          username: "admin1",
          usertype: "管理员",
          password: "123456",
          IPaddress: "192.168.1",
          usertime: "111"
        },
        {
          username: "admin1",
          usertype: "管理员",
          password: "123456",
          IPaddress: "192.168.1",
          usertime: "111"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
/* .el-table::before {
  z-index: inherit;
} */
.table::before {
  z-index: inherit !important;
}
</style>