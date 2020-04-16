<template>
  <div id="version">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="最新版本">
        <el-input v-model="formLabelAlign.newVersion" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="当前版本">
        <el-input v-model="formLabelAlign.nowVersion" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="是否需要升级">
        <el-input v-model="formLabelAlign.needRemove" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary">升级</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "version",
  data() {
    return {
      formLabelAlign: {
        newVersion: "",
        nowVersion: "",
        needRemove: ""
      }
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/version/info",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.formLabelAlign.newVersion = res.data.data.latestVersion;
            this.formLabelAlign.nowVersion = res.data.data.currentVersion;
            this.formLabelAlign.needRemove =
              res.data.data.isNeedUpgrade == 0 ? "不需要" : "需要";
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          console.log("err+++++", error);
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
