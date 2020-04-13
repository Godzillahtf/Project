<template>
  <div id="verificationMethod">
    <el-form
      label-position="left"
      label-width="150px"
      size="mini"
      :model="formLabelAlign"
    >
      <el-form-item label="RTSP认证">
        <el-select v-model="formLabelAlign.RTSPAttest" :style="style">
          <el-option
            v-for="item in options1"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="WEB认证">
        <el-select v-model="formLabelAlign.WEBAttest" :style="style">
          <el-option
            v-for="item in options2"
            :key="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "verificationMethod",
  data() {
    return {
      formLabelAlign: {
        RTSPAttest: "digest",
        WEBAttest: "digest"
      },
      style: "width:500px",
      options1: ["digest", "digest/basic"],
      options2: ["digest", "digest/basic"]
    };
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>
