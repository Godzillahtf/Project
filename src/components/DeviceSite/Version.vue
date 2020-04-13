<template>
  <div id="version">
    <el-form
      label-position="left"
      label-width="150px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="最新版本">
        <el-input
          v-model="formLabelAlign.newVersion"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="当前版本">
        <el-input
          v-model="formLabelAlign.nowVersion"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否需要升级">
        <el-input
          v-model="formLabelAlign.needRemove"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary">升级</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "version",
  data() {
    return {
      formLabelAlign: {
        newVersion: "V5.5.80 build 180911",
        nowVersion: "V5.5.80 build 180911",
        needRemove: "否"
      }
    };
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>
