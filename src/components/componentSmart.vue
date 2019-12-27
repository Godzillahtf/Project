<template>
  <div id="componentSmart">
    <object type="application/x-vlc-plugin"
            pluginspage="http://www.videolan.org/"
            id='vlc'
            events='false'
            width="740"
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
      <param name="text"
             value="请下载插件" />
    </object>
    <div id='message'>
      <el-card>
        <el-row>
          <el-col :span='8'>
            <img src="../assets/logo.png">
          </el-col>
          <el-col :span='16'>
            <div id="messageText">
              识别信息<el-divider></el-divider>
              信息1<el-divider></el-divider>
              信息2<el-divider></el-divider>
            </div>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>
<script >
export default {
  name: 'componentSmart',
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
#componentSmart {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 200px;
}
#message {
  position: absolute;
  right: 200px;
  top: 0px;
  width: 420px;
  height: 410px;
}
#message img {
  width: 100%;
}
#messageText {
  word-wrap: break-word;
  width: 100%;
}
</style>
