<template>
  <div id="localSite">
    <ul><span>播放参数</span>
      <li><span>协议类型</span>
        <input type="radio"
               v-model='xieyileixing'
               name='xieyileixing'
               value="TCP"><span>TCP</span>
        <input type="radio"
               v-model='xieyileixing'
               name='xieyileixing'
               value="UDP"><span>UDP</span>
        <input type="radio"
               v-model='xieyileixing'
               name='xieyileixing'
               value="MULTICAST"><span>MULTICAST</span>
      </li>
      <li><span>播放性能</span>
        <input type="radio"
               v-model='bofangxingneng'
               name='bofangxingneng'
               value="zuiduanshiyan"><span>最短时延</span>
        <input type="radio"
               v-model='bofangxingneng'
               name='bofangxingneng'
               value="junheng"><span>均衡</span>
        <input type="radio"
               v-model='bofangxingneng'
               name='bofangxingneng'
               value="liuchangxinghao"><span>流畅性好</span>
      </li>
      <li><span>规则信息</span>
        <input type="radio"
               v-model="guizexinxi"
               name="guizexinxi"
               value="qiyong"><span>启用</span>
        <input type="radio"
               v-model="guizexinxi"
               name="guizexinxi"
               value="jinyong"><span>禁用</span>
      </li>
      <li><span>信息叠加</span>
        <input type="radio"
               v-model="POSxinxidiejia"
               name="POSxinxidiejia"
               value="qiyong"><span>启用</span>
        <input type="radio"
               v-model="POSxinxidiejia"
               name="POSxinxidiejia"
               value="jinyong"><span>禁用</span>
      </li>
      <li><span>抓图文件格式</span>
        <input type="radio"
               v-model="zhuatuwenjiangeshi"
               name="zhuatuwenjiangeshi"
               value="JPEG"><span>JPEG</span>
        <input type="radio"
               v-model="zhuatuwenjiangeshi"
               name="zhuatuwenjiangeshi"
               value="BMP"><span>BMP</span>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'localSite',
  data () {
    return {
      xieyileixing: "TCP",
      bofangxingneng: "zuiduanshiyan",
      guizexinxi: "qiyong",
      POSxinxidiejia: "qiyong",
      zhuatuwenjiangeshi: "JPEG"
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#localSite {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 80px;
  left: 180px;
}
#localSite > ul > span {
  display: block;
  background-color: rgba(128, 128, 128, 0.1);
  border-bottom: 1px solid black;
}
#localSite > ul > li {
  margin-left: 20px;
  list-style: none;
}
#localSite > ul > li > input {
  margin-left: 100px;
}
#localSite > ul > li > span {
  display: inline-block;
  width: 100px;
}
</style>
