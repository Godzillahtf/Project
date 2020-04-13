<template>
  <div id="light" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭">
    </el-switch>
    <div class="message">
      <img src="../../assets/light.jpg" />
      <div class="messageText">
        <h3>摄像头指示灯开启时：</h3>
        <p>摄像头会根据摄像头的运行状态调整指示灯的颜色、常量或者闪烁状态</p>
        <h3>摄像头指示灯关闭时：</h3>
        <p>
          摄像头会关闭指示灯但是功能正常运行
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "light",
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
