<template>
  <div id="status">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="隐私状态">
        <el-input v-model="formLabelAlign.privacyStatus" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="红外状态">
        <el-input v-model="formLabelAlign.pirStatus" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="告警声音模式">
        <el-input v-model="formLabelAlign.alarmSoundMode" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="电池电量(%)">
        <el-input v-model="formLabelAlign.battryStatus" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="硬盘数量">
        <el-input v-model="formLabelAlign.diskNum" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="云存储状态">
        <el-input v-model="formLabelAlign.cloudStatus" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "status",
  data() {
    return {
      formLabelAlign: {
        privacyStatus: "",
        pirStatus: "",
        alarmSoundMode: "",
        battryStatus: "",
        diskNum: "",
        cloudStatus: ""
      }
    };
  },
  methods: {
    showaLarmSoundMode: function(a) {
      switch (a) {
        case 0:
          return "短叫";
        case 1:
          return "长叫";
        case 2:
          return "静音";
      }
    },
    unShowLarmSoundMode: function(a) {
      if (a === "短叫") return 0;
      else if (a === "长叫") return 1;
      else return 2;
    },
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/status/get",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.formLabelAlign.privacyStatus =
              res.data.data.privacyStatus == 0 ? "关闭" : "打开";
            this.formLabelAlign.pirStatus =
              res.data.data.pirStatus == 1 ? "启用" : "关闭";
            this.formLabelAlign.alarmSoundMode = this.$options.methods.showaLarmSoundMode(
              res.data.data.alarmSoundMode
            );
            this.formLabelAlign.battryStatus =
              res.data.data.battryStatus == -1
                ? "设备没有电池"
                : res.data.data.battryStatus;
            this.formLabelAlign.diskNum = res.data.data.diskNum;
            this.formLabelAlign.cloudStatus =
              res.data.data.cloudStatus == 1 ? "激活" : "未激活";
          } else {
            console.log(res.data.msg);
          }
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
      if (this.defined.auth.deviceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$axios({
        url: this.defined.serviceURL + "/updateStatusConfig",
        method: "post",
        data: {
          privacyStatus: this.formLabelAlign.privacyStatus === "关闭" ? 0 : 1,
          pirStatus: this.formLabelAlign.pirStatus === "启用" ? 1 : 0,
          battryStatus:
            this.formLabelAlign.battryStatus === "设备没有电池"
              ? -1
              : this.formLabelAlign.battryStatus,
          diskNum: this.formLabelAlign.diskNum,
          cloudStatus: this.formLabelAlign.cloudStatus === "激活" ? 1 : 0,
          alarmSoundMode: this.$options.methods.unShowLarmSoundMode(
            this.formLabelAlign.alarmSoundMode
          ),
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
          //  console.log("保存失败！");
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
            type: "warning",
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
