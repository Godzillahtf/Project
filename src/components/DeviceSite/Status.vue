<template>
  <div id="status">
    <el-form
      label-position="left"
      label-width="150px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="隐私状态">
        <el-input v-model="formLabelAlign.privacyStatus"></el-input>
      </el-form-item>
      <el-form-item label="红外状态">
        <el-input v-model="formLabelAlign.pirStatus"></el-input>
      </el-form-item>
      <el-form-item label="告警声音模式">
        <el-input
          v-model="formLabelAlign.alarmSoundMode"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="电池电量">
        <el-input
          v-model="formLabelAlign.battryStatus"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="硬盘数量">
        <el-input
          v-model="formLabelAlign.diskNum"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="云存储状态">
        <el-input
          v-model="formLabelAlign.cloudStatus"
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
  name: "status",
  data() {
    return {
      formLabelAlign: {
        privacyStatus: "打开",
        pirStatus: "启用",
        alarmSoundMode: "静音",
        battryStatus: "99",
        diskNum: "1",
        cloudStatus: "设备不支持"
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
