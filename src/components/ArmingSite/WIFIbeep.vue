<template>
  <div id="wifiBeep" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭">
    </el-switch>
    <div class="message">
      <img src="../../assets/wifi.jpg" />
      <div class="messageText">
        <h3>WIFI提示音开启时：</h3>
        <p>设备连接WIFI时和WIFI连接成功时，摄像头会播放语音提示</p>
        <h3>WIFI提示音关闭时：</h3>
        <p>
          设备连接WIFI时和WIFI连接成功时，摄像头会进入静音模式，并不播放语音提示
        </p>
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
  methods: {}
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
