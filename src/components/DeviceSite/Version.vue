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
        <el-button type="primary" @click="upgrade">升级</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="升级进度" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="upGradeForm" label-position="left" label-width="100px">
        <el-progress type="circle" :percentage="upGradeForm.progress"></el-progress>
      </el-form>
    </el-dialog>
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
      },
      dialogFormVisible: false,
      upGradeForm: {
        progress: 1
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
    },
    upgrade() {
      if (this.defined.auth.deviceConfig === 0) {
        console.log("没有配置权限!");
        return;
      }
      if (this.formLabelAlign.needRemove === "不需要") {
        console.log("不需要升级！");
        return;
      } else {
        this.$axios({
          url: "https://open.ys7.com/api/lapp/device/upgrade",
          method: "post",
          params: {
            accessToken: this.defined.accessToken,
            deviceSerial: this.defined.deviceSerial
          }
        })
          .then(res => {
            if (res.data.code == "200") {
              this.dialogFormVisible = true;
              this.$axios({
                url: "https://open.ys7.com/api/lapp/device/upgrade/status",
                method: "post",
                params: {
                  accessToken: this.defined.accessToken,
                  deviceSerial: this.defined.deviceSerial
                }
              })
                .then(res => {
                  if (res.data.code == "200") {
                    this.upGradeForm.progress = res.data.data.progress;
                  } else {
                    console.log(res.data.msg);
                  }
                })
                .catch(error => {
                  console.log("err+++++", error);
                });
            } else {
              console.log(res.data.msg);
            }
          })
          .catch(error => {
            console.log("err+++++", error);
          });
      }
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
