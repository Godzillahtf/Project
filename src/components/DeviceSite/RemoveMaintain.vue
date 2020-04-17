<template>
  <div id="removeMaintain">
    <el-form label-position="left" label-width="500px" size="mini" :model="formLabelAlign">
      <el-form-item label="重新启动设备">
        <el-button :style="style">重启</el-button>
      </el-form-item>
      <el-form-item label="简单恢复设备参数">
        <el-button :style="style">简单恢复</el-button>
      </el-form-item>
      <el-form-item label="完全恢复设备参数到出厂设置">
        <el-button :style="style">完全恢复</el-button>
      </el-form-item>
      <el-form-item label="设备参数">
        <el-button :style="style">导出设备参数</el-button>
      </el-form-item>
      <el-form-item label="下载运行日志，系统信息，硬件信息等">
        <el-button :style="style">诊断信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "removeMaintain",
  data() {
    return {
      style: "width:150px"
    };
  }
};
</script>
<style  scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>