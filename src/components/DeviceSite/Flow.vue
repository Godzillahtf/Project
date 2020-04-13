<template>
  <div id="flow">
    <el-form
      label-position="left"
      label-width="150px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="起始时间">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width:510px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item label="日期">
        <el-input v-model="formLabelAlign.flowDate"></el-input>
      </el-form-item>
      <el-form-item label="设备序列号">
        <el-input
          v-model="formLabelAlign.deviceSerial"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备通道号">
        <el-input
          v-model="formLabelAlign.channelNo"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="轻应用消耗">
        <el-input
          v-model="formLabelAlign.hlsFlow"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="APP应用消耗">
        <el-input
          v-model="formLabelAlign.appFlow"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="轻应用RTMP预览消耗">
        <el-input
          v-model="formLabelAlign.rtmpFlow"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="总消耗">
        <el-input
          v-model="formLabelAlign.flowCount"
          readonly="readonly"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "flow",
  data() {
    return {
      time: "",
      formLabelAlign: {
        flowDate: "20200411",
        deviceSerial: "E12366153",
        channelNo: "1",
        hlsFlow: "50",
        appFlow: "410",
        rtmpFlow: "600",
        flowCount: "200"
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
