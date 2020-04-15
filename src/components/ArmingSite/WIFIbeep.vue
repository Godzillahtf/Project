<template>
  <div id="wifiBeep" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭" @change="changeValue"></el-switch>
    <div class="message">
      <img src="../../assets/wifi.jpg" />
      <div class="messageText">
        <h3>WIFI提示音开启时：</h3>
        <p>设备连接WIFI时和WIFI连接成功时，摄像头会播放语音提示</p>
        <h3>WIFI提示音关闭时：</h3>
        <p>设备连接WIFI时和WIFI连接成功时，摄像头会进入静音模式，并不播放语音提示</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "wifiBeep",
  data() {
    return {
      value: true
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/sound/switch/status",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial
        }
      })
        .then(res => {
          if (res.data.code == "200") {
            //console.log(res.data.data);
            // console.log(res.data.data.enable);
            this.value = res.data.data.enable == 1 ? true : false;
          } else {
            console.log(res.data.msg);
            this.value = false;
          }
        })
        .catch(error => {
          console.log("err+++++", err);
        });
    },
    changeValue: function() {
      var value1 = this.value ? 1 : 0;
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/sound/switch/set",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          enable: value1
        }
      })
        .then(res => {
          if (res.data.code != "200") {
            console.log(res.data.msg);
            this.value = !this.value;
          } else {
            console.log("更改成功！");
          }
        })
        .catch(error => {
          console.log("err+++++", error);
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
