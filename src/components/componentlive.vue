<template>
  <div id="componentLive">
    <a>点击下载插件</a>
    <object type="application/x-vlc-plugin"
            pluginspage="http://www.videolan.org/"
            id='vlc'
            events='false'
            width="720"
            height="410">
      <param name='mrl'
             value='rtsp://192.168.1.63:8086/stream' />
      <param name='volume'
             value='50' />
      <param name='autoplay'
             value='true' />
      <param name='loop'
             value='false' />
      <param name='fullscreen'
             value='false' />
      <param name='controls'
             value='false' />
    </object>
  </div>

</template>
<script >
export default {
  name: 'componentLive',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#componentLive {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 50px;
}
object {
  margin-left: 50px;
}
</style>
