<template>
  <div id="ipFiltering">
    <el-form label-position="left" label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked">启用IP地址过滤</el-checkbox>
      </el-form-item>
      <el-table style="width:100%" :data="tableData">
        <el-table-column fixed type="index" label="序号" width="100"></el-table-column>
        <el-table-column fixed prop="IP" label="IP" width="400"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
            <el-dialog title="IP地址" :visible.sync="dialogFormVisible">
              <el-form>
                <el-form-item label="IP">
                  <el-input v-model="IPaddress" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeIP(index)">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="mini" @click="handleEdit(tableData.length)">添加</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ipFiltering",
  data() {
    return {
      checked: "true",
      dialogFormVisible: false,
      IPaddress: "",
      index: -1,
      tableData: [
        {
          IP: "192.168.1.1"
        },
        {
          IP: "192.168.1.2"
        },
        {
          IP: "192.168.1.3"
        },
        {
          IP: "192.168.1.4"
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
    changeIP(index) {
      this.tableData[this.index] = { IP: this.IPaddress };
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