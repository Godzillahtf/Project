<template>
  <div id="shadow1" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭">
    </el-switch>
    <div class="message">
      <img src="../../assets/shadow.jpg" />
      <div class="messageText">
        <h3>镜头遮蔽开启时：</h3>
        <p>设备会将摄像头的镜头盖放下，同时关闭监控功能</p>
        <h3>镜头遮蔽关闭时：</h3>
        <p>
          设备进入正常监控状态
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shadow1",
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
  width: 40%;
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
