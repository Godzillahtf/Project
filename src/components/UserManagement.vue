<template>
  <div id="userManagement">
    <head-menu v-bind:menu="menu"
               @change-page="ha"></head-menu>
  </div>

</template>
<script >
import headMenu from "./HeadMenu";
export default {
  name: 'userManagement',
  components: {
    headMenu
  },
  data () {
    return {
      menu: [
        {
          name: "用户管理",
          page: "yonghuguanli"
        },
        {
          name: "在线用户",
          page: "zaixianyonghu"
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
#userMangagement {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 170px;
}
</style>
