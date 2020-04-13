<template>
  <div id="video1" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭">
    </el-switch>
    <div class="message">
      <img src="../../assets/video.jpg" />
      <div class="messageText">
        <h3>全天录像开启时：</h3>
        <p>
          设备会对全天的视频信息进行录像，并且保存到硬盘中，直到硬盘存储容量达到最大。
        </p>
        <h3>全天录像关闭时：</h3>
        <p>
          设备不开启全天录像功能，只会在移动侦测时才开启录像功能。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "video1",
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
