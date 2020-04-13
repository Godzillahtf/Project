<template>
  <div id="user">
    <el-form label-position="left" label-width="150px">
      <el-table style="width:100%" :data="tableData">
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          fixed
          prop="username"
          label="用户名"
          width="200"
        ></el-table-column>
        <el-table-column
          fixed
          prop="usertype"
          label="用户类型"
          width="200"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, tableData)"
              >删除</el-button
            >
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
              <el-form
                :model="userform"
                label-position="left"
                label-width="100px"
              >
                <el-form-item label="用户名">
                  <el-input
                    v-model="userform.username"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input
                    v-model="userform.validateCode"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input
                    v-model="userform.password"
                    auto-complete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户权限">
                  <el-select
                    v-model="userform.userAuthority"
                    multiple
                    placeholder="请选择"
                    style="width:630px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeUser(index)"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="mini" @click="handleEdit(tableData.length)"
        >添加</el-button
      >
    </el-form>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      checked: "true",
      dialogFormVisible: false,
      userform: {
        username: "",
        userAuthority: "",
        validateCode: "",
        password: ""
      },
      index: -1,
      tableData: [
        {
          username: "admin1",
          usertype: "子账户",
          userAuthority: "",
          password: "123456"
        },
        {
          username: "admin2",
          usertype: "子账户",
          userAuthority: "",
          password: "123456"
        }
      ],
      options: [
        {
          value: "1",
          label: "本地配置"
        },
        {
          value: "2",
          label: "系统配置"
        },
        {
          value: "3",
          label: "布防设置"
        },
        {
          value: "4",
          label: "设备设置"
        },
        {
          value: "5",
          label: "分组设置"
        },
        {
          value: "6",
          label: "相机控制"
        },
        {
          value: "7",
          label: "地图配置"
        },
        {
          value: "8",
          label: "设备抓图"
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
#user {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
