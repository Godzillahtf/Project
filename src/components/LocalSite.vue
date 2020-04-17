<template>
  <div id="localSite">
    <el-form label-position="left" label-width="200px" size="mini" :model="formLabelAlign">
      <el-form-item label="协议类型">
        <el-select v-model="formLabelAlign.protocolType" :style="style">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="播放性能">
        <el-select v-model="formLabelAlign.playPerformance" :style="style" allow-create filterable>
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="抓图文件格式">
        <el-select v-model="formLabelAlign.pictureType" :style="style">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规则信息">
        <el-select v-model="formLabelAlign.ruleInformation" :style="style">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="POS信息叠加">
        <el-select v-model="formLabelAlign.POS" :style="style">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align:right">
        <el-button type="primary" @click="changeMessage">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script scoped>
export default {
  name: "localSite",
  data() {
    return {
      formLabelAlign: {
        protocolType: "",
        playPerformance: "",
        pictureType: "",
        ruleInformation: "",
        POS: ""
      },
      style: "width:450px",
      localId: "",
      options1: [
        {
          value: "TCP",
          label: "TCP"
        },
        {
          value: "UDP",
          label: "UDP"
        },
        {
          value: "MULTICAST",
          label: "MULTICAST"
        },
        {
          value: "HTTP",
          label: "HTTP"
        }
      ],
      options2: [
        {
          value: "short",
          label: "最短时延"
        },
        {
          value: "long",
          label: "流畅性好"
        },
        {
          value: "middle",
          label: "均衡"
        }
      ],
      options3: [
        {
          value: "JPEG",
          label: "JPEG"
        },
        {
          value: "BMP",
          label: "BMP"
        }
      ],
      options4: [
        {
          value: "on",
          label: "开启"
        },
        {
          value: "off",
          label: "关闭"
        }
      ],
      options5: ["256M", "512M", "1G"]
    };
  },
  methods: {
    showMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/getLocalConfig",
        method: "post",
        data: {
          userId: this.defined.userId
        }
      })
        .then(res => {
          console.log(res.data.config);
          this.formLabelAlign.protocolType = res.data.config.protocolType;
          this.formLabelAlign.playPerformance = res.data.config.playPerformance;
          this.formLabelAlign.pictureType = res.data.config.fileFormat;
          this.formLabelAlign.ruleInformation = res.data.config.ruleMsg;
          this.formLabelAlign.POS = res.data.config.posMsg;
          this.localId = res.data.config.id;
        })
        .catch(error => {
          console.log("err+++++", error);
        });
    },
    changeMessage: function() {
      this.$axios({
        url: this.defined.serviceURL + "/updateLocalConfig",
        method: "post",
        data: {
          id: this.localId,
          protocolType: this.formLabelAlign.protocolType,
          playPerformance: this.formLabelAlign.playPerformance,
          fileFormat: this.formLabelAlign.pictureType,
          ruleMsg: this.formLabelAlign.ruleInformation,
          posMsg: this.formLabelAlign.POS
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
#localSite {
  position: relative;
  padding: 50px 150px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
