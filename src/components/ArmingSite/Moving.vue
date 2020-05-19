<template>
  <div id="moving" style="text-align:center">
    <el-slider v-model="value" :min="0" :max="6" show-input style="width:90%;margin-left:20px;"></el-slider>
    <div class="message">
      <div class="left">
        <i class="el-icon-s-help" v-bind:style="{ fontSize: (6-value)*100/6+30 + 'px' }"></i>
      </div>
      <div class="right">
        <h3>灵敏度说明：</h3>
        <p>当检测到圆形大小以上的物体，会报警，值越大越灵敏，值为0时关闭移动侦测</p>
      </div>
    </div>
    <el-button type="primary" @click="changeValue" size="mini">保存</el-button>
  </div>
</template>
<script>
export default {
  name: "moving",
  data() {
    return {
      value: 0,
      value1: 0
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/algorithm/config/get",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.value = Number(res.data.data[0].value);
            this.value1 = Number(res.data.data[0].value);
          } else {
            // console.log(res.data.msg);
            this.value = 0;
          }
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
    changeValue: function() {
      if (this.defined.auth.defenceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/algorithm/config/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          value: this.value
        }
      })
        .then(res => {
          if (res.data.code != "200") {
            this.value = this.value1;
            // console.log(res.data.msg);
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1000
            });
          } else {
            // console.log("更改成功！");
            this.$message({
              message: "更改成功",
              type: "success",
              duration: 1000
            });
          }
        })
        .catch(error => {
          // console.log("err+++++", error.data);
          this.$message({
            message: "系统错误",
            type: "error",
            duration: 1000
          });
          this.value = this.value1;
        });
    }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style scoped>
.message {
  width: 100%;
  height: 200px;
  text-align: left;
}
.left {
  float: left;
  background: url("../../assets/123.jpg") center;
  background-size: 100% 100%;
  background-color: #fff;
  text-align: center;
  width: 40%;
  height: 100%;
  box-sizing: border-box;
}
.right {
  box-sizing: border-box;
  float: right;
  padding: 10px;
  height: 100%;
  width: 40%;
}
</style>
