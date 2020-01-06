<template>
  <div id="safetyService">
    <el-form label-position="left" label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked">启用红外灯</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "safetyService",
  data() {
    return {
      checked: "true"
    };
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>