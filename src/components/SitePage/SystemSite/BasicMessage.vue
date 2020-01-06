<template>
  <div id="basicMessage">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="设备名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="formLabelAlign.id"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input v-model="formLabelAlign.model" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="设备序列号">
        <el-input v-model="formLabelAlign.serialNumber" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="主控版本">
        <el-input v-model="formLabelAlign.masterVersion" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="编码版本">
        <el-input v-model="formLabelAlign.codeVersion" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="Web版本">
        <el-input v-model="formLabelAlign.webVersion" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="Plugin版本">
        <el-input v-model="formLabelAlign.pluginVersion" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="通道个数">
        <el-input v-model="formLabelAlign.aisleCount" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="硬盘个数">
        <el-input v-model="formLabelAlign.hardDiskCount" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="报警输入个数">
        <el-input v-model="formLabelAlign.alarmInputCount" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="报警输出个数">
        <el-input v-model="formLabelAlign.alarmOutputCount" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="主控版本属性">
        <el-input v-model="formLabelAlign.masterVersionAtttibutes" readonly="readonly"></el-input>
      </el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "basicMessage",
  data() {
    return {
      formLabelAlign: {
        name: "IP CAMERA",
        id: "88",
        model: "DS-2CD3346WD-I",
        serialNumber: "DS-2CD3346WD-I20181127AACHC69551067",
        masterVersion: "V5.5.80 build 180911",
        codeVersion: "V7.3 build 180827",
        webVersion: "V4.0.1 build 180827",
        pluginVersion: "V3.0.6.46",
        aisleCount: "1",
        hardDiskCount: "0",
        alarmInputCount: "0",
        alarmOutputCount: "0",
        masterVersionAtttibutes: "B-R-G0-0"
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