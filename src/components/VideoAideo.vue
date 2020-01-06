<template>
  <div id="videoAideo">
    <el-tabs v-model="activeName">
      <el-tab-pane label="ROI" name="first">
        <ROI />
      </el-tab-pane>
      <el-tab-pane label="视频" name="second">
        <Video />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ROI from "./SitePage/VideoAideo/ROI";
import Video from "./SitePage/VideoAideo/Video";
export default {
  name: "videoAideo",
  components: {
    ROI,
    Video
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
<style scoped>
#videoAideo {
  position: relative;
  padding: 50px;
  bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>