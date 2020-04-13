<template>
  <div id="moving" style="text-align:center">
    <el-slider v-model="value" style="width:90%;margin-left:20px;"></el-slider>
    <div class="message">
      <div class="left">
        <i
          class="el-icon-s-help"
          v-bind:style="{ fontSize: 150 - value + 'px' }"
        ></i>
      </div>
      <div class="right">
        <h3>灵敏度说明：</h3>
        <p>当检测到圆形大小以上的物体，会报警，值越大越灵敏</p>
      </div>
    </div>
    <el-button type="primary">保存</el-button>
  </div>
</template>
<script>
export default {
  name: "moving",
  data() {
    return {
      value: ""
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
