<template>
  <div id="basicMessage">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="设备序列号">
        <el-input v-model="formLabelAlign.deviceSerial" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="formLabelAlign.deviceName" @blur="setDeciveName"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="formLabelAlign.model" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-input v-model="formLabelAlign.status" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="布防状态">
        <el-select v-model="formLabelAlign.defence" :style="style" @change="setDefence">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-input v-model="formLabelAlign.isEncrypt" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="告警声音模式">
        <el-select v-model="formLabelAlign.alarmSoundMode" :style="style" @change="setSoundMode">
          <el-option
            v-for="item in options2"
            :key="item.value"
            alarmSoundMode
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备下线是否通知">
        <el-select v-model="formLabelAlign.offlineNotify" :style="style" @change="setOfflineNotify">
          <el-option
            v-for="item in options3"
            :key="item.value"
            alarmSoundMode
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备大类">
        <el-input v-model="formLabelAlign.category" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "basicMessage",
  data() {
    return {
      formLabelAlign: {
        deviceSerial: "",
        deviceName: "",
        model: "",
        status: "",
        defence: "",
        isEncrypt: "",
        alarmSoundMode: "",
        offlineNotify: "",
        category: ""
      },
      deviceName: "",
      defence: "",
      alarmSoundMode: "",
      offlineNotify: "",
      style: "width:500px;",
      options1: [
        {
          value: 1,
          label: "布防"
        },
        {
          value: 0,
          label: "撤防"
        }
      ],
      options2: [
        {
          value: 1,
          label: "长叫"
        },
        {
          value: 0,
          label: "短叫"
        },
        {
          value: 2,
          label: "静音"
        }
      ],
      options3: [
        {
          value: 1,
          label: "通知"
        },
        {
          value: 0,
          label: "不通知"
        }
      ]
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/info",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.formLabelAlign.deviceSerial = res.data.data.deviceSerial;
            this.formLabelAlign.deviceName = res.data.data.deviceName;
            this.formLabelAlign.model = res.data.data.model;
            this.formLabelAlign.status =
              res.data.data.status == 1 ? "在线" : "不在线";
            this.formLabelAlign.defence = res.data.data.defence;
            this.formLabelAlign.isEncrypt =
              res.data.data.isEncrypt == 1 ? "加密" : "不加密";
            this.formLabelAlign.alarmSoundMode = res.data.data.alarmSoundMode;
            this.formLabelAlign.offlineNotify = res.data.data.offlineNotify;
            this.formLabelAlign.category = res.data.data.category;
          } else {
            // console.log(res.data.msg);
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
    setDeciveName: function() {
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
        url: "https://open.ys7.com/api/lapp/device/name/update",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          deviceName: this.formLabelAlign.deviceName
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log("设备名修改成功");
          } else {
            this.formLabelAlign.deviceName = this.deviceName;
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          this.formLabelAlign.deviceName = this.deviceName;
          console.log("err+++++", error);
        });
    },
    setDefence: function() {
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
        url: "https://open.ys7.com/api/lapp/device/defence/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          isDefence: this.formLabelAlign.defence
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log("布撤防修改成功");
          } else {
            this.formLabelAlign.defence = this.defence;
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          this.formLabelAlign.defence = this.defence;
          console.log("err+++++", error);
        });
    },
    setSoundMode: function() {
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
        url: "https://open.ys7.com/api/lapp/device/alarm/sound/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          type: this.formLabelAlign.alarmSoundMode
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log("告警模式修改成功");
          } else {
            this.formLabelAlign.alarmSoundMode = this.alarmSoundMode;
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          this.formLabelAlign.defence = this.defence;
          console.log("err+++++", error);
        });
    },
    setOfflineNotify: function() {
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
        url: "https://open.ys7.com/api/lapp/device/notify/switch",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          enable: this.formLabelAlign.offlineNotify
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            console.log("下线通知修改成功");
          } else {
            this.formLabelAlign.offlineNotify = this.offlineNotify;
            console.log(res.data.msg);
          }
        })
        .catch(error => {
          this.formLabelAlign.offlineNotify = this.offlineNotify;
          console.log("err+++++", error);
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
        url: this.defined.serviceURL + "/updateBaseConfig",
        method: "post",
        data: {
          deviceSerial: this.formLabelAlign.deviceSerial,
          deviceName: this.formLabelAlign.deviceName,
          model: this.formLabelAlign.model,
          defence: this.formLabelAlign.defence,
          status: this.formLabelAlign.status === "在线" ? 1 : 0,
          isEncrypt: this.formLabelAlign.isEncrypt === "加密" ? 1 : 0,
          alarmSoundMode: this.formLabelAlign.alarmSoundMode,
          offlineNotify: this.formLabelAlign.offlineNotify,
          category: this.formLabelAlign.category,
          userId: this.defined.userId
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            // console.log("保存成功");
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000
            });
          }
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
