<template>
  <div id="componentLive">
    <object type="application/x-vlc-plugin"
            pluginspage="http://www.videolan.org/"
            id='vlc'
            events='false'
            width="740"
            height="410">
      <param name='mrl'
             value='rtsp://admin:warmnut1234@192.168.1.64' />
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
      <param name="text"
             value="请下载插件" />
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
  left: 150px;
}
object {
  margin-left: 50px;
}
</style>
