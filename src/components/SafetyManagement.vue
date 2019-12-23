<template>
  <div id="safetyManagement">
    <head-menu v-bind:menu="menu"
               @change-page="ha"></head-menu>
  </div>

</template>
<script >
import headMenu from "./HeadMenu";
export default {
  name: 'safetyManagement',
  components: {
    headMenu
  },
  data () {
    return {
      menu: [
        {
          name: "认证方式",
          page: "renzhengfangshi"
        },
        {
          name: "IP地址过滤",
          page: "IPdizhiguolv"
        },
        {
          name: "安全服务",
          page: "anquanfuwu"
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
#safetyManagement {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 170px;
}
</style>
