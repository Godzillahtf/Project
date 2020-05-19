<template>
  <div id="safetyService">
    <el-form label-position="left" label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked" @change="changeMessage">启用非法登录锁定</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "safetyService",
  data() {
    return {
      checked: false,
      safeId: -1
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getSafeConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          // console.log(res.data.safe);
          this.checked = res.data.safe.safeMode == 1 ? true : false;
          this.safeId = res.data.safe.id;
        })
        .catch(error => {
          // console.log("err+++++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    },
    changeMessage: function() {
      if (this.defined.auth.systemConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$axios({
        url: this.defined.serviceURL + "/updateSafeConfig",
        method: "post",
        data: {
          userId: this.defined.userId,
          safeMode: this.checked ? 1 : 0
        }
      })
        .then(res => {
          if (res.data.code == 0)
            // console.log("保存成功");
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000
            });
          // console.log("保存失败！");
          else
            this.$message({
              message: "保存失败",
              type: "warning",
              duration: 1000
            });
        })
        .catch(error => {
          // console.log("err+++++", error);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
        });
    }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>