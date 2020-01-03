<template>
  <div id="systemService">
    <el-form label-position="left"
             label-width="80px">
      <el-form-item>
        <el-checkbox v-model="checked">启用红外灯</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "systemService",
  data () {
    return {
      checked: 'true'
    }
  }
}
</script>
<style scoped>
#systemService {
  width: 600px;
  position: relative;
  left: 200px;
  top: 20px;
}
.el-form {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 30px;
}
</style>