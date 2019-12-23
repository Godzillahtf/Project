<template>
  <div id="systemSite">
    <head-menu v-bind:menu="menu"
               @change-page="ha"></head-menu>
  </div>

</template>
<script >
import headMenu from "./HeadMenu";
export default {
  name: 'systemSite',
  components: {
    headMenu
  },
  data () {
    return {
      menu: [
        {
          name: "基本信息",
          page: "jibenxinxi"
        },
        {
          name: "时间配置",
          page: "shijianpeizhi"
        },
        {
          name: "夏令时",
          page: "xialingshi"
        },
        {
          name: "RS-232",
          page: "RS-232"
        },
        {
          name: "关于设备",
          page: "guanyushebei"
        }
      ]
    }
  },
  methods: {
    ha: function (data) {
      console.log(data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#systemSite {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 170px;
}
</style>
