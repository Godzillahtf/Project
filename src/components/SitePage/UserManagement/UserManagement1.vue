<template>
  <div id="userManagement1">
    <el-form label-position="left" label-width="80px">
      <el-table style="width:100%" :data="tableData">
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column fixed prop="username" label="用户名" width="150"></el-table-column>
        <el-table-column fixed prop="usertype" label="用户类型" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
              <el-form :model="userform">
                <el-form-item label="用户名">
                  <el-input v-model="userform.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                  <el-input v-model="userform.usertype" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="userform.password" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeUser(index)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="mini" @click="handleEdit(tableData.length)">添加</el-button>
      <el-button size="mini" @click="safeProblem()">安全问题</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "userManagement1",
  data() {
    return {
      checked: "true",
      dialogFormVisible: false,
      userform: {
        username: "",
        usertype: "",
        password: ""
      },
      index: -1,
      tableData: [
        {
          username: "admin1",
          usertype: "管理员",
          password: "123456"
        },
        {
          username: "admin2",
          usertype: "管理员",
          password: "123456"
        }
      ]
    };
  },
  methods: {
    handleEdit(index) {
      this.dialogFormVisible = true;
      this.index = index;
    },
    handleDelete(index, row) {
      row.splice(index, 1);
    },
    changeUser(index) {
      this.tableData[this.index] = {
        username: this.userform.username,
        usertype: this.userform.usertype,
        password: this.userform.password
      };
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>