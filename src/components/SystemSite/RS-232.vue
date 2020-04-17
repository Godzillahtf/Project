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
          value: "none"
        },
        {
          label: "奇校验",
          value: "odd"
        },
        {
          label: "偶校验",
          value: "even"
        }
      ],
      options5: [
        {
          label: "无",
          value: "none"
        },
        {
          label: "软流控",
          value: "soft"
        }
      ],
      options6: [
        {
          label: "控制台(参数控制)",
          value: "console"
        },
        {
          label: "透明通道",
          value: "openAisle"
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
