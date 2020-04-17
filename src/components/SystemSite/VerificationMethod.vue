<template>
  <div id="verificationMethod">
    <el-form label-position="left" label-width="150px" size="mini" :model="formLabelAlign">
      <el-form-item label="RTSP认证">
        <el-select v-model="formLabelAlign.RTSPAttest" :style="style">
          <el-option v-for="item in options1" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="WEB认证">
        <el-select v-model="formLabelAlign.WEBAttest" :style="style">
          <el-option v-for="item in options2" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
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
        RTSPAttest: "",
        WEBAttest: ""
      },
      proofId: "",
      style: "width:500px",
      options1: ["digest", "digest/basic"],
      options2: ["digest", "digest/basic"]
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getProofConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          this.formLabelAlign.RTSPAttest = res.data.config.rtspProof;
          this.formLabelAlign.WEBAttest = res.data.config.webProof;
          this.proofId = res.data.config.id;
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    changeMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/updateProofConfig",
        method: "post",
        data: {
          id: this.proofId,
          rtspProof: this.formLabelAlign.RTSPAttest,
          webProof: this.formLabelAlign.WEBAttest
        }
      })
        .then(res => {
          if (res.data.code == 0) console.log("保存成功");
          else console.log("保存失败！");
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    }
  },
  mounted: function() {
    this.showMessage();
  }
};
</script>
<style scoped>
.el-form {
  padding: 30px 100px 20px;
}
</style>
