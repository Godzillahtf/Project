<template>
  <div id="verificationMethod">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="RTSP认证">
        <el-select v-model="formLabelAlign.RTSPAttest" :style="style">
          <el-option v-for="item in options1" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="WEB认证">
        <el-select v-model="formLabelAlign.WEBAttest" :style="style">
          <el-option v-for="item in options2" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "verificationMethod",
  data() {
    return {
      formLabelAlign: {
        RTSPAttest: "",
        WEBAttest: ""
      },
      proofId: "",
      style: "width:500px",
      options1: ["digest", "digest/basic"],
      options2: ["digest", "digest/basic"]
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getProofConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          this.formLabelAlign.RTSPAttest =
            res.data.config.rtspProof == 1 ? "digest" : "digest / basic";
          this.formLabelAlign.WEBAttest =
            res.data.config.webProof == 1 ? "digest" : "digest / basic";
          this.proofId = res.data.config.id;
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
        url: this.defined.serviceURL + "/updateProofConfig",
        method: "post",
        data: {
          id: this.proofId,
          rtspProof: this.formLabelAlign.RTSPAttest == "digest" ? 1 : 2,
          webProof: this.formLabelAlign.WEBAttest == "digest" ? 1 : 2,
          deviceSerial: this.defined.deviceSerial
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
