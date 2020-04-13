<template>
  <div id="passage">
    <el-form
      label-position="left"
      label-width="150px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="设备序列号">
        <el-input v-model="formLabelAlign.deviceSerial"></el-input>
      </el-form-item>
      <el-form-item label="IPC序列号">
        <el-input v-model="formLabelAlign.ipcSerial"></el-input>
      </el-form-item>
      <el-form-item label="通道号">
        <el-input
          v-model="formLabelAlign.channelNo"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备名">
        <el-input
          v-model="formLabelAlign.deviceName"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="通道名">
        <el-input
          v-model="formLabelAlign.channelName"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-input
          v-model="formLabelAlign.status"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-input
          v-model="formLabelAlign.isEncrypt"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="视频质量">
        <el-input
          v-model="formLabelAlign.videoLevel"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否关联IPC">
        <el-input
          v-model="formLabelAlign.relatedIpc"
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
  name: "passage",
  data() {
    return {
      formLabelAlign: {
        deviceSerial: "E12366153",
        ipcSerial: "123456789",
        channelNo: "1",
        deviceName: "E12366153",
        channelName: "1",
        status: "在线",
        isEncrypt: "不加密",
        videoLevel: "均衡",
        relatedIpc: "否"
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
