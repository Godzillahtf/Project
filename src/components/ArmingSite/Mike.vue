<template>
  <div id="mike" style="text-align:center">
    <el-switch v-model="value" active-text="开启" inactive-text="关闭">
    </el-switch>
    <div class="message">
      <img src="../../assets/mike.jpg" />
      <div class="messageText">
        <h3>麦克风开启时：</h3>
        <p>麦克风开启时，摄像头的实时预览画面和历史回放将会录入声音</p>
        <h3>麦克风关闭时：</h3>
        <p>
          摄像头的录入的视频只会有画面而没有声音
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mike",
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
