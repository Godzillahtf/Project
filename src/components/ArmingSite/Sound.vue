<template>
  <div id="sound" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭" @change="changeValue"></el-switch>
    <div class="message">
      <img src="../../assets/sound.jpg" />
      <div class="messageText">
        <h3>声源定位开启时：</h3>
        <p>设备会根据外界声音源头，调整摄像头角度，来监控音源位置的画面</p>
        <h3>声源定位关闭时：</h3>
        <p>设备会按照默认角度进行监控</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sound",
  data() {
    return {
      value: true
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/ssl/switch/status",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            this.value = res.data.data.enable == 1 ? true : false;
          } else {
            // console.log(res.data.msg);
            this.value = false;
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
      var value1 = this.value ? 1 : 0;
      if (this.defined.auth.defenceConfig === 0) {
        // console.log("没有配置权限!");
        this.$message({
          message: "没有配置权限",
          type: "warning",
          duration: 1000
        });
        this.value = !this.value;
        return;
      }
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/ssl/switch/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          enable: value1
        }
      })
        .then(res => {
          if (res.data.code != "200") {
            this.value = !this.value;
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
          this.value = !this.value;
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
.message > img {
  width: 50%;
  height: 100%;
}
.message > div {
  box-sizing: border-box;
  float: right;
  padding: 10px;
  height: 100%;
  width: 50%;
}
</style>
