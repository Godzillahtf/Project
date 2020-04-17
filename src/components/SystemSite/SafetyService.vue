<template>
  <div id="safetyService">
    <el-form label-position="left" label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked">启用非法登录锁定</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "safetyService",
  data() {
    return {
      checked: "true"
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getRS232Config",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          this.formLabelAlign.baudRate = res.data.config.baudRate;
          this.formLabelAlign.dataBit = res.data.config.dataBit;
          this.formLabelAlign.stopBit = res.data.config.stopBit;
          this.formLabelAlign.check = res.data.config.checked;
          this.formLabelAlign.flowControl = res.data.config.fluidControl;
          this.formLabelAlign.controlMode = res.data.config.controlMode;
          this.RS232Id = res.data.config.id;
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    changeMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/updateRS232Config",
        method: "post",
        data: {
          id: this.RS232Id,
          baudRate: this.formLabelAlign.baudRate,
          dataBit: this.formLabelAlign.dataBit,
          stopBit: this.formLabelAlign.stopBit,
          checked: this.formLabelAlign.check,
          fluidControl: this.formLabelAlign.flowControl,
          controlMode: this.formLabelAlign.controlMode
        }
      })
        .then(res => {
          if (res.data.code == 0) console.log("保存成功");
          else console.log("保存失败！");
        })
        .catch(error => {
          console.log("err+++++", error);
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