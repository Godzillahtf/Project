<template>
  <div id="systemMaintain">
    <head-menu v-bind:menu="menu"
               @change-page="ha"></head-menu>
  </div>

</template>
<script >
import headMenu from "./HeadMenu";
export default {
  name: 'systemMaintain',
  components: {
    headMenu
  },
  data () {
    return {
      menu: [
        {
          name: "升级维护",
          page: "shengjiweihu"
        },
        {
          name: "系统服务",
          page: "xitongfuwu"
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
#systemMaintain {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 170px;
}
</style>
