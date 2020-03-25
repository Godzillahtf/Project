<template>
  <div id="Live">
    <object
      type="application/x-vlc-plugin"
      pluginspage="http://www.videolan.org/"
      id="vlc"
      codebase="http://comic.sjtu.edu.cn/vlc/cab/axvlc.cab"
      events="false"
      width="740"
      height="410"
    >
      <param name="mrl" value="rtsp://192.168.1.4:8888/11" />
      <param name="volume" value="50" />
      <param name="autoplay" value="true" />
      <param name="loop" value="false" />
      <param name="fullscreen" value="false" />
      <param name="controls" value="false" />
      <param name="text" value="请下载插件" />
    </object>
  </div>
</template>
<script >
export default {
  name: "Live",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Live {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 200px;
}
object {
  margin-left: 50px;
}
</style>
