<template>
  <div id="track1" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭">
    </el-switch>
    <div class="message">
      <img src="../../assets/track.jpg" />
      <div class="messageText">
        <h3>移动跟踪开启时：</h3>
        <p>当视频监控中有物体移动时，摄像头会根据其运动方向调整摄像角度</p>
        <h3>移动跟踪关闭时：</h3>
        <p>
          系统不会根据其运动方向调整摄像角度
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "track1",
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
