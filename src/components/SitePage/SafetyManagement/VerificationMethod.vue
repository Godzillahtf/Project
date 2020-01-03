<template>
  <div id="verificationMethod">
    <el-form label-position="left"
             label-width="150px"
             size="mini"
             :model="formLabelAlign">
      <el-form-item label="RTSP认证">
        <el-select v-model="formLabelAlign.RTSPAttest"
                   style="width:250px;">
          <el-option v-for="item in options1"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="WEB认证">
        <el-select v-model="formLabelAlign.WEBAttest"
                   style="width:250px;">
          <el-option v-for="item in options2"
                     :key="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'verificationMethod',
  data () {
    return {
      formLabelAlign: {
        RTSPAttest: "digest",
        WEBAttest: "digest"
      },
      options1: ['digest', 'digest/basic'],
      options2: ['digest', 'digest/basic']
    }  }}
</script>
<style  scoped>
#verificationMethod {
  width: 500px;
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