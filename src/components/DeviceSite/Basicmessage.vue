<template>
  <div id="basicMessage">
    <el-form
      label-position="left"
      label-width="150px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="设备序列号">
        <el-input v-model="formLabelAlign.deviceSerial"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="formLabelAlign.deviceName"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="formLabelAlign.model" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-input
          v-model="formLabelAlign.status"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="布防状态">
        <el-input
          v-model="formLabelAlign.defence"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-input
          v-model="formLabelAlign.isEncrypt"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="告警声音模式">
        <el-input
          v-model="formLabelAlign.alarmSoundMode"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备下线是否通知">
        <el-input
          v-model="formLabelAlign.offlineNotify"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备大类">
        <el-input
          v-model="formLabelAlign.category"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary">保存</el-button>
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
        deviceSerial: "E12366153",
        deviceName: "deviceName",
        model: "CS123456",
        status: "在线",
        defence: "布防",
        isEncrypt: "加密",
        alarmSoundMode: "短叫",
        offlineNotify: "通知",
        category: "无线摄像头"
      }
    };
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>
