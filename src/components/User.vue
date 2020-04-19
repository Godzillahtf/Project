<template>
  <div id="user">
    <el-form label-position="left" label-width="150px">
      <el-table style="width:100%" :data="tableData">
        <el-table-column fixed type="index" label="序号" width="100"></el-table-column>
        <el-table-column fixed prop="userName" label="用户名" width="200"></el-table-column>
        <el-table-column fixed prop="userId" label="用户ID" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">更改权限</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row,tableData)"
            >删除</el-button>
            <el-dialog title="用户权限" :visible.sync="dialogFormVisible1" :append-to-body="true">
              <el-form :model="userAuthForm" label-position="left" label-width="100px">
                <el-form-item label="用户权限">
                  <el-select
                    v-model="userAuthForm.userAuthority"
                    multiple
                    placeholder="请选择用户权限"
                    style="width:630px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="changeAuth()">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible2" :append-to-body="true">
              <el-form :model="addUserForm" label-position="left" label-width="100px">
                <el-form-item label="用户名">
                  <el-input v-model="addUserForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input v-model="addUserForm.validateCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="addUserForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户权限">
                  <el-select
                    v-model="addUserForm.userAuthority"
                    multiple
                    placeholder="请选择"
                    style="width:630px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addNewUser">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-button size="mini" @click="dialogFormVisible2 = true" style="margin-top:15px;">添加</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      checked: "true",
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      userAuthForm: {
        userAuthority: ""
      },
      addUserForm: {
        username: "",
        validateCode: "",
        password: "",
        userAuthority: []
      },
      userId: "",
      tableData: [],
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
          label: "地图配置"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      this.userId = row.userId;
      this.$axios({
        url: this.defined.serviceURL + "/getAuth",
        method: "post",
        data: {
          userId: this.userId
        }
      })
        .then(res => {
          this.userAuthForm.userAuthority = this.$options.methods.showAuth(
            res.data.auth
          );
        })
        .catch(error => {
          console.log("err++", error);
        });
      this.dialogFormVisible1 = true;
    },
    handleDelete(index, row, data) {
      this.$axios({
        url: this.defined.serviceURL + "/deleteSon",
        method: "post",
        data: {
          userId: row.userId
        }
      })
        .then(res => {
          console.log("删除成功！");
          data.splice(index, 1);
        })
        .catch(error => {
          console.log("err++", error);
        });
    },
    changeAuth() {
      this.$axios({
        url: this.defined.serviceURL + "/updateAuth",
        method: "post",
        data: {
          userId: this.userId,
          localConfig:
            this.userAuthForm.userAuthority.indexOf("1") > -1 ? 1 : 0,
          systemConfig:
            this.userAuthForm.userAuthority.indexOf("2") > -1 ? 1 : 0,
          defenceConfig:
            this.userAuthForm.userAuthority.indexOf("3") > -1 ? 1 : 0,
          deviceConfig:
            this.userAuthForm.userAuthority.indexOf("4") > -1 ? 1 : 0,
          groupConfig:
            this.userAuthForm.userAuthority.indexOf("5") > -1 ? 1 : 0,
          mapConfig: this.userAuthForm.userAuthority.indexOf("6") > -1 ? 1 : 0
        }
      })
        .then(res => {
          console.log("修改成功！");
        })
        .catch(error => {
          console.log("err++", error);
        });
      this.dialogFormVisible1 = false;
    },
    showMessagge: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getSons",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          this.tableData = res.data.sons;
        })
        .catch(error => {
          console.log("err++", error);
        });
    },
    showAuth: function(auth) {
      var authArray = [];
      if (auth.localConfig === 1) authArray.push("1");
      if (auth.systemConfig === 1) authArray.push("2");
      if (auth.defenceConfig === 1) authArray.push("3");
      if (auth.deviceConfig === 1) authArray.push("4");
      if (auth.groupConfig === 1) authArray.push("5");
      if (auth.mapConfig === 1) authArray.push("6");
      return authArray;
    },
    addNewUser: function() {
      this.$axios({
        url: this.defined.serviceURL + "/registerSon",
        method: "post",
        data: {
          userId: this.defined.userId,
          userName: this.addUserForm.username,
          password: this.addUserForm.password,
          accessToken: this.defined.accessToken,
          authCode: this.addUserForm.validateCode
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$axios({
              url: this.defined.serviceURL + "/updateAuth",
              method: "post",
              data: {
                userId: res.data.userId,
                localConfig:
                  this.addUserForm.userAuthority.indexOf("1") > -1 ? 1 : 0,
                systemConfig:
                  this.addUserForm.userAuthority.indexOf("2") > -1 ? 1 : 0,
                defenceConfig:
                  this.addUserForm.userAuthority.indexOf("3") > -1 ? 1 : 0,
                deviceConfig:
                  this.addUserForm.userAuthority.indexOf("4") > -1 ? 1 : 0,
                groupConfig:
                  this.addUserForm.userAuthority.indexOf("5") > -1 ? 1 : 0,
                mapConfig:
                  this.addUserForm.userAuthority.indexOf("6") > -1 ? 1 : 0
              }
            })
              .then(res1 => {
                console.log("添加用户 权限成功");
                this.tableData.push({
                  userId: res.data.userId,
                  userName: this.addUserForm.username
                });
                this.dialogFormVisible2 = false;
              })
              .catch(error => {
                console.log("err++", error);
              });
          } else if (res.code == 1) console.log("用户名重复");
        })
        .catch(error => {
          console.log("err++", error);
        });
    },
    reFreshPage: function() {
      this.$forceUpdate();
    }
  },
  mounted: function() {
    this.showMessagge();
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
