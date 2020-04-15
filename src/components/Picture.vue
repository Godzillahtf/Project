<template>
  <div id="picture1">
    <el-image style="width: 100%; height: 500px " :src="url" fit="fill">
      <div slot="error" class="image-slot">
        暂无抓图
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <el-button size="mini" @click="screenshot">抓取相机图片</el-button>
    <el-button size="mini">下载图片</el-button>
  </div>
</template>
<script>
export default {
  name: "picture1",
  components: {},
  data() {
    return {
      url: ""
    };
  },
  methods: {
    screenshot: function() {
      this.$axios({
        url: "https://open.ys7.com/api/lapp/device/capture",
        method: "post",
        params: {
          accessToken: this.defined.accessToken,
          deviceSerial: this.defined.deviceSerial,
          channelNo: 1
        }
      }).then(res => {
        this.url = res.data.data.picUrl;
      });
    }
  }
};
</script>
<style scoped>
#picture1 {
  position: relative;
  padding: 50px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
