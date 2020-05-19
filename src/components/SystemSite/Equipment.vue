<template>
  <div id="equipment">
    <el-button @click="showMessage">查看</el-button>
  </div>
</template>
<script>
export default {
  name: "equipment",
  data() {
    return {};
  },
  methods: {
    showMessage: function() {
      let routerData = this.$router.resolve({
        path: "/equipment"
      });
      window.open(routerData.href, "_blank");
    }
  }
};
</script>
<style scoped></style>
