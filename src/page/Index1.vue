<template>
  <div id="index">
    <Header></Header>
    <div id="menu">
      <span class="iconfont icon-caidan">&nbsp;&nbsp;&nbsp;菜单</span>
      <span class="
            iconfont
            icon-shexiangtou"
            page="live"
            @click="changePage">&nbsp;&nbsp;&nbsp;摄像头</span>
      <span class="iconfont icon-shexiangtou"
            page="replay"
            @click="changePage">&nbsp;&nbsp;&nbsp;回放</span>
      <span class="iconfont icon-wenjian"
            page="local"
            @click="changePage">&nbsp;&nbsp;&nbsp;本地</span>
      <span class="iconfont icon-paizhao"
            page="image"
            @click="changePage">&nbsp;&nbsp;&nbsp;抓图</span>
      <span class="iconfont icon-shexiangtou"
            page="smart"
            @click="changePage">&nbsp;&nbsp;&nbsp;SMART</span>
    </div>
    <component v-bind:is="componentName"></component>
  </div>
</template>

<script >
import Header from "../components/Header";
import componentlive from "../components/componentlive";
import componentreplay from "../components/componentreplay";
export default {
  name: "index1",
  components: {
    Header,
    componentlive,
    componentreplay
  },
  data () {
    return {
      componentName: "componentlive"
    }  },
  methods: {
    changePage: function (e) {
      this.componentName = "component" + e.currentTarget.getAttribute('page');
      console.log(this.componentName);
    },
    created () { }
  },
  mounted () { }
};
</script>

<style>
@import "../assets/icon/iconfont.css";
* {
  margin: 0;
  padding: 0;
}
#menu {
  width: 50px;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0px;
  background-color: #ffffff;
}
#menu:hover {
  width: 150px;
}
#menu > span {
  padding-left: 20px;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
  line-height: 70px;
  font-size: 18px;
  cursor: pointer;
}
#menu > span:not(:first-child):hover {
  background-color: rgb(195, 195, 195);
}
</style>
