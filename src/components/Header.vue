<template>
  <div id="header">
    <img src="../assets/logo.png" />
    <a @click="logout" class="iconfont icon-zhuxiaologout10">注销</a>
    <a @click="help" class="iconfont icon-bangzhu">帮助</a>
    <a @click="user" class="iconfont icon-yonghu">{{username}}</a>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="userForm" label-position="left" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userForm.userMail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-select v-model="userForm.userAuth" style="width:630px" multiple disabled>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      username: this.defined.userName,
      dialogFormVisible: false,
      userForm: {
        userName: "",
        userAuth: [],
        userMail: ""
      },
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
    logout: function() {
      this.defined.removeDefined();
      // console.log("注销成功");
      this.$message({
        message: "注销成功",
        type: "success",
        duration: 1000
      });
      this.$router.push({ path: "/" });
    },
    help: function() {
      let routerData = this.$router.resolve({
        path: "/help"
      });
      window.open(routerData.href, "_blank");
    },
    user: function() {
      this.dialogFormVisible = true;
    },
    changeMessage: function() {
      if (this.userForm.userName === "") {
        this.$message({
          message: "用户名不能为空！",
          type: "warning",
          duration: 1000
        });
      } else if (this.userForm.userMail === "") {
        this.$message({
          message: "用户邮箱不能为空！",
          type: "warning",
          duration: 1000
        });
      } else {
        var reg = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/;
        var re = new RegExp(reg);
        if (!re.test(this.userForm.userMail)) {
          this.$message({
            message: "邮箱格式不正确",
            type: "warning",
            duration: 1000
          });
        } else {
          this.$axios({
            url: this.defined.serviceURL + "/changeMailAndName",
            method: "post",
            data: {
              userId: this.defined.sonId,
              userName: this.userForm.userName,
              mailAddress: this.userForm.userMail
            }
          })
            .then(res => {
              if (res.data.code == 0) {
                // console.log("修改成功");
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000
                });
                this.defined.userName = this.userForm.userName;
                this.defined.userMail = this.userForm.userMail;
                this.dialogFormVisible = false;
                this.username = this.userForm.userName;
              }
              // console.log("修改失败");
              else if (res.data.code == 1)
                this.$message({
                  message: "用户名重复！",
                  type: "warning",
                  duration: 1000
                });
              else {
                this.$message({
                  message: "修改失败！",
                  type: "error",
                  duration: 1000
                });
              }
            })
            .catch(error => {
              // console.log("err+++++", error);
              this.$message({
                message: "系统错误！",
                type: "error",
                duration: 1000
              });
            });
        }
      }
    }
  },
  mounted: function() {
    this.userForm.userName = this.defined.userName;
    this.userForm.userMail = this.defined.userMail?this.defined.userMail:"您还未绑定邮箱";
    console.log(this.defined.auth);
    if (this.defined.auth.localConfig === 1) this.userForm.userAuth.push("1");
    if (this.defined.auth.systemConfig === 1) this.userForm.userAuth.push("2");
    if (this.defined.auth.defenceConfig === 1) this.userForm.userAuth.push("3");
    if (this.defined.auth.deviceConfig === 1) this.userForm.userAuth.push("4");
    if (this.defined.auth.groupConfig === 1) this.userForm.userAuth.push("5");
    if (this.defined.auth.mapConfig === 1) this.userForm.userAuth.push("6");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/icon/iconfont.css";
#header {
  top: 0;
  height: 50px;
  width: 100%;
  position: relative;
  background-color: rgb(47, 50, 62);
}
#header a {
  float: right;
  width: 100px;
  line-height: 50px;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
}
#header a:hover {
  background-color: #ffffff;
  color: rgb(104, 104, 104);
}
#header > img {
  height: 50px;
  width: 150px;
  padding-left: 80px;
}
</style>
