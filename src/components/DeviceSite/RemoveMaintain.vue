<template>
  <div id="removeMaintain">
    <el-form label-position="left" label-width="500px" size="mini">
      <el-form-item label="重新启动设备">
        <el-button :style="style">重启</el-button>
      </el-form-item>
      <el-form-item label="简单恢复参数">
        <el-button :style="style" @click="renewLocalConfig">简单恢复</el-button>
      </el-form-item>
      <el-form-item label="完全恢复参数到基础设置">
        <el-button :style="style" @click="renewAllConfig">完全恢复</el-button>
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
  },
  methods: {
    renewLocalConfig: function() {
      this.$axios({
        url: this.defined.serviceURL + "/renewLocalConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          if (res.data.code == 0) console.log("重置成功");
          else console.log("重置失败");
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    renewAllConfig: function() {
      this.$axios({
        url: this.defined.serviceURL + "/renewAllConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          if (res.data.code == 0) console.log("重置成功");
          else console.log("重置失败");
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    }
  }
};
</script>
<style  scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>