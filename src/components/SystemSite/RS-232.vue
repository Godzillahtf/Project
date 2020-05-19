<template>
  <div id="Rs232">
    <el-form label-position="left" label-width="200px" size="mini" :model="formLabelAlign">
      <el-form-item label="波特率">
        <el-select v-model="formLabelAlign.baudRate" :style="style">
          <el-option v-for="item in options1" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据位">
        <el-select v-model="formLabelAlign.dataBit" :style="style">
          <el-option v-for="item in options2" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="停止位">
        <el-select v-model="formLabelAlign.stopBit" :style="style">
          <el-option v-for="item in options3" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="校验">
        <el-select v-model="formLabelAlign.check" :style="style">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流控">
        <el-select v-model="formLabelAlign.flowControl" :style="style">
          <el-option
            v-for="item in options5"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="控制模式">
        <el-select v-model="formLabelAlign.controlMode" :style="style">
          <el-option
            v-for="item in options6"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Rs232",
  data() {
    return {
      formLabelAlign: {
        baudRate: "",
        dataBit: "",
        stopBit: "",
        check: "",
        flowControl: "",
        controlMode: ""
      },
      style: "width:450px",
      RS232Id: "",
      options1: [2400, 4800, 9600, 19200, 38400, 57600, 76800, 115200],
      options2: [5, 6, 7, 8],
      options3: [1, 2],
      options4: [
        {
          label: "无",
          value: 0
        },
        {
          label: "奇校验",
          value: 1
        },
        {
          label: "偶校验",
          value: 2
        }
      ],
      options5: [
        {
          label: "无",
          value: 0
        },
        {
          label: "软流控",
          value: 1
        }
      ],
      options6: [
        {
          label: "控制台(参数控制)",
          value: 1
        },
        {
          label: "透明通道",
          value: 2
        }
      ]
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
          this.formLabelAlign.flowControl = 1;
          this.formLabelAlign.controlMode = res.data.config.controlMode;
          this.RS232Id = res.data.config.id;
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
      if (this.defined.auth.systemConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
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
          if (res.data.code == 0)
            //  console.log("保存成功");
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000
            });
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
            type: "error",
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
